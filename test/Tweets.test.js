const { expect } = require("chai");

require("chai").should();

const Tweets = artifacts.require("Tweets");

contract("Tweets", function ([]) {
	beforeEach(async () => {
		this.Tweets = await Tweets.new();
	});

	describe("Creating tweets", () => {
		it("should emit an event and create a tweet", async () => {
			await this.Tweets.createTweets("First Tweet")

			const tweet = await this.Tweets.readTweets()
			console.log(tweet)
			tweet[0].content.should.equal("First Tweet")
		})
		
		it("should emit an event and edit a tweet", async () => {
			await this.Tweets.createTweets("First Tweet")
			await this.Tweets.editTweets(1, "First Tweet Edited");

			const tweet = await this.Tweets.readTweets();
			console.log(tweet)
			tweet[0].content.should.equal("First Tweet Edited");
		});
		
		it("should emit an event and delete a tweet", async () => {
			await this.Tweets.createTweets("First Tweet to be deleted")
			await this.Tweets.delTweets(1);

			const tweets = await this.Tweets.readTweets();
			console.log(tweets)
			tweets[0].deleted.should.equal(true);
		});
	})

})
