define(['app/config', 
        'app/environment',
        'app/HUD',
        'app/player', 
        'app/mobFactory',
        'app/action', 
        'app/controls'], 

function(config, environment, HUD, player, mobFactory, action, controls) {
    "use strict"

    var create = function(game) {
        environment.build(game);
        HUD.build(game);
        player.build(game);
        action.init(game);
        var mobs = mobFactory.build(game, 2);
        controls.bind(game, action, environment, player, mobs);
    };

    return create;

});
