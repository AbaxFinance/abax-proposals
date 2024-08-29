import { getApiProviderWrapper } from '@c-forge/polkahat-network-helpers';
import Keyring from '@polkadot/keyring';
import chalk from 'chalk';
import { LENDING_POOL_ADDRESS } from 'proposals/01_initial_lending_pool_configuration/consts';
import RegisterAssetsProposalDeployer from 'proposals/02_register_assets/register_assets_proposal/typechain/deployers/register_assets_proposal';

const TOKEN_ADDRESSES_BY_SYMBOL = {
  WAZERO: '5CtuFVgEUz13SFPVY6s2cZrnLDEkxQXc19aXrNARwEBeCXgg',
  USDC: '5FYFojNCJVFR2bBNKfAePZCa72ZcVX5yeTv8K9bzeUo8D83Z',
  WBTC: '5EEtCdKLyyhQnNQWWWPM1fMDx1WdVuiaoR9cA6CWttgyxtuJ',
  WETH: '5EoFQd36196Duo6fPTz2MWHXRzwTJcyETHyCyaB3rb61Xo2u',
  USDT: '5Et3dDcXUiThrBCot7g65k3oDSicGy4qC82cq9f911izKNtE',
};
// aToken code hash: 0x5adc19dea0f4a33458d689bdec40124691060f14d72623fbfe2914955009bc92
// vToken code hash: 0xa1b063ed23d600a7ca37f6340acec08f7352dd8834a2b3c79013c05f73cb0622
// aToken contract address: 5H1tNTUCv2pz9s3ZxPaPY5V3YujR9j2yHMFHr4xvAZshY9HC
// vToken contract address: 5Dztoa5wjanSqeetNUMvSp8JFmQBHUqqH7XPq9BsWGWUHTUL

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
    await new RegisterAssetsProposalDeployer(api, signer).new(
      LENDING_POOL_ADDRESS,
      '0x5adc19dea0f4a33458d689bdec40124691060f14d72623fbfe2914955009bc92' as any, //AToken => 5H1tNTUCv2pz9s3ZxPaPY5V3YujR9j2yHMFHr4xvAZshY9HC
      '0xa1b063ed23d600a7ca37f6340acec08f7352dd8834a2b3c79013c05f73cb0622' as any, //VToken => 5Dztoa5wjanSqeetNUMvSp8JFmQBHUqqH7XPq9BsWGWUHTUL
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
