import { AbaxGovernor, AbaxGovernorArguments, GovernError, GovernErrorBuilder } from '@abaxfinance/contract-helpers';
import AbaxGovernorContract from '@abaxfinance/contract-helpers/dist/src/typechain/contracts/abax_governor';
import { getArgvObj } from '@abaxfinance/utils';
import { getApiProviderWrapper } from '@c-forge/polkahat-network-helpers';
import { Result, ResultBuilder } from '@c-forge/typechain-types';
import Keyring from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import BN from 'bn.js';
import { GOVERNOR_ADDRESS } from 'config/abaxAddresses';
import { isEqual } from 'lodash';
export type TryProposeResult = Result<{ proposalId: BN }, Error | GovernError>;

export async function tryPropose(
  governor: AbaxGovernorContract,
  proposer: KeyringPair,
  transactions: AbaxGovernorArguments.Transaction[],
  descriptionHash: string,
  descriptionUrl: string,
  earliestExecution: number | null = null,
): Promise<TryProposeResult> {
  if (transactions.length === 0) {
    console.log('No transactions to propose');
    process.exit(0);
  }

  try {
    const query = await governor.withSigner(proposer).query.propose({ descriptionUrl, descriptionHash, transactions, earliestExecution });
    query.value.unwrapRecursively();
    const tx = await governor.withSigner(proposer).tx.propose({ descriptionUrl, descriptionHash, transactions, earliestExecution });
    const event = tx.events?.find((e) => e.name.includes('ProposalCreated'))?.args;
    return ResultBuilder.Ok({ proposalId: new BN(event.proposalId.toString()) });
  } catch (e: any) {
    return ResultBuilder.Err(e);
  }
}

export async function getConfigFromArgsAndEnv() {
  const args = getArgvObj();
  const url = (args['url'] as string) ?? process.argv[2] ?? process.env.PWD;
  if (!url) throw 'could not determine input path';
  const wsEndpoint = process.env.WS_ENDPOINT;
  if (!wsEndpoint) throw 'could not determine wsEndpoint';
  const seed = process.env.SEED;
  if (!seed) throw 'could not determine seed';
  const api = await getApiProviderWrapper(wsEndpoint).getAndWaitForReady();

  const timestamp = await api.query.timestamp.now();
  console.log(new Date(parseInt(timestamp.toString())));

  const keyring = new Keyring();
  const signer = keyring.createFromUri(seed, {}, 'sr25519');

  //fetch from url
  const proposalMD = await fetch(url).then((res) => res.text());
  const governor = new AbaxGovernor(GOVERNOR_ADDRESS, signer, api);

  const proposalHash = (await governor.query.hashDescription(proposalMD)).value.ok!;

  console.log(`Proposal description hash: ${proposalHash}`);
  return { signer, api, governor, proposalHash, url };
}

export async function handleProposeResult(proposeRes: TryProposeResult, governor: AbaxGovernorContract, signer: KeyringPair) {
  if (isEqual(GovernErrorBuilder.InsuficientVotes(), proposeRes.err)) {
    console.log('Insuficient votes');
    const vABAXBalance = await governor.query.balanceOf(signer.address);
    console.log(`vABAX balance: ${vABAXBalance.value.unwrap().toString()}`);
    process.exit(1);
  } else {
    console.log(`Proposal id: ${proposeRes.unwrap().proposalId.toString()}`);
    process.exit(0);
  }
}
