import { getApiProviderWrapper } from '@c-forge/polkahat-network-helpers';
import Keyring from '@polkadot/keyring';
import chalk from 'chalk';
import { LENDING_POOL_ADDRESS } from 'proposals/01_initial_lending_pool_configuration/consts';
import UpdateInterestRateModelDeployer from 'proposals/03_update_interest_rate_model/update_interest_rate_model/typechain/deployers/update_interest_rate_model';

const TOKEN_ADDRESSES_BY_SYMBOL = {
  WAZERO: '5CtuFVgEUz13SFPVY6s2cZrnLDEkxQXc19aXrNARwEBeCXgg',
  USDC: '5FYFojNCJVFR2bBNKfAePZCa72ZcVX5yeTv8K9bzeUo8D83Z',
  WBTC: '5EEtCdKLyyhQnNQWWWPM1fMDx1WdVuiaoR9cA6CWttgyxtuJ',
  WETH: '5EoFQd36196Duo6fPTz2MWHXRzwTJcyETHyCyaB3rb61Xo2u',
  USDT: '5Et3dDcXUiThrBCot7g65k3oDSicGy4qC82cq9f911izKNtE',
};

(async () => {
  if (require.main !== module) return;
  const wsEndpoint = process.env.WS_ENDPOINT;
  if (!wsEndpoint) throw 'could not determine wsEndpoint';
  const seed = process.env.SEED;
  if (!seed) throw 'could not determine seed';
  const api = await getApiProviderWrapper(wsEndpoint).getAndWaitForReady();

  const timestamp = await api.query.timestamp.now();
  console.log(new Date(parseInt(timestamp.toString())));

  const keyring = new Keyring();
  const signer = keyring.createFromUri(seed, {}, 'sr25519');

  const registerAssetsProposalContract = (
    await new UpdateInterestRateModelDeployer(api, signer).new(
      LENDING_POOL_ADDRESS,
      TOKEN_ADDRESSES_BY_SYMBOL.USDT,
      TOKEN_ADDRESSES_BY_SYMBOL.USDC,
      TOKEN_ADDRESSES_BY_SYMBOL.WETH,
      TOKEN_ADDRESSES_BY_SYMBOL.WBTC,
      TOKEN_ADDRESSES_BY_SYMBOL.WAZERO,
    )
  ).contract;

  console.log(`proposal smart contract address: ${registerAssetsProposalContract.address}`);

  process.exit(0);
})().catch((e) => {
  console.log(e);
  console.error(chalk.red(JSON.stringify(e, null, 2)));
  process.exit(1);
});
