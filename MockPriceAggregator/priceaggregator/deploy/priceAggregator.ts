import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const GOVERNANCE_ADDRESS = "0xA4308140B409f5dA91AB3FFd4a395E8B2FC415A0";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the priceAggregator contract`);

  // Initialize the wallet.
  const wallet = new Wallet(
    "0x9f0593f55edf5efd770092129cdfca54c56dbeb578f7cba9a85773bcf38de961"
  );

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("priceAggregator");

  // Deposit some funds to L2 in order to be able to perform deposits.
  const depositAmount = ethers.utils.parseEther("0.001");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.

  const priceAggregatorContract = await deployer.deploy(artifact, [
    GOVERNANCE_ADDRESS,
  ]);

  // Show the contract info.
  const contractAddress = priceAggregatorContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
