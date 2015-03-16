define([
    'vendor/phaser', 
    'app/config',
    'app/state/menu',
    'app/state/gameover',
    'app/state/youwin',
    'app/state/game',
    'app/state/help'],
function(phaser, config, menu, gameover, youwin, game, help) {

    "use strict";

    var Game = new Phaser.Game(
        config.game.width, 
        config.game.height, 
        Phaser.AUTO, 
        'game',
        true);

    Game.totalscore = 0;
    Game.currentLevel = 0;
    Game.state.add("menu", menu);
    Game.state.add("game", game);
    Game.state.add("game-over", gameover);
    Game.state.add("you-win", youwin);
    Game.state.add("help", help);
    Game.state.start("menu");

    return Game;

});
