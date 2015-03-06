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
        this.game = game;
        this.moveDistance = config.movement.speed * 5;
        this.moveSpeed = config.movement.speed;

        var platforms = game.add.group();
        platforms.enableBody = true;

        this.platformGroup = platforms;
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
        isGround, moves)
    {
        immovable = immovable || true;
        isGround = isGround || false;
        moves = moves || false;

        var platform = this.platformGroup.create(coord.x, coord.y, imageKey);
        platform.height = size.height;
        platform.width = size.width;
        platform.body.immovable = immovable;
        platform.body.moves = moves;
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
    /*
     Check if the platform is being hited by ray
     of vision from player
     */
    Platform.prototype.getIntersection = function(ray)
    {
        var status = false;
        this.platformGroup.forEach(function(plat) {
            // Creating lines for ray intersection
            var lines = [
                new Phaser.Line(plat.x, plat.y, plat.x + plat.width, plat.y),
                new Phaser.Line(plat.x, plat.y, plat.x, plat.y + plat.height),
                new Phaser.Line(plat.x + plat.width, plat.y, plat.x + plat.width, plat.y + plat.height),
                new Phaser.Line(plat.x, plat.y + plat.height, plat.x + plat.width, plat.y + plat.height)
            ];

            lines.forEach(function(line) {
                //game.debug.geom(line);
                //game.debug.geom(ray);
                var intersect = Phaser.Line.intersects(ray, line);
                if(intersect){
                    status = true;
                    return;
                }
            });
            if(status)
                return;
        });
        return status;
    }

    /**
     * Return new Platform class.
     */
    return new Platform();

});
