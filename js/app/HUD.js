define(['app/config', 'app/player'],
function(config, platform) {

    "use strict";

    var HUD = function() {}
    


    
    HUD.prototype.build = function(game)
    {
        this.game = game;
        this.healthbar = game.add.graphics(0,0);
        //this.group.add(this.healthbar); // this.group being a pre-initialised group for this entity...

        this.hp = 20;
        this.totalhp = 20;
        this._lasthp = 0;

        if (this._lasthp !== this.hp) {
            this.healthbar.clear();
            var x = (this.hp / this.totalhp) * 100;
            var colour = "0x" + ((1 << 24) + (((x > 50 ? 1-2*(x-50)/100.0 : 1.0)
                    * 255) << 16) + (((x > 50 ? 1.0 : 2*x/100.0) * 255) << 8)
                    + 0).toString(16).slice(1);
    
            this.healthbar.beginFill(colour);
            this.healthbar.lineStyle(5, colour, 1);
            this.healthbar.moveTo(0,-5);
            this.healthbar.lineTo(config.tileSize * this.hp / this.totalhp, -5);
            this.healthbar.endFill();
        }

        this._lasthp = this.hp;
    }
    
    return new HUD();

});
