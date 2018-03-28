pragma solidity ^0.4.18;

import "./StandardToken.sol";

/**
 * @title BondingCurve
 * @dev Bonding Curve parent contract
 * inspired by implementations by bancor protocol and simondlr
 * https://github.com/ConsenSys/curationmarkets/blob/master/CurationMarkets.sol
 */
contract BondingCurve is StandardToken {
  // must be divisible by 2 & at least 14 to accurately calculate cost
  uint8 public bondingCurveDecimals;
  uint256 public poolBalance = 0;


  // shorthand for decimal
  // dec = (10 ** uint256(bondingCurveDecimals));
  uint256 dec;

  // multiple is the cost of 1 * multple tokens
  // multiple will effect accuracy
  // it should be around 10 ** 8 - 10 ** 12 to limit rounding errors
  uint256 public multiple;


  /**
   * @dev default function
   * this is a disrete approximation and shouldn't be used in practice
   * gas price for this one is 128686
   */

  /**
   * @dev Buy tokens
   * gas cost ~ $1.5
   * @param tokensToMint tokens we want to buy
   * @return {bool}
   */
  function buyTokens(uint256 tokensToMint) public payable returns(bool) {
    uint256 priceForAmount = getBuyPrice(tokensToMint);
    require(msg.value >= priceForAmount);

    uint256 remainingFunds = msg.value.sub(priceForAmount);

    // Send back unspent funds
    if (remainingFunds > 0) {
      msg.sender.transfer(remainingFunds);
      Transfer(0x0, msg.sender, remainingFunds);
    }

    totalSupply_ = totalSupply_.add(tokensToMint);
    balances[msg.sender] = balances[msg.sender].add(tokensToMint);
    poolBalance = poolBalance.add(msg.value.sub(remainingFunds));
    LogMint(tokensToMint, msg.value - remainingFunds);
    return true;
  }

  /**
   * @dev sell tokesn
   * @param _amountToWithdraw amount of tokens to withdraw
   * @return {bool}
   */
  function sellTokens(uint256 _amountToWithdraw) public returns(bool) {
    require(_amountToWithdraw > 0 && balances[msg.sender] >= _amountToWithdraw);
    uint256 reward = getSellReward(_amountToWithdraw);
    msg.sender.transfer(reward);
    poolBalance = poolBalance.sub(reward);
    balances[msg.sender] = balances[msg.sender].sub(_amountToWithdraw);
    totalSupply_ = totalSupply_.sub(_amountToWithdraw);
    LogWithdraw(_amountToWithdraw, reward);
    return true;
  }

  event LogMint(uint256 amountMinted, uint256 totalCost);
  event LogWithdraw(uint256 amountWithdrawn, uint256 reward);
  event LogBondingCurve(string logString, uint256 value);
  
  
  /**
   * Get price for purchacing tokenAmount of tokens
   * @param tokenAmount token amount param
   * @return {uint} finalPrice
   */
  function getBuyPrice(uint256 tokenAmount) public view returns(uint) {
    uint256 totalTokens = tokenAmount + totalSupply_;
    // TODO check overflow
    uint256 newPrice = totalTokens ** 2;
    uint256 finalPrice = ( totalSupply_ + tokenAmount ) **  3 / ( 3 ) - poolBalance;
    return finalPrice;
  }
  
  function getNewPrice(uint256 tokenAmount) public view returns(uint) {
    uint256 totalTokens = tokenAmount + totalSupply_;
    uint256 newPrice = totalTokens ** 2;
    return newPrice;
  }

  /**
   * Get sell price for tokenAmount
   * @param tokenAmount token amount param
   * @return {uint} finalPrice
   */
  function getSellReward(uint256 tokenAmount) public view returns(uint) {
    require(totalSupply_ >= tokenAmount);
    uint256 totalTokens = totalSupply_ - tokenAmount;
    // TODO check overflow
    uint256 newPrice = totalTokens ** 2;
    uint256 finalPrice = poolBalance - ( totalSupply_ - tokenAmount ) **  3 / ( 3 );
    return finalPrice;
  }


  
}

