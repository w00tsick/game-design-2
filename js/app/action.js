define(['app/config'],
function(config) {

    "use strict";

    var Action = function() {}

    Action.direction = null;
    Action.moving = false;

    Action.prototype.init = function(game)
    {
        this.game = game;
    }

    /**
     * Makes the player go left.
     */
    Action.prototype.goLeft = function(deps)
    {
        Action.direction = 'left';
        deps.player.moveLeft();
        deps.environment.move(config.movement.speed * -1, deps.platforms);
    }

    /**
     * Makes the player go right.
     */
    Action.prototype.goRight = function(deps)
    {
        Action.direction = 'right';
        deps.player.moveRight();
        deps.environment.move(config.movement.speed, deps.platforms);
    }

    Action.prototype.jump = function(deps)
    {
        deps.player.jump(Action.direction);
    }

    Action.prototype.stop = function(deps)
    {
        if (!Action.moving)
        {
            deps.player.rest(Action.direction);
        }
    }

    Action.prototype.shoot = function(deps)
    {
        deps.player.shoot();
    }

    return new Action();

});
