define(['app/config', 
        'app/environment',
        'app/HUD',
        'app/player', 
        'app/mobFactory',
        'app/action', 
        'app/controls'], 
<<<<<<< HEAD
function(config, environment, HUD, player, mob, action, controls) {
=======
function(config, environment, player, mobFactory, action, controls) {
>>>>>>> d968201b6c814483970fe2be0ff38a78be0e2d51

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
