define(['app/config', 'app/HUD'],
function(config) {
    "use strict"

    var gameover = function(game, HUD) {
        this.game = game;
    };

    gameover.prototype = {
        preload: function() {
            this.game.load.image('logo', 'assets/images/logo_crop_500.png');
        },
        create: function() {
            this.game.add.sprite(config.game.width / 2 - 500 / 2,
                config.game.height / 2 - 350, 'logo');
            var background = this.game.add.sprite(0, 0);
            background.width = config.game.width;
            background.height = config.game.height;

            var text = "Game Over";
            var text2 = "Try Again?";
            var style = { font: "65px Arial", fill: "#ffffff", align: "center", cursor: "pointer"};
            var t = this.game.add.text(this.game.world.centerX - 170, this.game.world.centerY + 100, text, style);
            var t2 = this.game.add.text(this.game.world.centerX - 160, this.game.world.centerY + 200, text2, style);
            this.game.add.tween(t2).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
            t2.inputEnabled = true;
            t2.events.onInputUp.add(function() {
                this.game.state.start('game');
            }, this);
 
        },
        update: function() {
        }
    }

    return gameover;

});
