(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var TowersUI = Hanoi.TowersUI = function () {
    this.game = new Hanoi.Game();
    this.originPile = null;
    this.installClickHandlers();
  };

  TowersUI.prototype.installClickHandlers = function () {
    ui = this;
    game = this.game;


    $('.pile').on('click', function() {
      var $pile = $(this);

      if (!ui.originPile) {
        ui.originPile = $pile;
        $pile.toggleClass('hearts');
	$pile.toggleClass('skulls');
      } else {
        var origin = parseInt(ui.originPile.attr('id')) - 1;
        var destination = parseInt($pile.attr('id')) - 1;
        game.move(origin, destination);
        ui.originPile.toggleClass('hearts');
	ui.originPile.toggleClass('skulls');
        ui.originPile = null;
      }
    });
  };

  var Game = Hanoi.Game = function () {
    this.towers = [[3, 2, 1], [], []];
  };

  Game.prototype.turn = function () {

  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());

      var $originPile = $('.pile#' + (startTowerIdx + 1));
      var $destinationPile = $('.pile#' + (endTowerIdx + 1));

      var $ring = $originPile.find('.ring').first().remove();
      $destinationPile.prepend($ring);
      if (this.isWon()) {
        $('.container').before($("<h1>a winrar is you!</h1>"));
	$('.pile').off('click');
      }
      return true;
    } else {
      return false;
    }
  };

  // Game.prototype.run = function () {
  //   var game = this;
  //
  //   READER.question("Enter a starting tower: ",function (start) {
  //     var startTowerIdx = parseInt(start);
  //     READER.question("Enter an ending tower: ", function (end) {
  //       var endTowerIdx = parseInt(end);
  //       game.takeTurn(startTowerIdx,endTowerIdx);
  //     });
  //   });
  // };
  //
  // Game.prototype.takeTurn = function (start,end){
  //   var game = this;
  //
  //   if (game.move(start,end)) {
  //     console.log(game.towers);
  //   } else {
  //     console.log("Invalid move!")
  //   }
  //
  //   if (game.isWon()) {
  //     console.log("You win!");
  //     READER.close();
  //   } else {
  //     game.run();
  //   }
  // }
})(this);

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.
$(document).ready(function(){
  var ui = new Hanoi.TowersUI();
});
