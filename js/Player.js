function Player(){
    Enemy.apply( this, arguments );
    this.movementDirection = { x: 0, y: 0 };
};

Player.prototype = Object.create( Enemy.prototype );

Enemy.prototype.canInhabbit = function ( type ){
    return type in [ 0, 1 ];
};

Player.prototype.sprite = 'images/char-boy.png';
Player.prototype.constructor = Player;

Player.prototype.resetDirection = function resetDirection(){
    this.movementDirection.x = 0;
    this.movementDirection.y = 0;
};

Player.prototype.update = function(dt) {
    if ( !this.movementDirection )
        return;

    world.move ( this, this.movementDirection );
    this.resetDirection();
};

var directions = {
    left :  { x: -1  , y: 0 } ,
    up :    { x: 0 , y: -1  } ,
    right : { x: 1  , y: 0  } ,
    down :  { x: 0  , y: 1  }
};

Player.prototype.handleInput = function handleInput( direction ) {
    console.log( 'moving ' + direction );

    if ( direction in directions )
        this.movementDirection = _.extend({}, directions[ direction ]);
};

Player.prototype.die = function(){
    alert( 'You\'ve just been bugged' );
}

var player = new Player( 6 );
world.addItem( 2, 6, player );

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

