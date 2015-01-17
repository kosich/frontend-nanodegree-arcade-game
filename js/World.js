(function( global ){
    'use strict';

    var World = global.World = function World ( map ){
        this.map = map;
        var field = this.field = map.cellTypes.map( function( row, y ){
            return row.map( function( f, x ){
                if ( f === undefined )
                    return undefined;
                else
                    return new Cell( x, y, f );
            } );
        } );

        field.height = field.length;
        field.width = field[0].length;

        this.enemies = [];
        this.player = new Player( );
        this.addItem( map.spawnPoint[0], map.spawnPoint[1], this.player );

    };

    _.extend( World.prototype, {
        move : function move ( object, direction ){
            var n = { x: object.cell.x + direction.x, y : object.cell.y + direction.y },
            inBox = true;

            var isEnemy = object != this.player;

            if ( n.y >= this.field.height || n.x >= this.field.width || n.x < 0 || n.y < 0 ){
                inBox = false;
            }

            if ( !inBox ){
                // remove enemy from the entities
                if ( isEnemy )
                    this.destroy(object); 

                return;
            }

            var tCell = this.field[n.y][n.x];
            if ( !tCell )
                return;

            if( !object.canInhabbit( tCell.type ) )
                return;

            putToCell( object.cell, tCell, object );
        },
        addItem : function addItem ( x, y, item ){
            var cell = this.field[y][x];
            if (!cell)
                throw 'helo';

            putToCell( undefined, cell, item );
        },
        step : function step ( dt ){
            // spawn AIs
            var map = this.map,
                self = this;
            if ( this.enemies.length < 3 && Math.random() < .1 ){

                var spc = Math.floor(Math.random() * map.enemySpawnCoordinates.length);
                if (spc == map.enemySpawnCoordinates.length)
                    spc = map.enemySpawnCoordinates.length -1;

                var c = map.enemySpawnCoordinates[ spc ];

                var cell = this.field[ c[1] ][ c[0] ];

                if ( !cell.entities.find( function( e ){
                    return e instanceof Enemy;
                } ) ){
                    var enemy = new Enemy( Math.random() * 3 + 1 );
                    putToCell( undefined, cell, enemy );
                    this.enemies.push( enemy );
                }
            }

            // move AIs
            this.enemies.forEach(function(enemy) {
                enemy.update(dt);
            });
            this.player.update();

            this.player.cell.entities.forEach( function( e ){
                if ( e === self.player )
                    return;

                if ( e instanceof Enemy)
                    self.player.die();
            } );
        },
        destroy : function destroy ( entity ){
            this.enemies.splice( this.enemies.indexOf( entity ), 1 );
            putToCell(entity.cell, undefined, entity);
        }


    } );

    function putToCell( from, to, item ){
        if ( from ){
            from.entities.splice( from.entities.indexOf( item ), 1 );
        }

        if ( to ){
            to.entities.push( item );
        }

        item.cell = to;
    }


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
            world.player.handleInput(allowedKeys[e.keyCode]);
        else 
            console.log( e, e.keyCode );
    });


})( this );
