import { Contract, Provider } from "zksync-web3";

const PRICEAGGREGATOR_ADDRESS = "0xd3718c20603A1B2F323F67DA0064401A5c0D2f85";
const PRICEAGGREGAOR_ABI = require("./priceAggregator.json");

async function main() {
  // Initialize the wallet.
  const l2Provider = new Provider("https://zksync2-testnet.zksync.dev");

  const priceaggregator = new Contract(
    PRICEAGGREGATOR_ADDRESS,
    PRICEAGGREGAOR_ABI,
    l2Provider
  );

  // console.log(
  //   `The price  is ${(await priceaggregator.pricefromfeed()).toString()}`
  // );
  console.log(`The price  is ${(await priceaggregator.s_answer()).toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
