$(document).ready(function() {
  let charCount;

  $('#tweet-text').on('input', function() {
    charCount = $(this).val().length;
    const remainingChars = 140 - charCount;
    
    const counter = $('#tweet-container').find('.counter');
    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.css('color', 'red')
    } else {
      counter.css('color', '');
    }
  });
});