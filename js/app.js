$(function() {
  //roll the dice
  var dice;
  var dice2;

  $('#dice').on("click", function() {
    dice1 = rollTheDice();
    dice2 = rollTheDice();

    $('p').html('Di 1: ' + dice1 +'<br />' + 'Di 2: ' + dice2);
  });

  var $tilesLeft = [1,2,3,4,5,6,7,8,9]; //keep track of tiles left

  //allow user to select tiles
  $('li').on("click", function() {
    var $selected = [];
    //var $tilesLeft = [1,2,3,4,5,6,7,8,9]; //keep track of tiles left
    var $selectedTile = $(this).index(); //index of li clicked
    var $tile = $selectedTile + 1; //numeric value of each tile selected

    $selected.push($tile);

    var $test = $tilesLeft.indexOf($tile);
    $tilesLeft.splice($test,1);

    console.log('Selected: ' + $selected);
    console.log('Tiles Left: ' + $tilesLeft);

    //check if tiles selected equal dice total
    var count = 0;
    console.log('Count: ' + count);
    console.log('Dice 1: ' + dice1);
    console.log('Dice 2: ' + dice2);

    for(var i = 0; i < $tilesLeft.length; i++) {
      count += $tilesLeft[i];
      console.log('Count Loop: ' + count);
    }

    //$tilesLeft.forEach(function(t){ console.log('forEach Count:' + count); return count += t;})
    console.log('Tiles Left: ' + $tilesLeft);

    if(count < dice1 + dice2) { //no more moves possible  -- dice total is larger than any tiles available
      console.log('If: ' + count);
      alert('Game Over.');
      console.log('Final Score: ' + $tilesLeft);
    } else if ($tile <= dice1 + dice2) { //select the tile
      //$(this).css('background-color', 'red');
      $(this).addClass('thumbOpened');
    } else { //tile doesn't equal total rolled
      alert('Uh oh...the tiles you chose don\'t equal the dice total. Please try again.');
    }
  });

  function rollTheDice() {
    var dice = Math.floor((Math.random() * 6)+1);

    while (dice === 0) {
      dice = Math.floor((Math.random() * 6)+1);
    }
    return dice;
  }

});//end of document.ready()
