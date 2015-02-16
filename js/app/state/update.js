define(['app/config', 'app/controls'], function(config, controls) {

    "use strict"

    var update = function(game) {
        game.physics.arcade.collide(game.player, game.platforms);
        controls.check(game);
    };

    return update;

});
