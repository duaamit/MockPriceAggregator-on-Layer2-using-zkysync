# L2 Counter project

This folder contains the hardhat project for the `priceAggregator` L2 smart contract. It also contains scripts that are used to display the value of the current price as well as to call the governance to update the current price from L1.

## Structure

- `contracts/priceAggregator.sol` contains the code of the priceAggregator smart contract.
- `deploy/priceAggregator.ts` contains the script for deploying the priceAggregator smart contract on L2.
- `scripts/priceAggregator.json` contains the ABI of the priceAggregator smart contract.
- `scripts/governance.json` contains the ABI of the L1 governance smart contract.
- `scripts/display-value.ts` contains the code for displaying the current price.
- `scripts/call-latestPrice.ts` contains the code for updating the current price. 

## Usage

Before using any scripts, you should install the dependencies by running the following command:

```
yarn
```

### Building and deploying a counter smart contract

1. Make sure to deploy the L1 governance smart contract first. The instructions for that can be found in the [deploy-governance](../deploy-governance) folder.

2. Open `deploy/counter.ts`. 

3. Replace the `<PRIVATE-KEY>` with the `0x`-prefixed private key of the Ethereum wallet with some ETH balance on Görli.

4. Run the script using the following command:

```
yarn hardhat deploy-zksync
```

The script will output the address of the deployed priceAggregator contract.

### Displaying price value

1. Open `scripts/display-value.ts`. 

2. Replace `<priceAggregator-address>` with the address of yours contract address.

3. Run the script using the following command

```
yarn ts-node ./scripts/display-value.ts
```

### Updating price to Latest

1. Open `scripts/call-latestPrice.ts`.

2. Replace `PRIVATE-KEY`, `<GOVERNANCE-ADDRESS>`, and `priceAggregator-ADDRESS` with the `0x`-prefixed private key of the Ethereum wallet that deployed the governance contract, the address of the L1 governance contract, and the address of the priceAggregator contract respectively.

3. Run the script using the following command:

```
yarn ts-node ./scripts/call-latestPrice.ts
```

If successful, it will show the hash of the L2 transaction which corresponds to the `Execute` call on L2 that updated the price.
