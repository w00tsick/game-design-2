define([], function() {

    "use strict"

    var preload = function(game) {

        game.load.image('ground', 'assets/images/ground-temp.jpg');
        game.load.image('background', 'assets/images/sky.gif');
        game.load.spritesheet('player', 'assets/images/player-sprite-temp.png', 40, 40);
        game.load.spritesheet('mob', 'assets/images/player-badguy-temp.png', 40, 40);
        game.load.image('bullet', 'assets/images/bullet-temp.jpg');
        game.load.image('button1', 'assets/images/hotkey1.png');
        game.load.image('button2', 'assets/images/Hotkey2.png');
        game.load.image('button3', 'assets/images/Hotkey3.png');
    };
    return preload;
});
