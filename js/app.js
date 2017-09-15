
/*
Frogger Game!

Belal Alsahli
9, Sep, 2017
*/


var speed = null;

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 3) + 1);
};

Enemy.prototype.update = function(dt) {
    this.x = this.x + speed * dt * this.speed; // 100 refers to speed
    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) { // collision detection
        player.lifes--;
        if (player.lifes ===0) {
            player.lifes = 5;
            player.score = 0;
        }
        document.getElementsByClassName('badge')[0].innerHTML = player.lifes;
        player.reset(); // if there is any collision, player should be reseted.
    }
    if (this.x > 500) { // reset enemy after off canves
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    this.x = -100; // start making enemy before canves
    var enmypath = [220, 140, 60]; // to draw the enmy on the path or block
    this.y = enmypath[Math.floor((Math.random() * 3))];
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) { // creating the Player
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.score = 0;
    this.lifes = 5;
};

Player.prototype.handleInput = function(mov) {
    if (mov == 'left') {
        this.x = this.x - 101;
    } else if (mov == 'right') {
        this.x = this.x + 101;
    } else if (mov == 'up') {
        this.y = this.y - 80;
    } else if (mov == 'down') {
        this.y = this.y + 80;
    }

    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y > 400) {
        this.reset();
    } else if (this.y <= -20) {
        player.score++;
        document.getElementsByClassName('badge')[1].innerHTML = player.score;
        this.reset();
    }
};

Player.prototype.reset = function() { // reseting the player to the start postion
    this.x = 200;
    this.y = 380;
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Creating an enemy array and push it in the array
var allEnemies = [];
var enmypath = [220, 140, 60]; // to draw the enmy on the path or block

for (var i = 0; i < 3; i++) {
    var x = Math.floor((Math.random() * -1000) + 1);
    var y = enmypath[Math.floor(Math.random() * 3)];
    var enemy = new Enemy(x, y);
    allEnemies.push(enemy); // push the created enemy to allEnemies array
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// creating an instance of the Player
var player = new Player(200, 380); 