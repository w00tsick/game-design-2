define(['app/config'],
function(config) {

    "use strict";

    var HUD = function() {}
    HUD.prototype.build = function(game)
    {
        var HP;
        var text = "Health:";
        var style = { font: "20px Arial", fill: "#ff0000"};
        var t = game.add.text(100, 0, text, style);
        HP = new Phaser.Rectangle(200, 0, 1280, 20);
        game.debug.geom(HP,'#00ff00');
    }
    return new HUD();
});
