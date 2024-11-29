---
title: Register USDT, USDC, WETH, WBTC, WAZERO
author: C Forge team
shortDescription: This proposal seeks to update interest rate model for USDT, USDC, WETH, WBTC, WAZERO in the Lending Pool.
discussions: N/A
---

## Abstract

This proposal seeks to update interest rate model for USDT, USDC, WETH, WBTC, WAZERO in the Lending Pool. Current APR values in the protocol are misscaled and need to be updated to reflect the correct values.

## Motivation & Description

The current interest rate model for USDT, USDC, WETH, WBTC, WAZERO in the Lending Pool is not accurate and needs to be updated. The value of ONE_PERCENT_APR_E18 in the registering asset proposal was incorrect by an order of magnitude.

Below, the table of Interest Rate Models that will be used in the default Market Rule are presented.

**Proposed Interest Rate Parameters for Assets**

| Asset | Target Utilization | Minimal Rate at Target | Maximum Rate at Target | Rate at Max Utilization |
| ----- | ------------------ | ---------------------- | ---------------------- | ----------------------- |
| USDT  | 92%                | 1%                     | 16%                    | 80%                     |
| USDC  | 92%                | 1%                     | 16%                    | 80%                     |
| WETH  | 85%                | 1%                     | 10%                    | 90%                     |
| WBTC  | 85%                | 1%                     | 10%                    | 90%                     |
| WZERO | 70%                | 4%                     | 16%                    | 230%                    |

All actions will be executed in a multi-step process to ensure accuracy and security.

## Steps

The proposal will grant Admin Role to the proposal Smart Contract that will then execute the following steps:

- **Grant Asset Listing Admin Role**

  - Grant the `PARAMETERS_ADMIN` role to the self (proposal smart contract) that will register the assets.

- **Renounce Admin Role**

  - Renounce the role admin role from the self (proposal contract).

- **Update Interest Rate Model for USDT**

  - Update interest rate model of USDT using the parameters found in the above tables.

- **Update Interest Rate Model for USDC**

  - Update interest rate model of USDC using the parameters found in the above tables.

- **Update Interest Rate Model for WETH**

  - Update interest rate model of WETH using the parameters found in the above tables.

- **Update Interest Rate Model for WBTC**

  - Update interest rate model of WBTC using the parameters found in the above tables.

- **Update Interest Rate Model for WAZERO**

  - Update interest rate model of WAZERO using the parameters found in the above tables.

- **Renounce Asset Listing Admin Role**
  - Renounce the role `PARAMETERS_ADMIN` role from self (proposal contract).

## Parameters

- **lending_pool:** `5HrFwSe1mTneQbArbUH93MFbbkqaSBhohpfnWDCDSQM6N7Jh`

  - The address of the lending pool smart contract that will be updated.

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

- **Proposal Smart Contract Code:** [Proposal Smart Contract](https://alephzero.subscan.io/wasm_contract/5HNP4FY6NaPrnpuciVDRMFonBRKrT58ayiJuVpdvTBPdnQgH?tab=contract)

- **Lending Pool Smart Contract Code:** [Lending Pool Contract](https://alephzero.subscan.io/wasm_contract/5HrFwSe1mTneQbArbUH93MFbbkqaSBhohpfnWDCDSQM6N7Jh?tab=contract)

- **USDT Token Address** [USDT Token Address](https://alephzero.subscan.io/wasm_contract/5Et3dDcXUiThrBCot7g65k3oDSicGy4qC82cq9f911izKNtE?tab=contract)

- **USDC Token Address** [USDC Token Address](https://alephzero.subscan.io/wasm_contract/5FYFojNCJVFR2bBNKfAePZCa72ZcVX5yeTv8K9bzeUo8D83Z?tab=contract)

- **WETH Token Address** [WETH Token Address](https://alephzero.subscan.io/wasm_contract/5EoFQd36196Duo6fPTz2MWHXRzwTJcyETHyCyaB3rb61Xo2u?tab=contract)

- **WBTC Token Address** [WBTC Token Address](https://alephzero.subscan.io/wasm_contract/5EEtCdKLyyhQnNQWWWPM1fMDx1WdVuiaoR9cA6CWttgyxtuJ?tab=contract)

- **WAZERO Token Address** [WAZERO Token Address](https://alephzero.subscan.io/wasm_contract/5CtuFVgEUz13SFPVY6s2cZrnLDEkxQXc19aXrNARwEBeCXgg?tab=contract)

---
