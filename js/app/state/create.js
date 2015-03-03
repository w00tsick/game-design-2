define(['app/config', 
        'app/environment', 
        'app/player', 
        'app/mobFactory',
        'app/action', 
        'app/controls'], 
function(config, environment, player, mobFactory, action, controls) {

    "use strict"

    var create = function(game) {
        environment.build(game);
        player.build(game);
        action.init(game);
        var mobs = mobFactory.build(game, 2);
        controls.bind(game, action, environment, player, mobs);
    };

    return create;

});
