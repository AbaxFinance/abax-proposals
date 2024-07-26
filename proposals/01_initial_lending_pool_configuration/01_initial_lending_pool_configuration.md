---
title: Initial Configuration of the Abax Lending Pool
author: C Forge team
shortDescription: This proposal seeks to perform changes that will introduce critical updates to the Abax Lending Pool, preparing it for the next stages of our project, including the creation of markets and the registration of assets.
discussions: N/A
---

## Abstract

This proposal seeks to perform changes that will introduce critical updates to the Abax Lending Pool, preparing it for the next stages of our project, including the creation of markets and the registration of assets. Once approved, it will perform the initial configuration of the protocol, making it ready to have assets registered, configured, and lending & borrowing enabled.

## Motivation & Description

The first step to complete the setup for the Abax Lending Protocol is to lay the foundation for the initial, default market. To achieve this, several configuration actions are required to be approved by the Abax DAO:

- **Assign an Emergency Admin role:**
  - The DAO Haven foundation address will be used.
  - The Emergency Admin can pause/unpause, freeze, and unfreeze reserves.
- **Bind a utility, price feeding smart contract to the Lending Protocol.**
- **Trigger the creation of the default market.**

All actions will be executed in a multi-step process to ensure accuracy and security.

## Steps

The proposal will be executed in the following steps:

- **Grant Emergency Admin Role**

  - Grant the `EMERGENCY_ADMIN` role to a designated account, enabling it to manage critical contract operations during emergencies.

- **Assign Parameters Admin Role**

  - Grant the `PARAMETERS_ADMIN` role to the proposal contract itself, allowing it to update parameters.

- **Renounce Admin Role**

  - Renounce the role admin role from the proposal contract itself (not required for further steps).

- **Update Price Feed Provider**

  - Set a price feed provider for the lending pool to faciliate data fetching for the protocol & enable easy access to market data via DIA Oracle.
  - https://github.com/diadata-org/dia-oracle-anchor

- **Add Market Rules**

  - Trigger the addition of rules for the default market.

- **Renounce Parameters Admin Role**
  - Once all updates are applied, renounce the `PARAMETERS_ADMIN` role from the proposal contract itself.

## Parameters

- **lending_pool:** `5HrFwSe1mTneQbArbUH93MFbbkqaSBhohpfnWDCDSQM6N7Jh`
  - The address of the lending pool smart contract that will be updated.
- **emergency_admin:** `5CYhNzKmENWge5gt52XdwRzj2hWHoYqisQqUPfwafR1ZLySz`

  - The address designated as the Emergency Admin, responsible for managing critical operations.

- **price_feed_provider:** `5GjvKx6ur4AFHftAgMLqZyVt6jvzcd6gMVsMBJpdCM4yhbDQ`
  - The address of the new price feed provider, responsible for supplying market data to the lending pool.

## Links

- **Proposal Smart Contract Code:** [Proposal Smart Contract](https://alephzero.subscan.io/wasm_contract/5GXTxaJpeGpvV31cyfTFeA2c5w73HvPwZdNRPDEtrR3QYd3C?tab=contract)
- **Lending Pool Smart Contract Code:** [Lending Pool Contract](https://alephzero.subscan.io/wasm_contract/5HrFwSe1mTneQbArbUH93MFbbkqaSBhohpfnWDCDSQM6N7Jh?tab=contract)
- **Price Feed Provider Smart Contract Code:** [Price Feed Provider Contract](https://alephzero.subscan.io/wasm_contract/5GjvKx6ur4AFHftAgMLqZyVt6jvzcd6gMVsMBJpdCM4yhbDQ?tab=contract)

---

This proposal is a crucial step towards enabling the full functionality of the Abax Lending Protocol by establishing the default market configuration and ensuring that the necessary roles and parameters are securely in place.
