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

   }

    $.ajax({
      method: 'GET',
      url:'/tweets'
    }).done(function(data) {
      console.log('GET function success');
      renderTweets(data);
      });
});


// Form Submission using JQuery
$(function() {
  $('#postNewTweet').on('submit', function(event) {
    event.preventDefault();
    let input = $('.new-tweet textarea');
    if (!input.val()) {
      alert("It's empty!")
    } else if (input.val().length > 140) {
      alert('Your tweet content is too long!')
    } else {
      input = input.serialize();
      $.ajax({
          url:'/tweets',
          method: 'POST',
          data: input,
        }).done(function(success) {
            $('#postNewTweet').removeClass('error');
            window.location.reload(true);
            $('.new-tweet textarea').val('');
            console.log(success);
          }).fail(function(err) {
            $('#postNewTweet').addClass('error');
          });
        }
      });
  });
