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
