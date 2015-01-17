(function( global ){
    var cellTypes = [
        // 0 = ground
        // 1 = grass
        // 2 = water
        [ 2, 2, 2, 2, 2 ],
        [ 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0 ],
        [ 1, 1, 1, 1, 1 ],
        [ 1, 1, 1, 1, 1 ]
    ];

    var textures = {
        '0'  : 'images/stone-block.png',
        '1'  : 'images/grass-block.png',
        '2'  : 'images/water-block.png'
    };

    function Cell (type){
        this.type = type;
        this.texture = textures[ type ];
    }

    var world = global.world = {};
    var field = world.field = cellTypes.map( function( row ){
        return row.map( function( f ){
            return new Cell( f );
        } );
    } );
    field.height = field.length;
    field.width = field[0].length;

    world.move = function move ( object, direction ){
        var n = { x: object.x + direction.x, y : object.y + direction.y },
            inBox = true;

        var isEnemy = object != player;

        if ( n.y >= field.height || n.x >= field.width || n.x < 0 || n.y < 0 ){
            inBox = false;
        }

        if ( !inBox ){
            // remove enemy from the entities
            if ( isEnemy )
                destroy(object); 

            return;
        }

        if( !object.canInhabbit( field[ n.y ][ n.x ].type ) )
            return;

        object.x = n.x;
        object.y = n.y;
    };

function destroy ( entity ){
    enemies.splice( enemies.indexOf( entity ), 1 );
}


var enemies = world.enemies = [];

world.step = function step ( dt ){
    // spawn AIs
    if ( enemies.length < 3 && Math.random() < .1 ){
        enemies.push(new Enemy( [ 0, Math.floor(Math.random() * 3 + 1)], Math.max( Math.random() * 3 ) ) );
    }

    // move AIs
    enemies.forEach(function(enemy) {
        enemy.update(dt);
    });
}

})( this );
