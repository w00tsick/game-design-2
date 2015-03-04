define(['app/config', 
        'app/environment',
        'app/HUD',
        'app/player', 
        'app/action', 
        'app/controls'], 
function(config, environment, HUD, player, action, controls) {
    "use strict"

    var create = function(game) {
        environment.build(game);
        HUD.build(game);
        player.build(game);
        action.init(game);
        controls.bind(game, action, environment, player);
    };

    return create;

});
