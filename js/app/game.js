define([
    'vendor/phaser', 
    'app/config',
    'app/state/preload', 
    'app/state/update', 
    'app/state/create'],
function(phaser, config, preload, update, create) {

    "use strict";

    var Game = new Phaser.Game(
        config.game.width, 
        config.game.height, 
        Phaser.AUTO, 
        'game',
        {
            preload: preload,
            update: update,
            create: create
        },
        true);
    return Game;

});
