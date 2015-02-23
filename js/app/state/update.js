define(['app/config', 
        'app/controls', 
        'app/player',
        'app/mob',
        'app/platform'], 
function(config, controls, player, mob, platform) {

    "use strict"

    var update = function(game) {
        var playerObject = player.player;
        var mobObject = mob.mob; 
        game.physics.arcade.collide(playerObject, platform.platformGroup);
        game.physics.arcade.collide(mobObject, platform.platformGroup);
        controls.check(game);
    };

    return update;

});
