$(document).ready(function() {

  $(".new-tweet form textarea").on("keyup", function(event) {
    const max = 140;
    let len = $(this).val().length;
    let counter = $ (this).parent().find(".counter");
    // console.log(this);
    let charLeft = counter.text(max - len);
    if (len >  max) {
      counter.addClass('error');
    } else {
      counter.removeClass('error');
    }
  });
});
