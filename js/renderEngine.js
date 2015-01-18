(function( global ){
    'use strict';

    var RENDER_CELL_H = 0,
        RENDER_CELL_W = 0,
        RENDER_CELL_H_PADDING = 0,
        LEVEL_HEIGHT = 37; // height of a normal block

    var world,
        field,
   allEnemies,
        cellW = 101,
        cellH = 83,
        width = 0,
       height = 0;

    var doc = global.document,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');

    var re = {};

    re.init = function re_init(  ){
        RENDER_CELL_H = Math.min( global.world.field.height, 11 );
        RENDER_CELL_W = Math.min( global.world.field.width, 12 );
        RENDER_CELL_H_PADDING = Math.floor(RENDER_CELL_H/2);

        world = global.world;
        field = global.field;
        allEnemies = world.enemies;
        width = RENDER_CELL_W * cellW;
        height = RENDER_CELL_H * cellH;
        canvas.width = width;
        canvas.height = height;

        doc.body.appendChild(canvas);
    };

    re.render = function re_render() {

        ctx.clearRect( 0, 0, width, height );
        var field = world.field,
            minRow = 0,
            maxRow = 0,
            midRow = 0,
            numCols = field.width,
            row = 0, col = 0;

        var cRow = midRow = world.player.cell.y,
            dB = field.height  - 1 - cRow,
            dT = cRow;

        if ( dB < RENDER_CELL_H_PADDING  ){
            midRow = field.height - RENDER_CELL_H_PADDING;
        }
        else if ( dT < RENDER_CELL_H_PADDING ){
            midRow = RENDER_CELL_H_PADDING;
        }

        minRow = midRow - RENDER_CELL_H_PADDING;
        maxRow = midRow + RENDER_CELL_H_PADDING;

        //======================================
        var cell;
        for (row = minRow; row < maxRow; row++) {
            for (col = 0; col < numCols; col++) {
                cell = field[row][col];

                if ( cell )
                    ctx.drawImage(Resources.get(cell.texture), col * cellW, ( row - minRow ) * cellH - cell.level * LEVEL_HEIGHT );
            }
        }

        for (row = minRow; row < maxRow; row++) {
            for (col = 0; col < numCols; col++) {
                cell = field[row][col];

                if ( cell )
                    renderEntities( cell, col, ( row - minRow ));
            }
        }


    }

    function renderEntities( cell, x, y ) {
        cell.entities.forEach( function( item ){
            ctx.drawImage(Resources.get(item.sprite), x * cellW, y * cellH - cellH/2 - cell.level * LEVEL_HEIGHT);
        } );
    }

    global.renderEngine = re;

}( this ));
