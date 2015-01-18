var textures = {
    '0'  : 'images/stone-block.png',
    '1'  : 'images/grass-block.png',
    '2'  : 'images/water-block.png'
};

function Cell (x, y, settings){
    this.type = settings.type;
    this.level = settings.level;
    this.x = x;
    this.y = y;
    this.texture = textures[ this.type ];
    this.entities = [];
}

Cell.prototype.contains = function cell_contains ( Type ){
    return !!this.entities.find( function( e ){
        return e instanceof Type;
    } );
};


