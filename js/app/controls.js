define(['app/config'],
function(config) {

    "use strict";

    var Controls = function()
    {
    }

    Controls.prototype.bind = function(game, player)
    {
        this.player = player;
        game.keys = {};
        game.keys.e = game.input.keyboard.addKey(Phaser.Keyboard.E);
        game.keys.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        game.keys.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        game.keys.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    Controls.prototype.check = function(game)
    {

        game.keys.space.onDown.add(function () {
            if (game.player.body.velocity.y == 0) {
                game.player.body.velocity.y = -500;
            }
        }, game.player);

        if (game.input.activePointer.isDown) {
            if (game.input.mousePointer.x >= game.player.x) {
                game.player.play('run-right');
                game.currentDirection = 'right';
            } else if (game.input.mousePointer.x <= game.player.x) {
                game.player.play('run-left');
                game.currentDirection = 'left';
            }
            this.player.shoot(game);
        }

        if (game.player.body.velocity.y == 0) {
            if (game.keys.e.isDown || game.keys.w.isDown) {
                this.player.moveRight(game);
                game.tile.x -= 5;
            } else if (game.keys.a.isDown) {
                this.player.moveLeft(game);
                game.tile.x += 5;
            } else {
                this.player.dontMove(game);
            }
        } else {
            this.player.moveUp(game);
        }
    }

    return new Controls();

});
