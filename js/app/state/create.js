define(['app/config', 'app/environment', 'app/player', 'app/controls'], 
function(config, environment, player, controls) {

    "use strict"

    var create = function(game) {
        environment.build(game);
        player.build(game);
        controls.bind(game, player);
    };

    return create;

});
