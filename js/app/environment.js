define(['app/config'],
function(config) {

    "use strict";

    function buildGround(game)
    {
        var groundHeight = 100;
        var ground = game.platforms.create(0, config.game.height - groundHeight, 'ground');
        ground.width = config.game.width;
        ground.height = groundHeight;
        ground.body.immovable = true;
    }

    function buildPlatforms(game)
    {
        game.platforms = game.add.group();
        game.platforms.enableBody = true;
    }

    var Environment = function() {}

    Environment.prototype.build = function(game)
    {
        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.tile = game.add.tileSprite(0, 0, 5000, config.game.height, 'background');
        buildPlatforms(game);
        buildGround(game);
    }

    return new Environment();

});
