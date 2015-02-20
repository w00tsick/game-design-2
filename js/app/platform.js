define(['app/config'],
function(config) {

    "use strict";

    /**
     * Constructor
     */
    var Platform = function()
    {
        this.platforms = [];
    }

    /**
     * Initializes the Platform class.  Builds the platform group.
     *
     * @param game Phaser
     */
    Platform.prototype.init = function(game)
    {
        // TODO move to config
        this.game = game;
        this.moveDistance = config.movement.speed * 5;
        this.moveSpeed = config.movement.speed;

        game.platforms = game.add.group();
        game.platforms.enableBody = true;
    }

    /**
     * Creates a platform.
     *
     * @param coord JS Object {x,y}
     * @param size JS Object {width,height}
     * @param imageKey string
     * @param immovable bool (optional)
     */
    Platform.prototype.create = function(coord, size, imageKey, immovable,
        isGround)
    {
        immovable = immovable || false;
        isGround = isGround || false;

        var platform = this.game.platforms.create(coord.x, coord.y, imageKey);
        platform.height = size.height;
        platform.width = size.width;
        platform.body.immovable = immovable;

        platform.is = {
            ground: isGround
        }

        this.platforms.push(platform);
    }

    /**
     * Returns a platform we have already built.
     *
     * @param index int
     */
    Platform.prototype.getByIndex = function(index)
    {
        return this.platforms[index];
    }

    /**
     * Return all platforms
     */
    Platform.prototype.getAll = function()
    {
        return this.platforms;
    }

    /**
     * Move all the platforms that are movable.
     *
     * @param distance int
     * @param speed int
     */
    Platform.prototype.move = function(distance, speed)
    {
        var distance = distance || this.moveDistance;
        var speed = speed || this.moveSpeed;
        var game = this.game;

        this.platforms.map(function(platform) {
            if (!platform.is.ground)
            {
                game.add.tween(platform)
                    .to({x: platform.x - distance}, speed)
                    .start();
            }
        });
    }

    /**
     * Return new Platform class.
     */
    return new Platform();

});
