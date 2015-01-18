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
        'Stone Block.png',
        'Water Block.png',
        'Grass Block.png',

        'Key.png',

        'Gem Blue.png',
        'Gem Green.png',
        'Gem Orange.png',

        'Tree Short.png',
        'Tree Tall.png',
        'Tree Ugly.png',
        'Rock.png',

        'Enemy Bug.png',
        'Character Boy.png'

    ]);
    Resources.onReady(init);

})(this);
