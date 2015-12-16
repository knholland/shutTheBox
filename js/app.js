$(function() {
  //roll the dice
  var dice1;
  var dice2;
  var tilesLeft = [1,2,3,4,5,6,7,8,9]; //keep track of tiles left
  var totalThisTurn = 0;
  var tilesLeftTotal = 0;
  var backgrounds = ['-3%','15%','33%','51%','68%','86%','104%'];

  //Start a new game
  $('#newGame').on('click', function() {
    tilesLeft = [1,2,3,4,5,6,7,8,9];
    $('li').removeClass('flipped');
    $('#info').text('Roll the dice!');
    $('#newGame').css('display','none');
    $('#di1').animate({
      'background-position-x': backgrounds[6],
      'background-position-y': '0'
    },200,'linear');

    $('#di2').animate({
      'background-position-x': backgrounds[6]
    },200, 'linear');
  });//end of newGame click()

  $('#dice').on('click', function() {
    dice1 = rollTheDice();
    dice2 = rollTheDice();

    $('#di1').animate({
      'background-position-x': backgrounds[dice1-1],
      'background-position-y': '0'
    },200,'linear');

    $('#di2').animate({
      'background-position-x': backgrounds[dice2-1]
    },200, 'linear');

    $('#info').text('Click on tiles that equal ' + (dice1 + dice2) + '.');

    var moves = false;

    possibleMoves();

    if(moves) {
      totalThisTurn = 0; //reset Total of Tiles selected each dice click
      selectTiles();
    } else {
      $('#info').text('Game over.').css('opacity','1').animate({
          opacity: '0'
        }, 2000, function() {
            $('#info').text('Final Score: ' + finalScore()).css('opacity', '0').animate({
              opacity: '1'
            }, 2000, function() {
              $('#newGame').css('display','block').animate({
                opacity: '1'
              }, 2000);
          });
      });
    } // end of else
    function possibleMoves() {
      for(var i = 0; i < tilesLeft.length; i++) {
        if(tilesLeft[i] === dice1 + dice2) {
           moves = true;
        }
        var runningTotal = tilesLeft[i];

        for(var j = i + 1; j < tilesLeft.length; j++) {
           runningTotal += tilesLeft[j];

           if(tilesLeft[j] + tilesLeft[i] === dice1 + dice2) {
              moves = true;
           }

           if(runningTotal === dice1 + dice2) {
             moves = true;
           }
        } //end of inner loop
      } //end of tilesLeft loop
    } //end of possibleMoves()
  }); //end of dice click()

  var finalScore = function () {
    var win = 0;
    for(var k = 0; k < tilesLeft.length; k++) {
      win += tilesLeft[k];
    }
    return win;
  }

  //allow user to select tiles
  function selectTiles() {
    $('li').off().on("click", function() {
      var selected = [];
      var $selectedTile = $(this).index(); //index of li clicked
      var $tile = $selectedTile + 1; //numeric value of each tile selected
      var count = 0;

      selected.push($tile);

      for(var s = 0; s < selected.length; s++) {
        totalThisTurn += selected[s];
      }

      var $removeTile = tilesLeft.indexOf($tile);
      tilesLeft.splice($removeTile,1); //remove selected tile from available tiles

      for(var i = 0; i < tilesLeft.length; i++) {
        count += tilesLeft[i];
      }

      if ($tile > dice1 + dice2) { //Tile selected is greater than the total of dice roll.
          $('#info').text('Tile selected is more than the dice total. Please roll again.');
      }

      if(totalThisTurn <= (dice1 + dice2)) {
        //Conditions for game logic
        if(totalThisTurn === dice1 + dice2) { //If a tile is already flipped, player cannot flip again.
          $(this).addClass('flipped').unbind('click');
          $('#info').text('Roll Again!');
        } else if (totalThisTurn <= dice1 + dice2) { //Allow multiple tile flips up to total of dice
          $(this).addClass('flipped').unbind('click');
        }
      }

      if(tilesLeft.length === 0) {
        $('#info').text('You closed the box! You win!!').css('opacity','0').animate({
          opacity: '1'
        }, 2000, function() {
           $('#newGame').css('display','block').animate({
              opacity: '1'
            }, 2000);
          });
      }//tilesLeft winner
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
