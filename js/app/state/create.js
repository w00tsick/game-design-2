define(['app/config', 
        'app/environment',
        'app/HUD',
        'app/player', 
        'app/mob',
        'app/action', 
        'app/controls'], 
function(config, environment, HUD, player, mob, action, controls) {

    "use strict"

    var create = function(game) {
        environment.build(game);
        HUD.build(game);
        player.build(game);
        mob.build(game);
        action.init(game);
        controls.bind(game, action, environment, player, mob);
    };

    return create;

});
