var textures = {
    '0'  : 'images/stone-block.png',
    '1'  : 'images/grass-block.png',
    '2'  : 'images/water-block.png'
};

function Cell (x, y, type){
    this.type = type;
    this.x = x;
    this.y = y;
    this.texture = textures[ type ];
    this.entities = [];
}

Cell.prototype.contains = function cell_contains ( Type ){
    return !!this.entities.find( function( e ){
        return e instanceof Type;
    } );
};


