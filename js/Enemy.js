// Enemies our player must avoid
function Enemy ( speed ) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = speed;
    this.resetPower();
};

_.extend( Enemy.prototype, {
    canInhabbit : function ( type ){
        return type === 0;
    },
    resetPower : function(){
        this.power = 1 / this.speed;
    },
    sprite : 'Enemy Bug.png',
    update : function(dt) {
        this.power -= dt;
        if ( this.power < 0 ){
            world.move ( this, { x : 1, y : 0 });
            this.resetPower();
        }
    }
} );
