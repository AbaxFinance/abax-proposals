import { AbaxGovernorArguments } from '@abaxfinance/contract-helpers';
import LendingPoolContract from '@abaxfinance/contract-helpers/dist/src/typechain/contracts/lending_pool';
import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import chalk from 'chalk';
import { LENDING_POOL_ADDRESS } from 'proposals/01_initial_lending_pool_configuration/consts';
import RegisterAssetsProposalContract from 'proposals/02_register_assets/register_assets_proposal/typechain/contracts/register_assets_proposal';
import { paramsToInputNumbers } from 'proposals/utils/paramsHexConversionUtils';
import { getConfigFromArgsAndEnv, handleProposeResult, tryPropose } from 'proposals/utils/proposeUtils';

const INITIAL_POOL_CONFIG_PROPOSAL_ADDRESS = '<><><><><><';

async function createTransactions(signer: KeyringPair, api: ApiPromise): Promise<AbaxGovernorArguments.Transaction[]> {
  const initialConfigProposalContract = new RegisterAssetsProposalContract(INITIAL_POOL_CONFIG_PROPOSAL_ADDRESS, signer, api);

  console.log(`Initial config proposal address: ${initialConfigProposalContract.address}`);

  const lendingPool = new LendingPoolContract(LENDING_POOL_ADDRESS, signer, api);

  const message = lendingPool.abi.findMessage('AccessControl::grant_role');
  const params = paramsToInputNumbers(message.toU8a([0, initialConfigProposalContract.address]));

  const transactions: AbaxGovernorArguments.Transaction[] = [
    {
      callee: lendingPool.address,
      selector: params.selector,
      input: params.data,
      transferredValue: 0,
    },
  ];
  return transactions;
}

(async () => {
  if (require.main !== module) return;
  const { signer, api, governor, proposalHash, url } = await getConfigFromArgsAndEnv();

  const transactions = await createTransactions(signer, api);

  const tryProposeResult = await tryPropose(governor, signer, transactions, proposalHash.toString(), url);

  await handleProposeResult(tryProposeResult, governor, signer);
})().catch((e) => {
  console.log(e);
  console.error(chalk.red(JSON.stringify(e, null, 2)));
  process.exit(1);
});
