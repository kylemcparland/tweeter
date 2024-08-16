$(document).ready(function() {

  // ----- Create Tweet ----- //
  const createTweetElement = (tweetData) => {
    const { user: { name, avatars, handle }, content: { text }, created_at } = tweetData;
    const timeAgo = timeago.format(created_at, 'en_US');

    // Generate tweet CSS...
    const $tweet = $(`
      <div class="tweet">
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
      </div>
    `);

    // Handle cross-site scripting...
    $tweet.find('.posted-tweet').text(text);
    return $tweet;
  };


  // ----- Render Tweets ----- //
  const renderTweets = (tweets, isNewTweet) => {
    const $tweetsContainer = $('.tweets-container').empty();

    // Populate page with tweets from database...
    tweets.forEach((tweet, index) => {
      const $tweet = createTweetElement(tweet);

      // Highlight if new tweet...
      if (index === tweets.length - 1 && isNewTweet) {
        $tweet.addClass('highlight');
      }

      $tweetsContainer.prepend($tweet);
    });
  };


  // ----- Load Tweets from Database ----- //
  const loadTweets = (callback, isNewTweet) => {
    $.ajax('/tweets', { method: 'GET' })
      .then(tweets => {
        callback(tweets, isNewTweet);
      })
      .catch(error => {
        console.error("Error retrieving tweets:", error);
      });
  };


  // ----- Error Handling ----- //
  const showError = (errorText) => {
    const $error = $(`
      <div id="error-msg" style="display: none;">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p> ${errorText} <p>
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
    `);

    $('.error-container').empty().append($error);
    $error.slideDown(200);
  };


  // ----- Toggle New Tweet Form ----- //
  const toggleNewTweetForm = (formVisable) => {
    const $newTweet = $('.new-tweet');
    if (formVisable) {
      $newTweet.slideUp(300);
    } else {
      setRandomPlaceholderText();
      $newTweet.slideDown(300);
      $('#tweet-text').focus();
    }
  };


  // ----- Random Placeholder Text ----- //
  const setRandomPlaceholderText = () => {
    const placeholderArr = [
      "Mrs. Krabappel and Principal Skinner were in the closet making babies and I saw one of the babies and the baby looked at me!",
      "And when the doctor said I didn't have worms anymore, that was the happiest day of my life.",
      "Me fail english? That's unpossible!",
      "I heard your dad went into a restaurant and ate all the food in the restaurant and they had to close the restaurant.",
      "The doctor said I wouldn't have so many nose bleeds if I kept my finger outta there.",
      "Hi, Lisa! Hi, Super Nintendo Chalmers! I'm learnding!"
    ];
    const randomNum = Math.floor(Math.random() * placeholderArr.length);
    $('#tweet-text').attr('placeholder', placeholderArr[randomNum]);
  };


  // ----- Submit Tweet Form ----- //
  $('#tweet-text').keypress((event) => {
    if (event.which == '13') {
      event.preventDefault();
      $('#tweet-container').submit();
    }
  });


  // --- Submit New Tweet --- //
  $('#tweet-container').on('submit', function(event) {
    event.preventDefault();
    const tweetCheck = $('#tweet-text').val().trim();

    // Error handling...
    if (!tweetCheck) {
      return showError(`You can't submit an empty tweet!`);
    }
    if (tweetCheck.length > 140) {
      return showError(`Your tweet is too long! Remember: Brevity is the soul of wit!`);
    }

    // Success! Remove error...
    if ($('#error-msg').length) {
      $('#error-msg').slideUp(200, function() {
        $(this).remove();
      });
    }

    // ...and submit tweet!
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      success: function() {
        $('.counter').text(140);
        $('#tweet-container').get(0).reset();
        setRandomPlaceholderText();
        loadTweets(renderTweets, true);
      },
      error: function() {
        return showError(`Error submitting tweet! Please refresh and try again.`);
      }
    });
  });


  // ----- Navbar Event ----- //
  $('#navright').on('click', () => {
    const formVisable = $('.new-tweet:visible').length;
    toggleNewTweetForm(formVisable);
  });


  // ----- Scroll Events ----- //
  $(window).on('scroll', function() {
    const $scrollUp = $('#scroll-up');
    const $navRight = $('#navright');

    // Scrolled down far enough. Buttons appear/disappear!
    if ($(window).scrollTop() > 363) {
      $scrollUp.css('display', 'flex').addClass('appear');
      if ($(window).width() < 1007) {
        $navRight.css('display', 'none');
      }
    } else {
      $scrollUp.css('display', 'none');
      $navRight.css('display', 'flex');
    }
  });


  // ----- Resize Event ----- //
  $(window).on("resize", () => {
    if ($(window).scrollTop() > 363 && $(window).width() < 1007) {
      $('#navright').css('display', 'none');
    }
  })


  // ----- Scroll Button Event ----- //
  $('#scroll-up').on("click", function() {
    setRandomPlaceholderText();
    toggleNewTweetForm();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });


  // ----- Initialize Page ----- //
  loadTweets(renderTweets);
});