# Cross-chain governance full example

This is the full example for the zkSync "Cross-chain governance" tutorial.

It consists of two folders:

- `deploy-governance` which contains the hardhat project that is used to deploy the governance smart contract.
- `price-aggregator` which contains the hardhat project for the `Mock price-aggregator` L2 smart contract. It also contains scripts that are used to display the value of the current price as well as to call the governance to update the current price from L1.
