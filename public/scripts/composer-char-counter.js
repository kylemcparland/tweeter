$(document).ready(function() {
  let charCount;
  
  $("#tweet-text").on("input", function(event) {
    charCount = $(this).val().length;
    // console.log(event.originalEvent.data);
    let remainingChars = 140 - charCount;
    console.log(remainingChars);

    let counter = $(this).closest("#tweet-container").find(".counter");

    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.css("color", "red")
    } else {
      counter.css("color", "");
    }
  });
});