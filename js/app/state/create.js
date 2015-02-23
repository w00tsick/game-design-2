define(['app/config', 
        'app/environment', 
        'app/player', 
        'app/mob',
        'app/action', 
        'app/controls'], 
function(config, environment, player, mob, action, controls) {

    "use strict"

    var create = function(game) {
        environment.build(game);
        player.build(game);
        mob.build(game);
        action.init(game);
        controls.bind(game, action, environment, player, mob);
    };

    return create;

});
