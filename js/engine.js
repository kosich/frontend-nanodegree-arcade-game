var Engine = (function(global) {
    var win = global.window,
        lastTime,
        world,
        rendering = true;

    function frame() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        renderEngine.render();

        lastTime = now;

        if ( rendering )
            win.requestAnimationFrame(frame);
    };

    function init() {
        reset();
        frame();
        world.player.onDeath( init );
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {
        world.step( dt );
    }

    function reset() {
        lastTime = Date.now();
        world = global.world = new global.World( Map );
        renderEngine.init(  );
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

})(this);
