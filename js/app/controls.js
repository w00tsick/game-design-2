define(['app/config'],
function(config) {

    "use strict";

    var Controls = function() {}

    Controls.prototype.bind = function(game, action, environment, player)
    {
        this.game = game;
        this.action = action;

        this.keyBindings = [
            bindKeyDependencies(action.stop),
            this.bindKey([Phaser.Keyboard.A],
                bindKeyDependencies(action.goLeft)),
            this.bindKey([
                    //interferred with hotkeys
                    //Phaser.Keyboard.E, 
                    Phaser.Keyboard.D],
                bindKeyDependencies(action.goRight)),
            this.bindKey([
                    Phaser.Keyboard.SPACEBAR, 
                    188, // binding for '<' key
                    Phaser.Keyboard.W],
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
                var actionObject = this.action;
                key.onDown.add(function() { actionObject.go(); });
                key.onUp.add(function() { actionObject.stopped(key); });
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
