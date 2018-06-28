/* pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    constructor(string initialMessage) public {
        message = initialMessage;
    }

    /* function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    function setMessage(string newMessage) public {
        message = newMessage;
    }

}
 */
pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;
    
    constructor() public{
        manager = msg.sender;
    }
    
    function enter() public payable{
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }
    function seeAllplayer() public view returns(address[]){
        return players;
    }
    
    function random() private view returns (uint256){
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickwinner() public restrict{
        uint index  = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
        
    }
    
    modifier restrict(){
        require(msg.sender == manager);
        _;
    }
}