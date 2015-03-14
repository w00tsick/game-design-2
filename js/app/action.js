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

    Action.prototype.go = function()
    {
        Action.moving = true;
    }

    Action.prototype.stopped = function()
    {
        Action.moving = false;
    }

    /**
     * Makes the player go left.
     */
    Action.prototype.goLeft = function(deps)
    {
	Action.direction = 'left';
        deps.player.playMoveLeft();
        if (deps.environment.worldMoving)
        {		
	    deps.environment.move(config.movement.speed * -1, deps.platforms);
        }
        else
        {
	    deps.player.moveLeft();
        }
    }

    /**
     * Makes the player go right.
     */
    Action.prototype.goRight = function(deps)
    {
	Action.direction = 'right';
        deps.player.playMoveRight();
	if (deps.environment.worldMoving)
        {
	    deps.environment.move(config.movement.speed, deps.platforms);
        }
        else
        {
	    deps.player.moveRight();
        }
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
