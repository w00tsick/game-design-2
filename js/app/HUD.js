define(['app/config'],
function(config) {

    "use strict";
    var healthbar;
    var button;
    var mask;
    var HUD = function() {}

    HUD.prototype.build = function(game)
    {
        this.game = game;
        //gradient health bar sprite
        healthbar = game.add.sprite(-2800, 0, 'health');
        game.add.tween(healthbar).to({x: '+1000'}, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false);
        //add mask to sprite such that only the area we want seen is
        mask = game.add.graphics(0, 0);
        //  Shapes drawn to the Graphics object must be filled.
        mask.beginFill(0xffffff);
        //  Here we'll draw a Rectangle
        mask.drawRect(200, 0 ,1000, 20);
        // And apply it to the Sprite
        healthbar.mask = mask;
        //Rectangle(x,y,width,height)    
        var text = "health: ";
        var style = { font: "20px Arial", fill: "#ff0000"};
        var t = game.add.text(100, 0, text, style);
    }

    HUD.prototype.hurt = function(damage)
    {
        // TODO put damage instead '-40'
        this.game.add.tween(healthbar).to({x: '-40'}, 100, Phaser.Easing.Bounce.Out, true, 0, 0, false);
    }
    return new HUD();

});
