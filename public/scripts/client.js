$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = function (tweetData) {

    const name = tweetData.user.name;
    const avatar = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const content = tweetData.content.text;
    const created_at = tweetData.created_at;

    console.log(avatar);

    const $tweet = $(`<div class="tweet">
    <header class="tweet-top">
      <div class="tweet-top-left">
        <img class="avatar" alt="avatar" src="${avatar}">
        <article class="username">${name}</article>
      </div>
      <h5 class="handle">${handle}</h5>
    </header>
    <div class="tweet-content">
      <article class="posted-tweet">${content}</article>
    </div>
    <footer class="tweet-bottom">
      <article class="age">
        ${created_at}
      </article>
      <div class="tweet-bottom-right">
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </div>`);

    return $tweet;
  }

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(`.tweets-container`).append($tweet);
    }
  }

  renderTweets(data)

})