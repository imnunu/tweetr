/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [];

  $('#compose').click(function(){
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
  });

  function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('tweet-post');
    var $header = $('<header>').addClass('tweet-header');
    var $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.regular);
    var $userName = $('<h2>').addClass('userName').text(tweet.user.name);
    var $handle = $('<p>').addClass('handle').text(tweet.user.handle);
    var $content = $('<p>').addClass('tweet-content').text(tweet.content.text);
    var $footer = $('<footer>').addClass('tweet-footer');
    var $timeago = $('<time>').addClass('timeago').attr('datetime', new Date(tweet.created_at).toISOString());

    $header.append($avatar, $userName, $handle);
    $footer.append($timeago);
    $tweet.append($header);
    $tweet.append($content);
    $tweet.append($footer);

    return $tweet;
  }


   function renderTweets(tweets) {
     $('#tweet-container').append(tweets.map(createTweetElement));
     $("time.timeago").timeago();
     //  tweets.forEach(function(tweet) {
     //  let $tweet = createTweetElement(tweet);
     //  $('#tweet-container').append($tweet);
     //  });
   }

    $.ajax({
      method: 'GET',
      url:'/tweets'
    }).done(function(data) {
      console.log('GET function success');
      renderTweets(data);
      });
});


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




// $(document).ready(function(){
//   $("#compose").click(function(){
//     $(".new-tweet").slideToggle();
//   });
// });


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
