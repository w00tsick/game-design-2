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
     * Binds a key to an action.
     */
    Action.prototype.bindKey = function(keys, action)
    {
        var bindings = [];

        keys.forEach(function(key) {
            bindings.push(this.game.input.keyboard.addKey(key));
        }, this);

        return (function() {
            bindings.forEach(function(key) {
                key.onDown.add(function() { Action.moving = true; });
                key.onUp.add(function() { Action.moving = false; });
                if (key.isDown) { action(); }
            }, this);
        }).bind(this);
    }

    /**
     * Makes the player go left.
     */
    Action.prototype.goLeft = function(game, environment, platforms)
    {
        Action.direction = 'left';
        game.player.play('run-left');
        environment.move(config.movement.speed * -1, platforms);
    }

    /**
     * Makes the player go right.
     */
    Action.prototype.goRight = function(game, environment, platforms)
    {
        Action.direction = 'right';
        game.player.play('run-right');
        environment.move(config.movement.speed, platforms);
    }

    Action.prototype.jump = function(game, environment)
    {
        if (game.player.body.velocity.y == 0) {
            game.player.body.velocity.y = -500;
        }

        if (Action.direction == 'right')
        {
            game.player.play('jump-right');
        }
        else if (Action.direction == 'left')
        {
            game.player.play('jump-left');
        }
    }

    Action.prototype.stop = function(game, environment)
    {
        if (!Action.moving)
        {
            if (Action.direction == 'right')
            {
                game.player.play('rest-right');
            }
            else if (Action.direction == 'left')
            {
                game.player.play('rest-left');
            }
        }
    }

    Action.prototype.shoot = function(game, player)
    {
        if (game.input.activePointer.isDown) {
            if (game.input.mousePointer.x >= game.player.x) {
                game.player.play('run-right');
                game.currentDirection = 'right';
            } else if (game.input.mousePointer.x <= game.player.x) {
                game.player.play('run-left');
                game.currentDirection = 'left';
            }

            if (game.time.now > game.nextFire && game.bullets.countDead() > 0)
            {
                game.nextFire = game.time.now + game.fireRate;
                var bullet = game.bullets.getFirstDead();
                bullet.reset(game.player.x, game.player.y);
                game.physics.arcade.moveToPointer(bullet, 1000);
            }
        }
    }

    return new Action();

});
