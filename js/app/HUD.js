define(['app/config'],
function(config) {

    "use strict";

    var HUD = function() {}
    HUD.prototype.build = function(game)
    {
        var mask;
        //gradient health bar sprite
        var sprite = game.add.sprite(-1800, 0, 'health');
        //tween to imitate the color of the health bar to change
        var tween = game.add.tween(sprite);
        tween.to({ x: 200 }, 6000);
        tween.start();
        //add mask to sprite such that only the area we want seen is
        mask = game.add.graphics(0, 0);
        //	Shapes drawn to the Graphics object must be filled.
        mask.beginFill(0xffffff);
        //	Here we'll draw a Rectangle
        mask.drawRect(200, 0 ,1000, 20);
         //	And apply it to the Sprite
        sprite.mask = mask;
        
        var text = "health: ";
        var style = { font: "20px Arial", fill: "#ff0000"};
        var t = game.add.text(100, 0, text, style);
    }
    return new HUD();

});
