/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	(function() {
	  window.Snake = window.Snake || {};
	  var SnakeBoard = window.Snake.SnakeBoard = __webpack_require__(1);
	  var SnakeView = window.Snake.SnakeView = __webpack_require__(2);
	  var board = new SnakeBoard();
	  var rootEl = $('.snake');
	  var view = new SnakeView(board, rootEl);
	
	  view.setupGrid();
	  view.play();
	})();


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Snake = function () {
	  this.direction = "N";
	  this.segments = [[parseInt(Math.random() * 15 + 10),parseInt(Math.random() * 25)]];
	  this.head = this.segments[0];
	  this.score = 0;
	};
	
	Snake.prototype.move = function () {
	  this.lastPosition = this.segments[this.segments.length - 1];
	  for(i = this.segments.length - 1; i > 0; i--) {
	    this.segments[i] = this.segments[i - 1];
	  }
	  if (this.direction === "N") {
	    this.segments[0] = this.plus(this.head, [-1, 0]);
	  } else if (this.direction === "E") {
	    this.segments[0] = this.plus(this.head, [0, 1]);
	  } else if (this.direction === "W") {
	    this.segments[0] = this.plus(this.head, [0, -1]);
	  } else if (this.direction === "S") {
	    this.segments[0] = this.plus(this.head, [1, 0]);
	  }
	  this.head = this.segments[0];
	};
	
	Snake.prototype.turn = function (direction) {
	  if (this.isOpposite(direction)) {
	    return;
	  } else {
	    this.direction = direction;
	  }
	};
	
	Snake.prototype.isOpposite = function (dir) {
	  if (this.direction === "N") {
	    return dir === "S";
	  } else if (this.direction === "E") {
	    return dir === "W";
	  } else if (this.direction === "W") {
	    return dir === "E";
	  } else if (this.direction === "S") {
	    return dir === "N";
	  }
	};
	
	Snake.prototype.plus = function (pos1, direction) {
	  return [pos1[0] + direction[0], pos1[1] + direction[1]];
	};
	
	Snake.prototype.equal = function (pos1, pos2) {
	  return (pos1[0] === pos2[0] && pos1[1] === pos2[1]);
	};
	
	var Board = function () {
	  this.grid = [];
	  for (var i = 0; i < 25; i++) {
	    this.grid.push(new Array(25));
	  }
	  this.snake1 = new Snake();
	  this.snake2 = new Snake();
	  this.apple = this.setApple();
	};
	Board.prototype.setApple = function () {
	  var taken = true;
	  while (taken) {
	    randomApple = [parseInt(Math.random() * 25),parseInt(Math.random() * 25)];
	    if (this.occupied(randomApple) === false) {
	      taken = false;
	    }
	  }
	  return randomApple;
	};
	
	Board.prototype.occupied = function (pos) {
	  segments = this.snake1.segments.concat(this.snake2.segments);
	  for (var i = 0; i < segments.length; i++) {
	    if (this.snake1.equal(pos, segments[i])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	Board.prototype.checkApple = function () {
	  if (this.snake1.equal(this.snake1.head, this.apple)) {
	    this.snake1.segments.push(this.snake1.lastPosition);
	    this.snake1.score += 10;
	    this.apple = this.setApple();
	  }
	  if (this.snake2.equal(this.snake2.head, this.apple)) {
	    this.snake2.segments.push(this.snake2.lastPosition);
	    this.snake2.score += 10;
	    this.apple = this.setApple();
	  }
	};
	
	Board.prototype.checkSnake = function () {
	  var segments = this.snake1.segments.concat(this.snake2.segments);
	  var head1 = this.snake1.head;
	  var head2 = this.snake2.head;
	  var collide = true;
	  for (var i = 0; i < segments.length; i++) {
	    for (var j = i + 1; j < segments.length; j++) {
	      if (segments[i][0] === segments[j][0] && segments[i][1] === segments[j][1]) {
	        collide = false;
	      }
	    }
	  }
	  var bounds = (head1[0] >= 0 && head1[0] < 25 && head1[1] >= 0 && head1[1] < 25 && head2[0] >= 0 && head2[0] < 25 && head2[1] >= 0 && head2[1] < 25);
	  return collide && bounds;
	};
	
	
	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(1);
	
	var View = function (board, $el) {
	  this.board = board;
	  this.$el = $el;
	};
	
	View.prototype.play = function () {
	  var callback = function () {
	    this.bindEvents();
	
	    if (this.board.checkSnake()) {
	      this.board.snake1.move();
	      this.board.snake2.move();
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
	  snake2 = this.board.snake2;
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
	
	      key('a', function () {
	        snake2.turn("W");
	      });
	          key('d', function () {
	            snake2.turn("E");
	
	          });
	          key('w', function () {
	            snake2.turn("N");
	
	          });
	          key('s', function () {
	
	            snake2.turn("S");
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
	  var snake2 = board.snake2;
	  var positions1 = snake1.segments;
	  var positions2 = snake2.segments;
	  $('.score1').html(snake1.score);
	  $('.score2').html(snake2.score);
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
	    for(var j=0; j < positions2.length; j++) {
	      if (snake1.equal(pos,positions2[j])) {
	        $(el).addClass('has-snake2').removeClass('open');
	      }
	      else if (snake1.equal(pos, board.apple)) {
	        $(el).addClass('apple').removeClass('open');
	      }
	    }
	  });
	};
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map