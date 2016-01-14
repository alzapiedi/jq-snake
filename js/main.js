
(function() {
  window.Snake = window.Snake || {};
  var SnakeBoard = window.Snake.SnakeBoard = require("./snake.js");
  var SnakeView = window.Snake.SnakeView = require("./snake-view.js");
  var board = new SnakeBoard();
  var rootEl = $('.snake');
  var view = new SnakeView(board, rootEl);

  view.setupGrid();
  view.play();
})();
