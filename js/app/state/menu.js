define(['app/config'],
function(config) {
    "use strict"

    var menu = function(game) {
        this.game = game;
    };

    menu.prototype = {
        preload: function() {

        },
        create: function() {

            console.log('test');
            this.game.state.start('game');
        }
    }

    return menu;

});
