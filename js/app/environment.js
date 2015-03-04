define(['app/config', 'app/platform'],
function(config, platform) {

    "use strict";

    var Environment = function() {}


    Environment.prototype.build = function(game)
    {
        game.physics.startSystem(Phaser.Physics.ARCADE)

        this.game = game;
        this.backdrop = game.add.tileSprite(-3000, 0, 5000, config.game.height,
            'background');
        this.worldMoving = true;

        platform.init(game);

        platform.create(
            { x: 0,
              y: config.game.height - 150 },
            { height: 150,
              width: config.game.width },
            'ground', true, true);

        platform.create(
            { x: config.game.width - 200,
              y: 0 },
            { height: config.game.height,
              width: config.game.width},
            'ground');

        platform.create(
            { x: config.platform.bare.x,
              y: config.platform.bare.y },
            { height: config.platform.bare.height,
              width: config.platform.bare.width},
            'ground');

        platform.create(
            { x: config.platform.bare.x - 600,
              y: config.platform.bare.y - 50},
            { height: config.platform.bare.height,
              width: config.platform.bare.width},
            'ground');

        platform.create(
            { x: config.platform.bare.x - 1300,
              y: config.platform.bare.y + 50},
            { height: config.platform.bare.height,
              width: config.platform.bare.width},
            'ground');

    }

    Environment.prototype.getPlatform = function()
    {
        return platform;
    }

    Environment.prototype.move = function(direction, platforms)
    {
        this.backdrop.x -= (direction / (direction - (direction / 2)))
                         * (direction / Math.abs(direction))
        platforms.move(direction);
    }

    Environment.prototype.stopWorld = function()
    {
        this.worldMoving = false;
    }

    return new Environment();

});
