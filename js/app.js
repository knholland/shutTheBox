function rollTheDice() {
  var dice = Math.floor(Math.random() * 6);

  while (dice === 0) {
    rollTheDice();
  }
    alert(dice);
    return dice;

}

$('#dice').on("click", function() {
  var dice1 = rollTheDice();
  var dice2 = rollTheDice();

  $('p').html('Di 1: ' + dice1 +'<br />' + 'Di 2: ' + dice2);
});

$('li').on("click", function() {
  var x = $(this).index();
  $(this).css({'background': 'red', 'transform': '180deg'});
});
