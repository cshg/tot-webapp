pragma solidity ^0.4.18;

import "./StandardToken.sol";
import "./Ownable.sol";

/**
 * @title Inflationary token
 * @dev Simple ERC20 token with inflation calculated on an hourly basis
 */
contract InflationaryToken is StandardToken, Ownable {

  uint256 internal lastInflationCalc;
  uint256 public inflationRatePerInterval;
  uint256 public timeInterval;

  event LogInflation(string logString, uint256 value);

  function intervalsSinceLastInflationUpdate() public view returns(uint) {
    uint256 timeInt = timeInterval;
    return now / timeInt - lastInflationCalc / timeInt;
  }

  function mintTokens(address _to) onlyOwner public returns (bool) {
    uint256 newTokens = computeInflation();
    uint256 timeInt = timeInterval;

    // update last inflation calculation (rounding down to nearest timeInterval)
    lastInflationCalc = (now / timeInt) * timeInt;

    LogInflation("newTokens", newTokens);
    totalSupply_ += newTokens;
    balances[_to] = balances[_to].add(newTokens);
    Transfer(address(0), _to, newTokens);
    return true;
  }

  /**
   * @dev Function to compute how many tokens should be minted
   * @return number of new tokens
   */
  function computeInflation() public returns (uint256) {
    // calculate infaltion only once per hour

    //optimizaiton
    uint256 infRate = inflationRatePerInterval;
    uint256 timeInt = timeInterval;
    uint256 currentTime = now;
    uint256 totalSupply = totalSupply_;

    // compute the number of timeInterval elapsed since the last time we minted infation tokens
    uint256 intervalsSinceLastMint = currentTime / timeInt - lastInflationCalc / timeInt;

    // only update at most once an hour
    require(intervalsSinceLastMint > 0);

    // our hourly inflation rate
    uint256 rate = infRate;

    // compute inflation for total timeIntervals elapsed
    for (uint256 i = 1; i < intervalsSinceLastMint; i++) {
      rate = rate.mul(infRate) / (10 ** 18);
    }
    LogInflation("rate", rate);

    uint256 previousSupply = totalSupply;
    // update total supply
    return totalSupply.mul(rate).div(10 ** 18).sub(previousSupply);
  }

}