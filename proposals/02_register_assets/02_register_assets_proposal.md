---
title: Register USDT, USDC, WETH, WBTC, WAZERO
author: C Forge team
shortDescription: This proposal seeks to register USDT, USDC, WETH, WBTC, WAZERO in the Lending Pool and set the parameters for these assets in the default Market Rule. This will allow for depositing and borrowing of the assets and will make the Lending Pool functional.
discussions: N/A
---

## Abstract

This proposal seeks to register USDT, USDC, WETH, WBTC, WAZERO in the Lending Pool and set the parameters for these assets in the default Market Rule. This will allow for depositing and borrowing of the assets and make the Lending Pool functional.

## Motivation & Description

To make the Abax Lending Pool fully operational assets must be registered within it.

Within this proposal, highly liquid assets: USDT, USDC, WETH, and WBTC will be registered together with WAZERO.

Below, the tables with the Risk Coefficients, Interest Rate Model, and Restriction Parameters that will be used in the default Market Rule are presented.

**Proposed Debt Coefficient, Collateral Coefficient, and Penalty for Assets**

| Asset  | Debt Coefficient | Collateral Coefficient | Penalty |
| ------ | ---------------- | ---------------------- | ------- |
| USDT   | 1.04             | 0.96                   | 2%      |
| USDC   | 1.04             | 0.96                   | 2%      |
| WETH   | 1.19             | 0.80                   | 12.5%   |
| WBTC   | 1.15             | 0.80                   | 10%     |
| WAZERO | 3.00             | 0.33                   | 50%     |

**Proposed Interest Rate Parameters for Assets**

| Asset | Target Utilization | Minimal Rate at Target | Maximum Rate at Target | Rate at Max Utilization |
| ----- | ------------------ | ---------------------- | ---------------------- | ----------------------- |
| USDT  | 92%                | 1%                     | 16%                    | 80%                     |
| USDC  | 92%                | 1%                     | 16%                    | 80%                     |
| WETH  | 85%                | 1%                     | 10%                    | 90%                     |
| WBTC  | 85%                | 1%                     | 10%                    | 90%                     |
| WZERO | 70%                | 4%                     | 16%                    | 230%                    |

**Proposed Restrictions for Assets**

| Asset  | Deposit Fee | Debt Fee | Maximal Deposit | Minimal Collateral | Minimal Debt |
| ------ | ----------- | -------- | --------------- | ------------------ | ------------ |
| USDT   | 5%          | 5%       | 400,000 USDT    | 10 USDT            | 10 USDT      |
| USDC   | 5%          | 5%       | 400,000 USDC    | 10 USDC            | 10 USDC      |
| WETH   | 5%          | 5%       | 40 WETH         | 1/250 WETH         | 1/250 WETH   |
| WBTC   | 5%          | 5%       | 2 WBTC          | 1/5000 WBTC        | 1/5000 WBTC  |
| WAZERO | 5%          | 5%       | 300,000 WAZERO  | 25 WAZERO          | 25 WAZERO    |

All actions will be executed in a multi-step process to ensure accuracy and security.

## Steps

The proposal will grant Admin Role to the proposal Smart Contract that will then execute the following steps:

- **Grant Asset Listing Admin Role**

  - Grant the `ASSET_LISTING_ADMIN` role to the self (proposal smart contract) that will register the assets.

- **Renounce Admin Role**

  - Renounce the role admin role from the self (proposal contract).

- **Register USDT**

  - Register USDT using the parameters found in the above tables.

- **Register USDC**

  - Register USDC using the parameters found in the above tables.

- **Register WETH**

  - Register WETH using the parameters found in the above tables.

- **Register WBTC**

  - Register WBTC using the parameters found in the above tables.

- **Register WAZERO**

  - Register WAZERO using the parameters found in the above tables.

- **Renounce Asset Listing Admin Role**
  - Renounce the role `ASSET_LISTING_ADMIN` role from self (proposal contract).

## Parameters

