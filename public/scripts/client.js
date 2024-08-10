$(document).ready(function () {

  const createTweetElement = (tweetData) => {

    const { user: { name, avatars, handle }, content: { text }, created_at } = tweetData;

    const timeAgo = timeago.format(created_at, 'en_US');

    const $tweet = $(`<div class="tweet">
    <header class="tweet-top">
      <div class="tweet-top-left">
        <img class="avatar" alt="avatar" src="${avatars}">
        <article class="username">${name}</article>
      </div>
      <h5 class="handle">${handle}</h5>
    </header>
    <div class="tweet-content">
      <article class="posted-tweet">${text}</article>
    </div>
    <footer class="tweet-bottom">
      <article class="age">
        ${timeAgo}
      </article>
      <div class="tweet-bottom-right">
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </div>`);

    return $tweet;
  };

  const renderTweets = (tweets) => {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $(`.tweets-container`).prepend($tweet);
    });
  };

  const loadTweets = (callback) => {
    $.ajax("/tweets", { method: "GET" })
      .then(tweets => {
        console.log("Tweets successfully retrieved! =>", tweets);
        callback(tweets);
      })
      .catch(error => {
        console.log("Error retrieving tweets! =>", error);
      });
  }

  loadTweets(renderTweets);

  // SUBMIT TWEET //
  const tweetContainer = document.getElementById("tweet-container");

  $(tweetContainer).on("submit", function (event) {
    event.preventDefault();
    const tweetCheck = document.getElementById('tweet-text').value;

    // Error handling...
    if (!tweetCheck) {
      return alert("Field is blank. Please enter text.")
    }
    if (tweetCheck.length > 140) {
      return alert("Tweet is too long!")
    }

    // Success! Submit tweet...
    const tweetContent = $(this).serialize();

    console.log("Form submitted! Performing AJAX request:", tweetContent);
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: tweetContent,
      success: function (response) {
        console.log("Tweet submitted:", response);
        tweetContainer.reset();
      },
      error: function (error) {
        console.log("Error submitting tweet:", error);
      }
    });
  });

});