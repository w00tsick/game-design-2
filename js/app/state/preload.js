define([], function() {

    "use strict"

    var preload = function(game) {

        game.load.image('ground', 'assets/images/ground-temp.jpg');
        game.load.image('background', 'assets/images/sky.gif');
        game.load.spritesheet('player', 'assets/images/player-sprite-temp.png', 40, 40);
        game.load.image('bullet', 'assets/images/bullet-temp.jpg');

    };

    return preload;

});
