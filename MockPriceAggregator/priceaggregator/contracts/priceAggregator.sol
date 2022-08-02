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
