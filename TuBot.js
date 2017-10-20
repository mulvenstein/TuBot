console.log("the bot started");
var Twitter = require('twitter');
/*
  TODO : Retweet function : follow user if not followin them.
		 add more quotes and songs. 

   		 HIDE KEYS IN CONFIG!!!!!!!

   		 Find a way to put images in tweet, not a link.
*/
 
var client = new Twitter({
  consumer_key: '...',
  consumer_secret: '...',
  access_token_key: '...',
  access_token_secret: '...'
});

client.stream('statuses/filter', {track: '@tubot_' },  function(stream) { //IF SOMEONE @s 
  stream.on('data', function(tweet) {
  	let str = tweet.text ;
    console.log(str);
    let res = str.split(" "); // splits tweet into an array,
    console.log(res);
    let found1 = false;
    let found2 = false;
    for (let i = 0; i < res.length && !found1 || !found2; i++) {
      if (res[i] === "song" || res[i]=="music" || res[i]=="song?" || res[i]=="music?") { // searches for song or music
        found1 = true;
        break;
      }
      else if (res[i]=="pic" || res[i] == "picture" || res[i]=="pic?" || res[i] == "picture?" || res[i]=="selfie" || res[i]=="selfie?"){
      	found2 = true;
      	break;
      }
    }
    if ( found1 ){
    	console.log("give em a beat");
    	//uses weather API to give weather, 
    	let songlist = ["watch?v=41qC3w3UUkU", "watch?v=5wBTdfAkqGU", "watch?v=Mb1ZvUDvLDY", "watch?v=nkJA6SYwa94", "watch?v=05PCmqjIeNE","watch?v=cQZqPi1aHNo", "watch?v=W69SSLfRJho", "watch?v=kgvMpm9z0TI", "watch?v=yVv4IdGtcNw"];
    	let ri = Math.floor((Math.random() * 9) + 1);
    	let song = songlist[ri];
    	let name = tweet.user.screen_name;
    	let str = "@"+name+ " https://youtube.com/" + song ;
    	postTweet(str);
    	console.log(str);
    }
    else if(found2){
      let picarr = ["https://i.imgur.com/DyPTHOi.jpg","https://i.imgur.com/m49mjp6.jpg", "https://i.imgur.com/4cZnH7F.jpg", "https://i.imgur.com/bZhne9a.png", "https://i.imgur.com/78YQmjG.jpg", "https://i.imgur.com/fJ1WtQk.jpg", "https://i.imgur.com/0Pg3HVh.jpg", "https://i.imgur.com/rXsNkWX.jpg"];
      let ri = Math.floor((Math.random() * 8) + 1);
      let name = tweet.user.screen_name;
      let str = "@"+name+ " "+picarr[ri] ;
      postTweet(str);
      console.log(str); 
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

client.stream('user', function(stream) { //IF SOMEONE FOLLWS ME 
  stream.on('follow', function(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  console.log('I was followed by: ' + name + ' ' + screenName);
  let quotearr=["For every dark night, there's a bright day. TY for follow :)","During your life, never stop dreaming. tell your friends to follow ;)", "how many brothers are gonna fall victim to the street? TY for follow.", "biggie sux. lol tell people to follow me.", " in my mind im a blind man doing time. thanks4follow :D","enjoy the stay bro"];
  let ri = Math.floor((Math.random() * 5) + 1);
  let tweet = "@" + screenName + " " + quotearr[ri];
  console.log(tweet);
  postTweet(tweet);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

setInterval(reTweet, 60*60*1000*3); //every 3hour retweets tupac lol
function reTweet () { //set up to retweet every 1 hr 
 
 let params = {
 	q : "tupac, 2Pac",
 	count : 100
 }
  let arr = [];
  client.get('search/tweets', params, assign);
  function assign (error, tweets, response){
  	var tweetz = tweets.statuses;
 	for ( let i=0; i<tweetz.length; i++){
 		arr.push(tweetz[i]);
 	}
  let ri = Math.floor(Math.random() * 100);
  console.log(ri);
  console.log(arr[ri].text);
  tweetId = arr[ri].id_str;
    client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
    if (!error) {
        console.log(tweet);
      }
    });
  }
 
}

function postTweet(txt) { //posts your tweet

  let tweetxD = { //the tweet that will be posted
    status : txt //specifes it goes to my status
  }

  client.post('statuses/update', tweetxD, checkTweet);

  function checkTweet(error, tweet, response){ //checks if tweet sent properly.
    if(error){
      console.log("something broke, shit!");
	} else{
	  console.log("eh it worked");
	}
  }

}

let counter = 1;
setInterval(tupacCounter, 60*60*1000*24); //every day counter to tweet
function tupacCounter () {
  
  let txt = "";
  txt = counter + " days since bot bith. Days until Tupac is back : never :( "; 
  counter += 1 ; 
  let tweetxD = { //the tweet that will be posted
    status : txt //specifes it goes to my status
  }
  
  client.post('statuses/update', tweetxD, checkTweet);

  function checkTweet(error, tweet, response){ //checks if tweet sent properly.
    if(error){
      console.log("something broke, shit!");
	} else{
	  console.log("eh it worked");
	}
  }
}