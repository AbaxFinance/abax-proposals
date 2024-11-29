#![cfg_attr(not(feature = "std"), no_std, no_main)]
use abax_contracts::lending_pool::LendingPoolError;

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum ProposalError {
    LendingPoolError(LendingPoolError),
    AccessControlError(pendzl::contracts::access_control::AccessControlError),
    ProposalAlreadyExecuted,
}

impl From<LendingPoolError> for ProposalError {
    fn from(error: LendingPoolError) -> Self {
        ProposalError::LendingPoolError(error)
    }
}

impl From<pendzl::contracts::access_control::AccessControlError> for ProposalError {
    fn from(error: pendzl::contracts::access_control::AccessControlError) -> Self {
        ProposalError::AccessControlError(error)
    }
}

#[ink::contract]
mod update_interest_rate_model {
    use crate::ProposalError;
    use abax_library::{
        math::{E12_U128, E18_U128, E8_U128},
        structs::InterestRateModelParams,
    };

    use abax_contracts::lending_pool::{LendingPoolManage, LendingPoolManageRef};
    use ink::{codegen::TraitCallBuilder, ToAccountId};
    use pendzl::contracts::access_control::{AccessControl, AccessControlRef};

    #[derive(Debug, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct UpdateInterestModelData {
        address: AccountId,
        interest_rate_model_params: InterestRateModelParams,
    }

    // 0.01 % / 365 * 24 * 60 * 60 * E18
    const ONE_PERCENT_APR_E18: u64 = 317_098;
    const ONE_SEC: u64 = 1000;
    const ONE_MIN: u64 = ONE_SEC * (60);

    #[derive(Debug, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct ViewParams {
        pub lending_pool: AccountId,
        pub usdt_address: AccountId,
        pub usdc_address: AccountId,
        pub weth_address: AccountId,
        pub wbtc_address: AccountId,
        pub wazero_address: AccountId,
    }

    #[ink(storage)]
    pub struct Proposal {
        execute_action_counter: u8,
        lending_pool: LendingPoolManageRef,
        usdt_address: AccountId,
        usdc_address: AccountId,
        weth_address: AccountId,
        wbtc_address: AccountId,
        wazero_address: AccountId,
    }

    impl Proposal {
        #[ink(constructor)]
        pub fn new(
            lending_pool: AccountId,
            usdt_address: AccountId,
            usdc_address: AccountId,
            weth_address: AccountId,
            wbtc_address: AccountId,
            wazero_address: AccountId,
        ) -> Self {
            Self {
                lending_pool: LendingPoolManageRef::from(lending_pool),
                execute_action_counter: 0,
                usdt_address,
                usdc_address,
                weth_address,
                wbtc_address,
                wazero_address,
            }
        }

        #[ink(message)]
        pub fn view_execute_action_counter(&self) -> u8 {
            self.execute_action_counter
        }

        #[ink(message)]
        pub fn view_params(&self) -> ViewParams {
            ViewParams {
                lending_pool: self.lending_pool.to_account_id(),
                usdt_address: self.usdt_address,
                usdc_address: self.usdc_address,
                weth_address: self.weth_address,
                wbtc_address: self.wbtc_address,
                wazero_address: self.wazero_address,
            }
        }

        #[ink(message)]
        pub fn view_usdt_token_data(&self) -> UpdateInterestModelData {
            self.get_usdt_token_data()
        }

        #[ink(message)]
        pub fn view_usdc_token_data(&self) -> UpdateInterestModelData {
            self.get_usdc_token_data()
        }

        #[ink(message)]
        pub fn view_weth_token_data(&self) -> UpdateInterestModelData {
            self.get_weth_token_data()
        }

        #[ink(message)]
        pub fn view_wbtc_token_data(&self) -> UpdateInterestModelData {
            self.get_wbtc_token_data()
        }

        #[ink(message)]
        pub fn view_wazero_token_data(&self) -> UpdateInterestModelData {
            self.get_wazero_token_data()
        }

        #[ink(message)]
        pub fn execute(&mut self) -> Result<(), ProposalError> {
            match self.execute_action_counter {
                0 => {
                    self._execute_step0()?;
                }
                1 => {
                    self._execute_step1()?;
                }
                2 => {
                    self._execute_step2()?;
                }
                3 => {
                    self._execute_step3()?;
                }
                4 => {
                    self._execute_step4()?;
                }
                5 => {
                    self._execute_step5()?;
                }
                6 => {
                    self._execute_step6()?;
                }
                7 => {
                    self._execute_step7()?;
                }
                _ => {
                    return Err(ProposalError::ProposalAlreadyExecuted);
                }
            }

            self.execute_action_counter = self.execute_action_counter.checked_add(1).unwrap();

            Ok(())
        }

        fn _execute_step0(&self) -> Result<(), ProposalError> {
            let mut lending_pool_access_control =
                AccessControlRef::from(self.lending_pool.to_account_id());

            lending_pool_access_control
                .call_mut()
                .grant_role(
                    ink::selector_id!("PARAMETERS_ADMIN"),
                    Some(self.env().account_id()),
                )
                .call_v1()
                .invoke()?;

            Ok(())
        }
        fn _execute_step1(&self) -> Result<(), ProposalError> {
            let mut lending_pool_access_control =
                AccessControlRef::from(self.lending_pool.to_account_id());
            lending_pool_access_control
                .call_mut()
                .renounce_role(0, Some(Self::env().account_id()))
                .call_v1()
                .invoke()?;

            Ok(())
        }

        fn _execute_step2(&mut self) -> Result<(), ProposalError> {
            //update interest rate model usdt
            self._update_interest_rate_model(self.get_usdt_token_data())?;
            Ok(())
        }

        fn _execute_step3(&mut self) -> Result<(), ProposalError> {
            //update interest rate model usdc
            self._update_interest_rate_model(self.get_usdc_token_data())?;
            Ok(())
        }

        fn _execute_step4(&mut self) -> Result<(), ProposalError> {
            //update interest rate model weth
            self._update_interest_rate_model(self.get_weth_token_data())?;
            Ok(())
        }

        fn _execute_step5(&mut self) -> Result<(), ProposalError> {
            //update interest rate model wbtc
            self._update_interest_rate_model(self.get_wbtc_token_data())?;
            Ok(())
        }

        fn _execute_step6(&mut self) -> Result<(), ProposalError> {
            //update interest rate model wazero
            self._update_interest_rate_model(self.get_wazero_token_data())?;
            Ok(())
        }

        fn _execute_step7(&mut self) -> Result<(), ProposalError> {
            let mut lending_pool_access_control =
                AccessControlRef::from(self.lending_pool.to_account_id());

            lending_pool_access_control
                .call_mut()
                .renounce_role(
                    ink::selector_id!("PARAMETERS_ADMIN"),
                    Some(self.env().account_id()),
                )
                .call_v1()
                .invoke()?;

            Ok(())
        }

        fn get_usdt_token_data(&self) -> UpdateInterestModelData {
            UpdateInterestModelData {
                // "USDT"
                // address: hex_literal::hex!("5Et3dDcXUiThrBCot7g65k3oDSicGy4qC82cq9f911izKNtE"),
                address: self.usdt_address,
                interest_rate_model_params: InterestRateModelParams {
                    target_ur_e6: 920_000, //92%
                    min_rate_at_target_e18: ONE_PERCENT_APR_E18,
                    max_rate_at_target_e18: 16 * ONE_PERCENT_APR_E18,
                    rate_at_max_ur_e18: 80 * ONE_PERCENT_APR_E18,
                    minimal_time_between_adjustments: 30 * ONE_MIN,
                },
            }
        }
        fn get_usdc_token_data(&self) -> UpdateInterestModelData {
            UpdateInterestModelData {
                // "USDC"
                // address: hex_literal::hex!("5FYFojNCJVFR2bBNKfAePZCa72ZcVX5yeTv8K9bzeUo8D83Z"),
                address: self.usdc_address,
                interest_rate_model_params: InterestRateModelParams {
                    target_ur_e6: 920_000, //92%
                    min_rate_at_target_e18: ONE_PERCENT_APR_E18,
                    max_rate_at_target_e18: 16 * ONE_PERCENT_APR_E18,
                    rate_at_max_ur_e18: 80 * ONE_PERCENT_APR_E18,
                    minimal_time_between_adjustments: 30 * ONE_MIN,
                },
            }
        }
        fn get_weth_token_data(&self) -> UpdateInterestModelData {
            UpdateInterestModelData {
                // "WETH"
                // address: hex_literal::hex!("5EoFQd36196Duo6fPTz2MWHXRzwTJcyETHyCyaB3rb61Xo2u"),
                address: self.weth_address,
                interest_rate_model_params: InterestRateModelParams {
                    target_ur_e6: 850_000, //85%
                    min_rate_at_target_e18: ONE_PERCENT_APR_E18 / 2,
                    max_rate_at_target_e18: 10 * ONE_PERCENT_APR_E18,
                    rate_at_max_ur_e18: 90 * ONE_PERCENT_APR_E18,
                    minimal_time_between_adjustments: 30 * ONE_MIN,
                },
            }
        }
        fn get_wbtc_token_data(&self) -> UpdateInterestModelData {
            UpdateInterestModelData {
                // "WBTC"
                // address: hex_literal::hex!("5EEtCdKLyyhQnNQWWWPM1fMDx1WdVuiaoR9cA6CWttgyxtuJ"),
                address: self.wbtc_address,
                interest_rate_model_params: InterestRateModelParams {
                    target_ur_e6: 850_000, //85%
                    min_rate_at_target_e18: ONE_PERCENT_APR_E18 / 2,
                    max_rate_at_target_e18: 10 * ONE_PERCENT_APR_E18,
                    rate_at_max_ur_e18: 90 * ONE_PERCENT_APR_E18,
                    minimal_time_between_adjustments: 30 * ONE_MIN,
                },
            }
        }
        fn get_wazero_token_data(&self) -> UpdateInterestModelData {
            UpdateInterestModelData {
                // "WAZERO"
                // address: hex_literal::hex!("5CtuFVgEUz13SFPVY6s2cZrnLDEkxQXc19aXrNARwEBeCXgg"),
                address: self.wazero_address,
                interest_rate_model_params: InterestRateModelParams {
                    target_ur_e6: 700_000, //45%
                    min_rate_at_target_e18: 4 * ONE_PERCENT_APR_E18,
                    max_rate_at_target_e18: 16 * ONE_PERCENT_APR_E18,
                    rate_at_max_ur_e18: 230 * ONE_PERCENT_APR_E18,
                    minimal_time_between_adjustments: 30 * ONE_MIN,
                },
            }
        }

        fn _update_interest_rate_model(
            &mut self,
            token_data: UpdateInterestModelData,
        ) -> Result<(), ProposalError> {
            self.lending_pool
                .call_mut()
                .set_interest_rate_model(token_data.address, token_data.interest_rate_model_params)
                .call_v1()
                .invoke()?;

            Ok(())
        }
    }
}
