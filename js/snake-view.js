var Board = require("./snake.js");

var View = function (board, $el) {
  this.board = board;
  this.$el = $el;
};

View.prototype.play = function () {
  var callback = function () {
    this.bindEvents();

    if (this.board.checkSnake()) {
      this.board.snake1.move();
      this.board.checkApple();
      this.render();
    }
    else {
      this.gameOver();
      clearInterval();
    }
  }.bind(this);
  setInterval(callback, 80);
}

View.prototype.bindEvents = function () {
  snake1 = this.board.snake1;
  key('left', function () {
    snake1.turn("W");
  });
      key('right', function () {
        snake1.turn("E");
      });
      key('up', function () {
        snake1.turn("N");
      });
      key('down', function () {
        snake1.turn("S");
      });

      var resetGame = function (e) {
        $('h2').removeClass();
        $('button').removeClass();
        this.board = new window.Snake.SnakeBoard();
        $('li').each(function (i, el) {
          $(el).removeClass().addClass('open');
        });
      }.bind(this);
      $('button').on('click', resetGame)
};


View.prototype.setupGrid = function () {
  this.$el.append("<ul>");
  var $ul = $("<ul>").addClass("snake-grid group");
  for (var i = 0; i < 625; i++) {
    var pos = [parseInt(i / 25), i % 25];
    $("<li>").addClass("open").data("pos", pos).appendTo($ul);
  }
  this.$el.html($ul);
};

View.prototype.gameOver = function () {
  $('h2').addClass('game-over');
  $('button').addClass('game-over');
  $('.apple').removeClass();
}

View.prototype.render = function () {
  var board = this.board;
  var snake1 = board.snake1;

  var positions1 = snake1.segments;

  $('.score1').html(snake1.score);

  $('li').each(function (i, el) {
    $(el).removeClass().addClass('open');
    pos = $(el).data("pos");
    for(var j=0; j < positions1.length; j++) {
      if (snake1.equal(pos,positions1[j])) {
        $(el).addClass('has-snake1').removeClass('open');
      }
      else if (snake1.equal(pos, board.apple)) {
        $(el).addClass('apple').removeClass('open');
      }
    }
  });
};

module.exports = View;
