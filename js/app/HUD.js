define(['app/config'],
function(config) {

    "use strict";
    var healthbar;
    var mask, CDmask;
    var key1, key2, key3;
    var CD1;
    var CoolDown = 3, CoolDown2 = 4, CoolDown3 = 5;
    var text1, text2, text3;
    var timer1, timer2, timer3;
    var singlePress1 = true, singlePress2 = true, singlePress3 = true;
    
    var HUD = function() {}
    HUD.prototype.build = function(game)
    {
        game.add.sprite(100, (config.game.height - 100), 'button1');
        game.add.sprite(200, (config.game.height - 100), 'button2');
        game.add.sprite(300, (config.game.height - 100), 'button3');
        //The following hotkeys may not need to be in HUD.js
        //I'm simply keeping them here while I work out functionality
        //  Here we create 3 hotkeys, keys Q,E,R and bind them all to their own functions
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        //TODO replace with different weapon functions
        key1.onDown.add(abilityOne, this);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.E);
        //TODO replace with different weapon functions
        key2.onDown.add(abilityTwo, this);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.R);
        //TODO replace with different weapon functions
        key3.onDown.add(finalAbility, this);
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
    
    function abilityOne () {
        if(CoolDown == 3 && singlePress1 == true){
            singlePress1 = false;
            //  Create our Timer
            text1 = this.game.add.text(113, (config.game.height - 100), '', { font: "40px Arial", fill: "#000000", align: "center" });
            text1.setText(CoolDown);
            timer1 = this.game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
            CDmask = this.game.add.graphics(0, 0);
            CDmask.beginFill(0xffffff);
            CDmask.drawRect(100, (config.game.height - 100),50, 50);
            CD1 = this.game.add.graphics(0,0);
            CD1.beginFill(0x000000, .5);
            CD1.drawRect(100, (config.game.height - 100) ,50, 50);
            CD1.mask = CDmask;
            //TODO replace '2000' which represents tween time to cooldown timer in ms
            this.game.add.tween(CD1).to({y: '+50'}, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
        };
    }

    function abilityTwo () {
        if(CoolDown2 == 4 && singlePress2 == true){
            singlePress2 = false;
            text2 = this.game.add.text(213, (config.game.height - 100), '', { font: "40px Arial", fill: "#000000", align: "center" });
            text2.setText(CoolDown2);
            timer2 = this.game.time.events.loop(Phaser.Timer.SECOND, updateCounter2, this);
            CDmask = this.game.add.graphics(0, 0);
            CDmask.beginFill(0xffffff);
            CDmask.drawRect(200, (config.game.height - 100),50, 50);
            CD1 = this.game.add.graphics(0,0);
            CD1.beginFill(0x000000, .5);
            CD1.drawRect(200, (config.game.height - 100) ,50, 50);
            CD1.mask = CDmask;
            //TODO replace '2000' which represents tween time to cooldown timer in ms
            this.game.add.tween(CD1).to({y: '+50'}, 4000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    }

    function finalAbility () {
        if(CoolDown3 == 5 && singlePress3 == true){
            singlePress3 = false;
            text3 = this.game.add.text(313, (config.game.height - 100), '', { font: "40px Arial", fill: "#000000", align: "center" });
            text3.setText(CoolDown3);
            timer3 = this.game.time.events.loop(Phaser.Timer.SECOND, updateCounter3, this);
            CDmask = this.game.add.graphics(0, 0);
            CDmask.beginFill(0xffffff);
            CDmask.drawRect(300, (config.game.height - 100),50, 50);
            CD1 = this.game.add.graphics(0,0);
            CD1.beginFill(0x000000, .5);
            CD1.drawRect(300, (config.game.height - 100) ,50, 50);
            CD1.mask = CDmask;
            //TODO replace '2000' which represents tween time to cooldown timer in ms
            this.game.add.tween(CD1).to({y: '+50'}, 5000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    }
    
    
    function updateCounter() {
        CoolDown--;
        text1.setText(CoolDown);
        if(CoolDown == 0){
            CoolDown = 3;
            this.game.world.remove(text1);
            this.game.time.events.remove(timer1);
            singlePress1 = true;
        }
    }
    
    function updateCounter2() {
        CoolDown2--;
        text2.setText(CoolDown2);
        if(CoolDown2 == 0){
            CoolDown2 = 4;
            this.game.world.remove(text2);
            this.game.time.events.remove(timer2);
            singlePress2 = true;
        }
    }
    
    function updateCounter3() {
        CoolDown3--;
        text3.setText(CoolDown3);
        if(CoolDown3 == 0){
            CoolDown3 = 5;
            this.game.world.remove(text3);
            this.game.time.events.remove(timer3);
            singlePress3 = true;
        }
    }
    
    HUD.prototype.hurt = function(damage)
    {
        // TODO put damage instead '-40'
        this.game.add.tween(healthbar).to({x: '-40'}, 100, Phaser.Easing.Bounce.Out, true, 0, 0, false);
    }
    return new HUD();

});
