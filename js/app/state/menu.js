define(['app/config'],
function(config) {
    "use strict"

    var menu = function(game) {
        this.game = game;
    };

    menu.prototype = {
        preload: function() {
            this.game.load.image('logo', 'assets/images/logo_crop_500.png');
            this.game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');
        },
        create: function() {
            this.game.add.sprite(config.game.width / 2 - 500 / 2,
                config.game.height / 2 - 350, 'logo');
            var background = this.game.add.sprite(0, 0);
            background.width = config.game.width;
            background.height = config.game.height;

            this.filter = this.game.add.filter('Fire', config.game.width, config.game.height);
            this.filter.alpha = 0.0;

            background.filters = [this.filter];

            var text = "Start Game";
            var style = { font: "65px Arial", fill: "#ffffff", align: "center", cursor: "pointer"};
            var t = this.game.add.text(this.game.world.centerX - 170, this.game.world.centerY + 150, text, style);
            t.inputEnabled = true;
            t.events.onInputUp.add(function() {
                this.game.state.start('game');
            }, this);
        },
        update: function() {
            this.filter.update();
        }
    }

    return menu;

});
