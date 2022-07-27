// pragma solidity ^0.8.0;
// import "./AggregatorV3Interface.sol";


// contract priceAggregator {
//     // uint256 public value = 0;

//     address public governance;
//     AggregatorV3Interface internal priceFeed;
//     int public pricefromfeed = 0;



//     constructor(address newGovernance) {
//         governance = newGovernance;
//         priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);


//     }

//     // function increment() public {
//     //     require(msg.sender == governance);
//     //     value += 1;
//     // }

//     function getLatestPrice() public returns (int) {
//     require(msg.sender == governance);
//     (,int price,,,) = priceFeed.latestRoundData();
//     pricefromfeed = price;
//     return price;
//   }

//   function getDecimals() public view returns (uint8) {
//     require(msg.sender == governance);
//     uint8 decimals = priceFeed.decimals();
//     return decimals;
//   }
// }


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract priceAggregator {
  int256 public s_answer = 1337 * 10**18;
  address public governance;

  constructor(address newGovernance) {
        governance = newGovernance;
  }


  function setLatestAnswer(int256 answer) public {
    require(msg.sender == governance);
    s_answer = answer;
  }

  function latestRoundData() public view returns 
    (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
    return (0, s_answer, 0, 0, 0);
  }
}