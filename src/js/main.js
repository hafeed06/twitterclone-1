ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "content",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "author",
          "type": "address"
        }
      ],
      "name": "Tweeted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tweets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "content",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "author",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "deleted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "readTweets",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "author",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "deleted",
              "type": "bool"
            }
          ],
          "internalType": "struct Tweets.Tweeter[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_content",
          "type": "string"
        }
      ],
      "name": "createTweets",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "delTweets",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_newcontent",
          "type": "string"
        }
      ],
      "name": "editTweets",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

myModal = new bootstrap.Modal(document.getElementById('myModal'))

window.addEventListener('load', async () => {
	if (typeof web3 !== 'undefined') {
		window.web3 = new Web3(web3.currentProvider)
		USER_ADDRESS = await web3.eth.getAccounts()
        window.USER_ADDRESS = USER_ADDRESS[0]
	}
	else {
		window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/e44bd34397ce456bbef21eaccdce5556"));
		alert("HttpProvider")
	}

	await readTweets()

});

readTweets = async () => {

	let contractAddress = "0x9851B2deAA558f40Cda156B9f5a52dd6F848Ba6f";
	Tweets = await new web3.eth.Contract(ABI, contractAddress);
	tweetsFeed = await Tweets.methods.readTweets().call()
	tweetsFeed = tweetsFeed.reverse()
	feedHTML = `<div class="table-wrap" style="border:solid 1px #bad1f5; overflow:hidden; border-radius:4px;">
				<table class="table table-striped">
				<tbody style="width:600px;">`

	for (tweet of tweetsFeed){
		if (!tweet.deleted){
			  feedHTML += `<tr>
						<td style="width:500px">
						<strong>${tweet.author}</strong>
						<br>
						<span>${tweet.content}</span>
						</td>`

        if ( tweet.author == USER_ADDRESS){
            feedHTML += `
						<td style="width:100px"><button type="button" class="btn btn-outline-primary"
							style="font-size:14px;" onclick="editTweetPrompt(${tweet.id})">Edit</button></td>
						<td><button onclick="deleteTweet(${tweet.id})" type="button" class="btn btn-outline-danger" style="font-size:14px;">Delete</button>
						</td></tr>`
        }
		}
	}

	feedHTML += `</tbody></table></div>`
	document.getElementById('feedBody').innerHTML = feedHTML
}

createTweets = async () => {
	
	text = document.getElementById("tweetText").value
	let contractAddress = "0x9851B2deAA558f40Cda156B9f5a52dd6F848Ba6f";
	Tweets = await new web3.eth.Contract(ABI, contractAddress);
	document.getElementById("tweetText").value = ''
	try {
		Tweets.methods.createTweets(text).send({from: USER_ADDRESS}).then(() => readTweets())
	}
	catch (error) {
		console.log(error)
	}
	
}

editTweetPrompt = (id) => {

	document.getElementById('editTweetId').value = id
	myModal.show()
}

editTweet = () => {

	id = document.getElementById('editTweetId').value
	content = document.getElementById('editedContent').value

	try {
		Tweets.methods.editTweets(id, content).send({from: USER_ADDRESS}).then(() => readTweets())
	}
	catch (error) {
		console.log(error)
	}

	myModal.hide()
}

deleteTweet = (id) => {
	try {
		Tweets.methods.delTweets(id).send({from: USER_ADDRESS}).then(() => readTweets())
	}
	catch (error) {
		console.log(error)
	}
}

callMetamask = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      console.log('ethereum accessible')
      document.getElementById('dismiss').style.display='none';
      try {
          await ethereum.enable();
      
      } catch (error) {
          console.log(error)
      }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

