define(['app/config'],
function(config) {
    "use strict"

    var youwin = function(game) {
        this.game = game;
    };

    youwin.prototype = {
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
            var style = { font: "65px Arial", fill: "#ffffff", align: "center", cursor: "pointer"};
            var t = this.game.add.text(this.game.world.centerX - 170, this.game.world.centerY + 100, text, style);
 
        },
        update: function() {
        }
    }

    return youwin;

});
