define(['app/config', 
        'app/controls', 
        'app/player',
        'app/platform'], 
function(config, controls, player, platform) {

    "use strict"

    var update = function(game) {
        var playerObject = player.player
        game.physics.arcade.collide(playerObject, platform.platformGroup);
        controls.check(game);
    };

    return update;

});
