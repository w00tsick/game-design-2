define(['app/config'],
function(config) {

    "use strict";

    var Controls = function() {}

    Controls.prototype.bind = function(game, action, environment, player)
    {
        this.keyBindings = [
            wrapper(action.stop),
            action.bindKey([Phaser.Keyboard.A], wrapper(action.goLeft)),
            action.bindKey([Phaser.Keyboard.E, Phaser.Keyboard.W],
                wrapper(action.goRight)),
            action.bindKey([Phaser.Keyboard.SPACEBAR], wrapper(action.jump))
        ];

        this.mouseBindings = [
            mouseWrapper(action.shoot)
        ];

        function wrapper(func) {
            return func.bind(null, game, environment, environment.getPlatform());
        }

        function mouseWrapper(func) {
            return func.bind(null, game, player);
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

    return new Controls();

});
