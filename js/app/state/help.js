define(['app/config'],
function(config) {
    "use strict"

    var help = function(game) {
        this.game = game;
    };

    help.prototype = {
        preload: function() {
            this.game.load.image('controls', 'assets/images/controls.jpg');
            this.game.load.image('back', 'assets/images/back.png');
        },
        create: function() {
            this.game.stage.backgroundColor = '#ffffff';
            
            this.game.add.sprite(config.game.width / 2 - 500 / 2,
                config.game.height / 2 - 350, 'controls');
                
            var back = this.game.add.sprite(0, 0, 'back');
            back.inputEnabled = true;
            back.scale.setTo(.25,.25);
            
            back.events.onInputDown.add(function(){
                this.game.stage.backgroundColor = '#000000';
                this.game.state.start('menu')
            },this);
        },
        
        update: function() {

        }
    }

    return help;

});
