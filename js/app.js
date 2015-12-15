$(function() {
  //roll the dice
  var dice1;
  var dice2;
  var tilesLeft = [1,2,3,4,5,6,7,8,9]; //keep track of tiles left
  // var totalSelected = 0;
  // console.log('TOTAL SELECTED: ' + totalSelected);

  $('#dice').on("click", function() {
    dice1 = rollTheDice();
    dice2 = rollTheDice();

    $('#di1').text(dice1);
    $('#di2').text(dice2);
    $('#info').text('Click on tiles that equal up to the ' + (dice1 + dice2) + ' you rolled!');

    var moves = false;
    var tilesLeftTotal = 0;
    possibleMoves();

    if(moves) {
      selectTiles();

    } else {
      $('#info').text('Game over. No more possible moves.');
    }

    function possibleMoves() {
      for(var t = 0; t < tilesLeft.length; t++) {
        if(tilesLeft[t] % dice1 === 0 || tilesLeft[t] % dice2 === 0) {
          console.log(tilesLeft[t]);
          return moves = true;
        } else if (tilesLeft.indexOf(dice1 + 1) === -1 || tilesLeft.indexOf(dice2 + 1) === -1) {
          console.log(tilesLeft[t]);
          return moves = true;
        }
        tilesLeftTotal += tilesLeft[t];
      }
    } //end of possible moves
  }); //end of dice click()

  //allow user to select tiles
  function selectTiles() {
    $('li').on("click", function() {
      var selected = [];
      var totalSelected = 0;
      console.log('TOTAL SELECTED: ' + totalSelected);
      var $selectedTile = $(this).index(); //index of li clicked
      var $tile = $selectedTile + 1; //numeric value of each tile selected
      var count = 0;

      if(totalSelected < (dice1 + dice2)) {
        console.log('smaller');
        tileSelection();

        //Conditions for game logic
        if(totalSelected === dice1 + dice2) { //If a tile is already flipped, player cannot flip again.
          $(this).addClass('flipped').removeClass('tile').unbind('click');
          $('#info').text('Roll Again!');
        } else if (totalSelected > dice1 + dice2) {
          $('#info').text('Tile selected is more than the dice total. Please try again.');
        } else if (totalSelected < dice1 + dice2 && totalSelected <= dice1 + dice2) { //Allow multiple tile flips up to total of dice
          $(this).addClass('flipped').removeClass('tile').unbind('click');
        }
      }
      //tileSelection();

      //process selected tile
      function tileSelection() {
        selected.push($tile);

        for(var s = 0; s < selected.length; s++) {
          totalSelected += selected[s];
        }

        console.log('Selected Tiles:' + selected.length);
        console.log('Selected Total: ' + totalSelected);

        var $test = tilesLeft.indexOf($tile);
        tilesLeft.splice($test,1); //remove selected tile from available tiles

        console.log('Selected: ' + selected);
        console.log('Tiles Left Before Count: ' + tilesLeft);

        for(var i = 0; i < tilesLeft.length; i++) {
          count += tilesLeft[i];
        }

        console.log('Tiles Left Total: ' + count);
        console.log('Dice 1: ' + dice1);
        console.log('Dice 2: ' + dice2);
        console.log('Tiles Left After Count: ' + tilesLeft);
      }//end of tileSelection()
    }); //end of tile click()
  }

  function rollTheDice() {
    var dice = Math.floor((Math.random() * 6)+1);

    while (dice === 0) {
      dice = Math.floor((Math.random() * 6)+1);
    }
    return dice;
  } //end of rollTheDice()

});//end of document.ready()
