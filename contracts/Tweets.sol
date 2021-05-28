pragma solidity ^0.8.0;

contract Tweets {

Tweeter[] public tweets;

    struct Tweeter {
        uint id;
        string content;
        address author;
        bool deleted;
    }

    event Tweeted(uint256 id, string content, address author);

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
        emit Tweeted(id, _content, msg.sender);
    }

    function delTweets(uint _index) public {
        uint id = _index - 1;
        Tweeter storage tweet = tweets[id];
        require(
			msg.sender == tweet.author,
			"Tweet can only be deleted by owner"
		);
        tweet.deleted = true;
        emit Tweeted(id, tweet.content, msg.sender);
    }

    function editTweets(uint _index, string memory _newcontent) public {
        uint id = _index - 1;
        Tweeter storage tweet = tweets[id];
         require(
			msg.sender == tweet.author,
			"Tweet can only be edited by owner"
		);
        tweet.content = _newcontent;
        emit Tweeted(id, tweet.content, msg.sender);
    }
}
