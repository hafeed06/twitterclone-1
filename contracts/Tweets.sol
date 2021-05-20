pragma solidity ^0.8.0;

contract Tweets {

Tweeter[] public tweets;

    struct Tweeter {
        uint id;
        string content;
        address author;
        bool deleted;
    }

    /**
	 * @dev We can fix the comment later. This is just a fix since we were having issues access the tweets array direclty
     * Now this should work 'tweets = await instance.readTweets()'
	 */
    function readTweets() public view returns (Tweeter[] memory){
        return tweets;
    }

    function createTweets(string memory _content) public {
        uint id = tweets.length + 1;
        tweets.push(Tweeter(id, _content, msg.sender, false));
    }

}
