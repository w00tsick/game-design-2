define([
    'vendor/phaser', 
    'app/config',
    'app/state/menu',
    'app/state/game'],
function(phaser, config, menu, game) {

    "use strict";

    var Game = new Phaser.Game(
        config.game.width, 
        config.game.height, 
        Phaser.AUTO, 
        'game',
        true);

    Game.state.add("menu", menu);
    Game.state.add("game", game);
    Game.state.start("menu");

    return Game;

});
