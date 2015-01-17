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

