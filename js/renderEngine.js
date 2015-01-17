(function( global ){

    var RENDER_CELL_H = Math.min( global.world.field.height, 7 ),
        RENDER_CELL_W = Math.min( global.world.field.width, 7 ),
        RENDER_CELL_H_PADDING = Math.floor((RENDER_CELL_H - 1)/2);

    var world = global.world,
        field = global.field,
   allEnemies = world.enemies,
        cellW = 101,
        cellH = 83,
        width = RENDER_CELL_W * cellW,
        height = RENDER_CELL_H * cellH;

    var doc = global.document,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');

    var re = {};

    re.init = function re_init(  ){
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

        var cRow = midRow = player.cell.y,
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

        console.log('current at ', cRow, ' rendering from ', minRow, ' to ', maxRow); 

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = minRow; row < maxRow; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(field[row][col].texture), col * cellW, ( row - minRow )  * cellH);
            }
        }

        for (row = minRow; row < maxRow; row++) {
            for (col = 0; col < numCols; col++) {
                renderEntities( col, ( row - minRow ), field[row][col].entities );
            }
        }


    }

    function renderEntities( x, y, items ) {
        items.forEach( function( item ){
            ctx.drawImage(Resources.get(item.sprite), x * cellW, y * cellH - cellH/2);
        } );
    }

    global.renderEngine = re;

}( this ));
