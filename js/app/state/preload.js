define([], function() {

    "use strict"

    var preload = function(game) {
        game.load.image('ground', 'assets/images/ground-temp.jpg');
        game.load.image('background', 'assets/images/sky.gif');

        game.load.image('health', 'assets/images/gradient.png');
        game.load.spritesheet('player', 'assets/images/player-sprite-wire.png', 400, 400);
        game.load.spritesheet('mob', 'assets/images/player-badguy-temp.png', 40, 40);
        game.load.image('bullet', 'assets/images/bullet-temp.png');


    };

    return preload;

});
