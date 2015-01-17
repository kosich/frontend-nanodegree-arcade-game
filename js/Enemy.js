// Enemies our player must avoid
function Enemy ( speed ) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = speed;
    this.resetPower();
};

Enemy.prototype.canInhabbit = function ( type ){
    return type === 0;
};

Enemy.prototype.resetPower = function(){
    this.power = 1 / this.speed;
};

Enemy.prototype.sprite = 'images/enemy-bug.png';

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.power -= dt;
    if ( this.power < 0 ){
        world.move ( this, { x : 1, y : 0 });
        this.resetPower();
    }
};

