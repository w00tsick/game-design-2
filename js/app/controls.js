define(['app/config'],
function(config) {

    "use strict";

    var Controls = function() {}

    Controls.prototype.bind = function(game, action, environment, player)
    {
        this.game = game;

        this.keyBindings = [
            bindKeyDependencies(action.stop),
            this.bindKey([Phaser.Keyboard.A],
                bindKeyDependencies(action.goLeft)),
            this.bindKey([Phaser.Keyboard.E, Phaser.Keyboard.W],
                bindKeyDependencies(action.goRight)),
            this.bindKey([Phaser.Keyboard.SPACEBAR],
                bindKeyDependencies(action.jump))
        ];

        this.mouseBindings = [
            this.bindMouse(this.game.input.activePointer,
                bindMouseDependencies(action.shoot))
        ];

        function bindKeyDependencies(func) {
            return func.bind(null, {
                game: game,
                environment: environment,
                platforms: environment.getPlatform(),
                player: player
            });
        }

        function bindMouseDependencies(func) {
            return func.bind(null, {
                player: player
            });
        }

    }

    Controls.prototype.check = function(game)
    {
        this.keyBindings.forEach(function(binding) {
            binding();
        });

        this.mouseBindings.forEach(function(binding) {
            binding();
        });
    }

    /**
     * Binds a key to an action.
     */
    Controls.prototype.bindKey = function(keys, action)
    {
        var bindings = [];

        keys.forEach(function(key) {
            bindings.push(this.game.input.keyboard.addKey(key));
        }, this);

        return (function() {
            bindings.forEach(function(key) {
                key.onDown.add(function() { action.moving = true; });
                key.onUp.add(function() { action.moving = false; });
                if (key.isDown) { action(); }
            }, this);
        }).bind(this);
    }

    Controls.prototype.bindMouse = function(pointer, action)
    {
        return (function() {
            if (pointer.isDown) {
                action();
            }
        }).bind(this);
    }

    return new Controls();

});
