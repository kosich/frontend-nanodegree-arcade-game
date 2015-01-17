
(function( global ){
    var map = (function(){
        var _ = undefined;
        return {
            cellTypes : [
                // 0 = ground
                // 1 = grass
                // 2 = water
                [ 2, 2, 1, 0, 1, 2, 2 ],
                [ 2, 2, 1, 0, 1, 2, 2 ],
                [ 2, 2, 1, 0, 1, 2, 2 ],
                [ 1, 1, 1, 0, 1, 1, 1 ],
                [ 0, 0, 0, 0, 0, 0, 0 ],
                [ _, _, _, 0, _, _, _ ],
                [ 0, 0, 0, 0, 0, 0, 0 ],
                [ 1, 1, 1, 0, 1, 1, 1 ],
                [ _, 2, 1, 0, 1, 2, _ ],
                [ _, 2, 1, 0, 1, 2, _ ],
                [ 1, 1, 1, 0, 1, 1, 1 ],
                [ 0, 0, 0, 0, 0, 0, 0 ]
            ],
            spawnCoordinates : [
                [ 0, 4 ],
                [ 0, 6 ]
            ],
            spawnPoint : [ 3, 0 ]
        }
    })();

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

    var world = global.world = {};
    var field = world.field = map.cellTypes.map( function( row, y ){
        return row.map( function( f, x ){
            if ( f === undefined )
                return undefined;
            else
                return new Cell( x, y, f );
        } );
    } );

    field.height = field.length;
    field.width = field[0].length;

    world.move = function move ( object, direction ){
        var n = { x: object.cell.x + direction.x, y : object.cell.y + direction.y },
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

        var tCell = field[n.y][n.x];
        if ( !tCell )
            return;

        if( !object.canInhabbit( tCell.type ) )
            return;

        putToCell( object.cell, tCell, object );
    };

    world.addItem = function addItem ( x, y, item ){
        var cell = field[y][x];
        if (!cell)
            throw 'helo';

        putToCell( undefined, cell, item );
    }

    function putToCell( from, to, item ){
        if ( from ){
            from.entities.splice( from.entities.indexOf( item ), 1 );
        }

        if ( to ){
            to.entities.push( item );
        }

        item.cell = to;
    }


    function destroy ( entity ){
        enemies.splice( enemies.indexOf( entity ), 1 );
        putToCell(entity.cell, undefined, entity);
    }


    var enemies = world.enemies = [];

    world.step = function step ( dt ){
        // spawn AIs
        if ( enemies.length < 3 && Math.random() < .1 ){

            var spc = Math.floor(Math.random() * map.spawnCoordinates.length);
            if (spc == map.spawnCoordinates.length)
                spc = map.spawnCoordinates.length -1;

            var c = map.spawnCoordinates[ spc ];

            var cell = field[ c[1] ][ c[0] ];

            if ( !cell.entities.find( function( e ){
                return e instanceof Enemy;
            } ) ){
                var enemy = new Enemy( Math.max( Math.random() * 3 ) );
                putToCell( undefined, cell, enemy );
                enemies.push( enemy );
            }
        }

        // move AIs
        enemies.forEach(function(enemy) {
            enemy.update(dt);
        });
    }

})( this );
