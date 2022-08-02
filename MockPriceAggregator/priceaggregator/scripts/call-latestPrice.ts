import { BigNumber, Contract, ethers, Wallet } from "ethers";
import { Provider, utils } from "zksync-web3";

const GOVERNANCE_ABI = require("./governance.json");
const GOVERNANCE_ADDRESS = "0xA4308140B409f5dA91AB3FFd4a395E8B2FC415A0";
const PRICEAGGREGAOR_ABI = require("./priceAggregator.json");
const PRICEAGGREGATOR_ADDRESS = "0xd3718c20603A1B2F323F67DA0064401A5c0D2f85";

async function main() {
  // Ethereum L1 provider
  const l1Provider = ethers.providers.getDefaultProvider("goerli");

  // Governor wallet
  const wallet = new Wallet(
    "PrivateKey",
    l1Provider
  );

  const govcontract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, wallet);

  // Getting the current address of the zkSync L1 bridge
  const l2Provider = new Provider("https://zksync2-testnet.zksync.dev");
  const zkSyncAddress = await l2Provider.getMainContractAddress();
  // Getting the `Contract` object of the zkSync bridge
  const zkSyncContract = new Contract(
    zkSyncAddress,
    utils.ZKSYNC_MAIN_ABI,
    wallet
  );

  // Encoding the tx data the same way it is done on Ethereum.
  const aggregatorInterface = new ethers.utils.Interface(PRICEAGGREGAOR_ABI);
  const data = aggregatorInterface.encodeFunctionData("setLatestAnswer", [
    1336,
  ]);

  // The price of the L1 transaction requests depends on the gas price used in the call
  const gasPrice = await l1Provider.getGasPrice();

  // Here we define the constant for ergs limit .
  const ergsLimit = BigNumber.from(100000);
  // Getting the cost of the execution.
  const baseCost = await zkSyncContract.l2TransactionBaseCost(
    gasPrice,
    ergsLimit,
    ethers.utils.hexlify(data).length,
    0
  );

  // Calling the L1 governance contract.
  const tx = await govcontract.callZkSync(
    zkSyncAddress,
    PRICEAGGREGATOR_ADDRESS,
    data,
    ergsLimit,
    {
      // Passing the necessary ETH `value` to cover the fee for the operation
      value: baseCost,
      gasPrice,
    }
  );

  // Waiting until the L1 tx is complete.
  await tx.wait();

  // Getting the TransactionResponse object for the L2 transaction corresponding to the
  // execution call
  const l2Response = await l2Provider.getL2TransactionFromPriorityOp(tx);

  // The receipt of the L2 transaction corresponding to the call to the Increment contract
  const l2Receipt = await l2Response.wait();
  console.log(l2Receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