- **lending_pool:** `5HrFwSe1mTneQbArbUH93MFbbkqaSBhohpfnWDCDSQM6N7Jh`

  - The address of the lending pool smart contract that will be updated.

- **aToken Code Hash:**: `0x5adc19dea0f4a33458d689bdec40124691060f14d72623fbfe2914955009bc92`

  - The code hash that will be used to instantiate aToken for each of registered assets

- **vToken Code Hash:**: `0xa1b063ed23d600a7ca37f6340acec08f7352dd8834a2b3c79013c05f73cb0622`

  - The code hash that will be used to instantiate vToken for each of registered assets

- **USDT Token Address:** `5Et3dDcXUiThrBCot7g65k3oDSicGy4qC82cq9f911izKNtE`

  - The address of the USDT token used in the lending protocol.

- **USDC Token Address:** `5FYFojNCJVFR2bBNKfAePZCa72ZcVX5yeTv8K9bzeUo8D83Z`

  - The address of the USDC token used in the lending protocol.

- **WETH Token Address:** `5EoFQd36196Duo6fPTz2MWHXRzwTJcyETHyCyaB3rb61Xo2u`

  - The address of the WETH token used in the lending protocol.

- **WBTC Token Address:** `5EEtCdKLyyhQnNQWWWPM1fMDx1WdVuiaoR9cA6CWttgyxtuJ`

  - The address of the WBTC token used in the lending protocol.

- **WAZERO Token Address:** `5CtuFVgEUz13SFPVY6s2cZrnLDEkxQXc19aXrNARwEBeCXgg`
  - The address of the WAZERO token used in the lending protocol.

## Links

- **Proposal Smart Contract Code:** [Proposal Smart Contract](https://alephzero.subscan.io/wasm_contract/5Gfw2UnE5CYnpNN2NkZBHhqDSnhEhkr2EtdoU1tPFdpXphpF?tab=contract)

- **Lending Pool Smart Contract Code:** [Lending Pool Contract](https://alephzero.subscan.io/wasm_contract/5HrFwSe1mTneQbArbUH93MFbbkqaSBhohpfnWDCDSQM6N7Jh?tab=contract)

- **aToken Contract example** [aToken Contract](https://alephzero.subscan.io/wasm_contract/5H1tNTUCv2pz9s3ZxPaPY5V3YujR9j2yHMFHr4xvAZshY9HC?tab=contract)

  - example of a contract that uses the **aToken Code Hash**

- **vToken Contract example** [vToken Contract](https://alephzero.subscan.io/wasm_contract/5Dztoa5wjanSqeetNUMvSp8JFmQBHUqqH7XPq9BsWGWUHTUL?tab=contract)

  - example of a contract that uses the **vToken Code Hash**

- **USDT Token Address** [USDT Token Address](https://alephzero.subscan.io/wasm_contract/5Et3dDcXUiThrBCot7g65k3oDSicGy4qC82cq9f911izKNtE?tab=contract)

- **USDC Token Address** [USDC Token Address](https://alephzero.subscan.io/wasm_contract/5FYFojNCJVFR2bBNKfAePZCa72ZcVX5yeTv8K9bzeUo8D83Z?tab=contract)

- **WETH Token Address** [WETH Token Address](https://alephzero.subscan.io/wasm_contract/5EoFQd36196Duo6fPTz2MWHXRzwTJcyETHyCyaB3rb61Xo2u?tab=contract)

- **WBTC Token Address** [WBTC Token Address](https://alephzero.subscan.io/wasm_contract/5EEtCdKLyyhQnNQWWWPM1fMDx1WdVuiaoR9cA6CWttgyxtuJ?tab=contract)

- **WAZERO Token Address** [WAZERO Token Address](https://alephzero.subscan.io/wasm_contract/5CtuFVgEUz13SFPVY6s2cZrnLDEkxQXc19aXrNARwEBeCXgg?tab=contract)

---

This proposal is a crucial step towards enabling the full functionality of the Abax Lending Protocol by registering the assets.
