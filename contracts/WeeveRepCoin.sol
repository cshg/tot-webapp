pragma solidity ^0.4.18;

import "./ConvertLib.sol";
import "./StandardToken.sol";
import "./Ownable.sol";
import "./BondingCurve.sol";
import "./InflationaryToken.sol";

contract WeeveRepCoin is BondingCurve, InflationaryToken {
  using ConvertLib for uint;

  // uint public constant MAX_UINT = (2**256) - 1;

  string public constant name = "Weeve Reputation Token";
  string public constant symbol = "WRT";
  uint8 public constant decimals = 18;

  uint256 public constant TIME_INTERVAL = 1 hours;
  uint256 public constant HOURLY_INFLATION = 0; // no inflation in the baseline model
  // uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));
  uint256 public constant INITIAL_SUPPLY = 0;

  event Log(string logString, uint value);

  /**
   * @dev Not needed right now
   * @param addr that for which to check the balance
   * @return {uint} banace in Ether
   */
  function getBalanceInEth(address addr) public view returns(uint){
    return ConvertLib.convert(balanceOf(addr),1);
  }

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  function WeeveRepCoin() public {
    owner = msg.sender;

    // inflation params
    lastInflationCalc = now;
    inflationRatePerInterval = HOURLY_INFLATION;
    timeInterval = TIME_INTERVAL;

    // bonding curve params
    bondingCurveDecimals = decimals;
    dec = 10 ** uint256(bondingCurveDecimals);
    multiple = 100000000000000; //100000000000000 wei 0.0001 ether

    // token params
    totalSupply_ = INITIAL_SUPPLY;
    balances[owner] = INITIAL_SUPPLY;
    Transfer(0x0, owner, INITIAL_SUPPLY);
  }



  struct Entry {
    uint frequency;
    string text;
    uint score;
  }
  
  Entry[] public allEntries;
  mapping (address => Entry) public providers;
    
  function createEntry(uint _frequency, string _text) {
    providers[msg.sender].frequency = _frequency;
    providers[msg.sender].text = _text;
    providers[msg.sender].score = 0;
  }

  function upvote(address entry){
    //@todo validate if entry exists
    providers[entry].score += balances[msg.sender];
    }
    
  function downvote(address entry){
    //@todo validate if entry exists
    providers[entry].score -= balances[msg.sender];
    }

  function voteCount(address entry) public view returns (uint) {
      return providers[entry].score;
  } 
  
   function getFrequency(address entry) public view returns (uint) {
      return providers[entry].frequency;
  } 
  
   function getText(address entry) public view returns (string) {
      return providers[entry].text;
  } 

}
