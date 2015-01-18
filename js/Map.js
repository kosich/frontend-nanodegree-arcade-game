var Map = (function(){
    var _ = undefined;
    return {
        cellTypes : [
            // _ = no cell
            // 0 = ground
            // 1 = grass
            // 2 = water
            [ _, 2, 1, 0, 1, 2, _ ],
            [ _, 2, 1, 0, 1, 2, _ ],
            [ 2, 2, 1, 0, 1, 2, 2 ],
            [ 1, 1, 1, 0, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 1, 1, 0, 1, 1, 1 ],
            [ _, _, 1, 0, 1, _, _ ],
            [ 1, 1, 1, 0, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 1, 1, 0, 1, 1, 1 ],
            [ 2, 2, 1, 0, 1, 2, 2 ],
            [ _, 2, 1, 0, 1, 2, _ ],
            [ 2, 2, 1, 0, 1, 2, 2 ],
            [ 1, 1, 1, 0, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0 ]
        ],
        levels : [
            [ 3, 3, 3, 3, 3, 3, 3 ],
            [ 3, 3, 3, 3, 3, 3, 3 ],
            [ 3, 3, 3, 3, 3, 3, 3 ],
            [ 3, 3, 3, 3, 3, 3, 3 ],
            [ 3, 3, 3, 3, 3, 3, 3 ],
            [ 0, 0, 0, 2, 0, 0, 0 ],
            [ 0, 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ]
        ],
        enemySpawnCoordinates : [
            [ 0, 4 ],
            [ 0, 8 ]
        ],
        spawnPoint : [ 3, 0 ]
    };
})();
