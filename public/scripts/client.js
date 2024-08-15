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
      <article class="posted-tweet"></article>
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

    $tweet.find(".posted-tweet").text(text);

    return $tweet;
  };

  const renderTweets = (tweets, boolean) => {
    $(`.tweets-container`).empty();
    for (const tweet of tweets) {

      const $tweet = createTweetElement(tweet);
      // If newest tweet...
      if (tweet === tweets[tweets.length - 1] && boolean) {
        $tweet.addClass('highlight');
      }

      $(`.tweets-container`).prepend($tweet);
    };
  };

  const loadTweets = (callback, boolean) => {
    $.ajax("/tweets", { method: "GET" })
      .then(tweets => {
        console.log("Tweets successfully retrieved! =>", tweets);
        callback(tweets, boolean);
      })
      .catch(error => {
        console.log("Error retrieving tweets! =>", error);
      });
  }

  loadTweets(renderTweets);


  //// -------------- SUBMIT TWEET -------------- ////
  const tweetContainer = document.getElementById("tweet-container");

  $(tweetContainer).on("submit", function (event) {
    event.preventDefault();
    const tweetCheck = document.getElementById('tweet-text').value.trim();

    // Error handling...
    // (Consider separating as separate function isTweetValid())
    if (!tweetCheck) {
      return errorMsg(`You can't submit an empty tweet!`);
    }
    if (tweetCheck.length > 140) {
      return errorMsg(`Your tweet is too long! Remember: Brevity is the soul of wit!`);
    }

    // Success! Submit tweet...

    if ($('#error-msg').length > 0) {
      $('#error-msg').slideUp(200, function () {
        $(this).remove();
      })
    }

    const tweetContent = $(this).serialize();

    console.log("Form submitted! Performing AJAX request:", tweetContent);
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: tweetContent,
      success: function (response) {
        console.log("Tweet submitted:", response);
        $('.counter').text(140);
        tweetContainer.reset();
        randomPlaceholderMsg();
        loadTweets(renderTweets, true);
      },
      error: function (error) {
        console.log("Error submitting tweet:", error);
        return errorMsg(`Error submitting tweet! Please refresh and try again.`);
      }
    });
  });

  // ---- SUBMIT TWEET PALCEHOLDER TEXT ---- //

  const randomPlaceholderMsg = () => {
    const placeholderArr = [
      "Mrs. Krabappel and Principal Skinner were in the closet making babies and I saw one of the babies and the baby looked at me!",
      "And when the doctor said I didn't have worms anymore, that was the happiest day of my life.",
      "Me fail english? That's unpossible!",
      "I heard your dad went into a restaurant and ate all the food in the restaurant and they had to close the restaurant.",
      "The doctor said I wouldn't have so many nose bleeds if I kept my finger outta there.",
      "Hi, Lisa! Hi, Super Nintendo Chalmers! I'm learnding!"
    ];
    const randomNum = Math.floor(Math.random() * placeholderArr.length);
    $("#tweet-text").attr("placeholder", placeholderArr[randomNum]);
  }

  randomPlaceholderMsg()


  // ---- ERROR MESSAGE ---- //
  const errorMsg = function (errorText) {
    const $error = $(`<div id="error-msg" style="display: none;">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <p> ${errorText} <p>
      <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
      `)

    $(`.error-container`).empty().append($error);
    $error.slideDown(200);
  }

  const navRight = document.getElementById('navright')

  $(navRight).on("click", function () {

    const formVisable = $('.new-tweet:visible').length;
    if (!formVisable) {
      randomPlaceholderMsg();
      $(`.new-tweet`).slideDown(300);
      $('#tweet-text').focus();
    } else {
      $(`.new-tweet`).slideUp(300);
    }
  })

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 350) {
      $(`#scroll-up`).css("display", "flex");
      $(`#scroll-up`).addClass('appear');
      // $(navRight).css("display", "none");
    } else {
      $(`#scroll-up`).css("display", "none");
      // $(navRight).css("display", "flex");
    }
  })

  $('#scroll-up').on("click", function () {
    randomPlaceholderMsg()
    $(`.new-tweet`).slideDown(300);
    $('#tweet-text').focus();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  })

});

// JavaScript: You could consider refactoring your code to make it more modular. For example, the code for showing and hiding the scroll-up button could be put into a separate function.