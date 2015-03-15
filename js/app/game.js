define([
    'vendor/phaser', 
    'app/config',
    'app/state/menu',
    'app/state/game',
    'app/state/help'],
function(phaser, config, menu, game, help) {

    "use strict";

    var Game = new Phaser.Game(
        config.game.width, 
        config.game.height, 
        Phaser.AUTO, 
        'game',
        true);

    Game.currentLevel = 0;
    Game.state.add("menu", menu);
    Game.state.add("game", game);
    Game.state.add("help", help);
    Game.state.start("menu");

    return Game;

});
