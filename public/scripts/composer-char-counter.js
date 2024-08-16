$(document).ready(function() {
  
  // ----- Character Counter ----- //
  $('#tweet-text').on('input', function() {
    const charCount = $(this).val().length;
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