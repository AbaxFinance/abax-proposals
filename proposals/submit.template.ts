import { AbaxGovernorArguments, Transaction } from '@abaxfinance/contract-helpers';
import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import chalk from 'chalk';
import { getConfigFromArgsAndEnv, handleProposeResult, tryPropose } from 'proposals/utils/proposeUtils';

async function createTransactions(signer: KeyringPair, api: ApiPromise): Promise<AbaxGovernorArguments.Transaction[]> {
  //TODO: Implement this function
  return [];
}

(async () => {
  if (require.main !== module) return;
  const { signer, api, governor, proposalHash, url } = await getConfigFromArgsAndEnv();

  const transactions = await createTransactions(signer, api);

  const proposeResult = await tryPropose(governor, signer, transactions, proposalHash.toString(), url);

  await handleProposeResult(proposeResult, governor, signer);
})().catch((e) => {
  console.log(e);
  console.error(chalk.red(JSON.stringify(e, null, 2)));
  process.exit(1);
});
