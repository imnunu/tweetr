/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Fake data taken from tweets.json
 // http://vanillicon.com/b692ed7c39be684f88950544e409f15c.png
$(document).ready(function() {

  const data = [];


  function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('tweet-post');
    var $header = $('<header>').addClass('tweet-header');
    var $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.regular);
    var $userName = $('<h2>').addClass('userName').text(tweet.user.name);
    var $handle = $('<p>').addClass('handle').text(tweet.user.handle);
    var $content = $('<p>').addClass('tweet-content').text(tweet.content.text);
    var $footer = $('<footer>').addClass('tweet-footer');
    var $timeago = $('<time>').addClass('timeago').attr('datetime', new Date(tweet.created_at).toISOString());

    $("time.timeago").timeago();
    $header.append($avatar, $userName, $handle);
    $footer.append($timeago);
    $tweet.append($header);
    $tweet.append($content);
    $tweet.append($footer);

    return $tweet;
  }

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
   function renderTweets(tweets) {
    //  tweets.forEach(function(tweet) {
    //  let $tweet = createTweetElement(tweet);
    //  $('#tweet-container').append($tweet);
    //  });
     $('#tweet-container').append(tweets.map(createTweetElement));

   }


  // $(function() {
  // function LoadTweet(tweets) {


    console.log('LoadTweet');

    $.ajax({
      method: 'GET',
      url:'/tweets'
    }).done(function(data) {
      console.log('GET function success');
      renderTweets(data);
      });
  // }
  // });

  // renderTweets(data);
});


 // var data = [
  //  {
  //    "user": {
  //      "name": "Newton",
  //      "avatars": {
  //        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //      },
  //      "handle": "@SirIsaac"
  //    },
  //    "content": {
  //      "text": "If I have seen further it is by standing on the shoulders of giants"
  //    },
  //    "created_at": 1461116232227
  //  },
  //  {
  //    "user": {
  //      "name": "Descartes",
  //      "avatars": {
  //        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //      },
  //      "handle": "@rd" },
  //    "content": {
  //      "text": "Je pense , donc je suis"
  //    },
  //    "created_at": 1461113959088
  //  },
  //  {
  //    "user": {
  //      "name": "Johann von Goethe",
  //      "avatars": {
  //        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //      },
  //      "handle": "@johann49"
  //    },
  //    "content": {
  //      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //    },
  //    "created_at": 1461113796368
  //  }
 // ];






//Form Submission using JQuery
$(function() {
  $('#postNewTweet').on('submit', function(event) {
    event.preventDefault();
    let $input = $("textarea").serialize();

    if ($input.length > 140) {
      alert('Your tweet content is too long!')
    } else if ($input === '' || $input === ' ') {
      alret ('Please type in something')
    } else {
      $.ajax({
          url:'/tweets',
          method: 'POST',
          data: $input,
        }).done(function(success) {
            $('#postNewTweet').removeClass('error');
            window.location.reload(true);

            console.log(success);
          }).fail(function(err) {
            $('#postNewTweet').addClass('error');
          });
        }
      });
  });



//========================================================================

// $(function() {
//   function createTweetElement(tweet) {
//     var $tweet = $('<article>').addClass('tweet-post');
//     var $header = $('<header>').addClass('tweet-header');
//     var $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.regular);
//     var $userName = $('<h2>').addClass('userName').text(tweet.user.name);
//     var $handle = $('<p>').addClass('handle').text(tweet.user.handle);
//     var $content = $('<p>').addClass('tweet-content').text(tweet.content.text);
//     var $footer = $('<footer>').addClass('tweet-footer');
//     var $createDate = $('<span>').addClass('date').text((tweet.created_at).toString());
//
//     $header.append($avatar, $userName, $handle);
//     $footer.append($createDate);
//     $tweet.append($header);
//     $tweet.append($content);
//     $tweet.append($footer);
//
//     return $tweet;
//   }
//
//   function renderTweets(tweets) {
//     tweets.forEach(function(tweet) {
//     var $tweet = createTweetElement(tweet);
//     $('#tweet-container').append($tweet);
//     });
//   }
//
//   $(document).ready(function() {
//     renderTweets(data);
//   });
//
//   $.ajax({
//     method: 'GET',
//     url:'/tweets'
//   }).done(function() {
//
//
//   });
//
//   $('#postNewTweet').on('submit', function(event) {
//     event.preventDefault();
//     var
//     var
//     $.ajax({
//       url:'/tweets',
//       method: 'POST',
//       data: {
//
//       }
//     }).done(function() {
//       $('#postNewTweet').removeClass('error');
//
//
//
//
//
//     }).fail(function(err) {
//       $('#postNewTweet').addClass('error');
//     });
//   });
// });
