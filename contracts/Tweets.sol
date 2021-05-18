pragma solidity >=0.5.0 <0.9.0;

contract Tweets{

Tweeter[]  public tweets;

struct Tweeter{
    uint id;
    string content;
    address author;
    bool deleted;
}

function createTweets(string memory _content) public {
     uint id = tweets.length +1;
     tweets.push(Tweeter(id, _content, msg.sender, false));
        
}

}
