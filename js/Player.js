function Player(){
    Enemy.apply( this, arguments );
    this.movementDirection = { x: 0, y: 0 };
};
Player.prototype = Object.create( Enemy.prototype );
_.extend( Player.prototype, {
    constructor : Player,
    canInhabbit : function canInhabbit( type ){
        return type in [ 0, 1 ];
    },
    sprite : 'images/char-boy.png',
    resetDirection : function resetDirection(){
        this.movementDirection.x = 0;
        this.movementDirection.y = 0;
    },
    update : function update(dt) {
        if ( !this.movementDirection )
            return;

        world.move ( this, this.movementDirection );
        this.resetDirection();
    },
    handleInput : function handleInput( direction ) {
        if ( direction in directions )
            this.movementDirection = _.extend({}, directions[ direction ]);
    },
    die : function die(){
        console.warn( 'You\'ve just been bugged' );
    }
});

var directions = {
    left :  { x: -1  , y: 0 } ,
    up :    { x: 0 , y: -1  } ,
    right : { x: 1  , y: 0  } ,
    down :  { x: 0  , y: 1  }
};

var player = new Player( 6 );
world.addItem( 3, 0, player );

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        72: 'left',
        38: 'up',
        75: 'up',
        39: 'right',
        76: 'right',
        40: 'down',
        74: 'down'
    };

    if ( e.keyCode in allowedKeys )
        player.handleInput(allowedKeys[e.keyCode]);
    else 
        console.log( e, e.keyCode );
});

