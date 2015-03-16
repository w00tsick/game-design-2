define(['app/config', 'app/environment','app/player', 'app/platform',
    'app/action'],
function(config, environment, player, platform, action) {

    "use strict";
    var healthbar, healthbar2, battery, energybar;
    var mask, CDmask, maskenergy, minimask;
    var key1, key2, key3;
    var CD1, total = 0, score = 0, totalenergy = 100, totaldamage = 0;
    var CoolDown = 3, CoolDown2 = 4, CoolDown3 = 5;
    var text1, text2, text3, energytext;
    var keytextQ, keytextE, keytextR;
    var timer1, timer2, timer3;
    var singlePress1 = true, singlePress2 = true, singlePress3 = true;

    var HUD = function() {
        this.k1 = false;
        this.k2 = false;
        this.k3 = false;
        this.direction = 'left';
        this.power = 0;
        this.defense = 0;
        this.handicap = 0;
    }
    HUD.prototype.build = function(game, player)
    {
        totalenergy = 100;
        totaldamage = 0;
        this.game = game;
        this.player = player;
        var totalscore = this.game.totalscore;
        
        game.add.sprite(0, config.game.height - 100, 'toolbar');

        score = game.add.text(550, (config.game.height - 50), 'Score: ' + totalscore , { font: "40px Arial", fill: "#FFFFFF", align: "center", stroke: '#000000', strokeThickness: 6});
        energytext = game.add.text(875, (config.game.height - 72), 'Energy: ', { font: "30px Arial", fill: "#FFFFFF", align: "center", stroke: '#000000', strokeThickness: 6});

        battery = game.add.sprite(1004, (config.game.height - 72), 'battery');
        
        game.add.sprite(121, (config.game.height - 75), 'button1');
        game.add.sprite(216, (config.game.height - 75), 'button2');
        game.add.sprite(311, (config.game.height - 75), 'button3');
        game.add.sprite(3, -4, 'healthUI');
        
        keytextQ = game.add.text(121, (config.game.height - 75), 'Q', { font: "15px Arial", fill: "#FFFFFF", align: "center", stroke: '#000000', strokeThickness: 4});
        keytextE = game.add.text(216, (config.game.height - 75), 'E', { font: "15px Arial", fill: "#FFFFFF", align: "center", stroke: '#000000', strokeThickness: 4});
        keytextR = game.add.text(311, (config.game.height - 75), 'R', { font: "15px Arial", fill: "#FFFFFF", align: "center", stroke: '#000000', strokeThickness: 4});

        //The following hotkeys may not need to be in HUD.js
        //I'm simply keeping them here while I work out functionality
        //  Here we create 3 hotkeys, keys Q,E,R and bind them all to their own functions
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        //TODO replace with different weapon functions
        key1.onDown.add(
        function abilityOne () {
            if(CoolDown == 3 && singlePress1 == true && totalenergy >= 10){
                singlePress1 = false;
                var playerObject = player.player;
                        
                // Missile
                this.k1 = true;
                this.missile = this.game.add.sprite(playerObject.body.x,playerObject.body.y,'missile');
                        this.missile.anchor.setTo(.5, .5);
                this.game.physics.enable(this.missile, Phaser.Physics.ARCADE);
                this.missile.body.collideWorldBounds = true;
                this.missile.enableBody = true;
                this.missile.physicsBodyType = Phaser.Physics.ARCADE;
                
                text1 = this.game.add.text(134, (config.game.height - 75), '', { font: "40px Arial", fill: "#FFFF00", align: "center" });
                text1.stroke = '#000000';
                text1.strokeThickness = 6;
                text1.setText(CoolDown);
                
                timer1 = this.game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
                
                CDmask = this.game.add.graphics(0, 0);
                CDmask.beginFill(0xffffff);
                CDmask.drawRect(121, (config.game.height - 75),50, 50);
                
                CD1 = this.game.add.graphics(0,0);
                CD1.beginFill(0x000000, .5);
                CD1.drawRect(121, (config.game.height - 75) ,50, 50);
                CD1.mask = CDmask;
                
                depleteEnergy(10);
                
                this.game.add.tween(CD1).to({y: '+50'}, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
                this.game.add.tween(energybar).to({x: '-8'}, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
            }
        }, this);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.E);
        //TODO replace with different weapon functions
        key2.onDown.add(abilityTwo, this);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.R);
        //TODO replace with different weapon functions
        key3.onDown.add(finalAbility, this);

        //gradient health bar sprite
        healthbar2 = game.add.sprite(37, (config.game.height - 87), 'minihealth');
        game.add.tween(healthbar2).to({x: '+400'}, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false);
        healthbar = game.add.sprite(-2800, 30, 'health');
        game.add.tween(healthbar).to({x: '+1000'}, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false);
        //add mask to sprite such that only the area we want seen is
        mask = game.add.graphics(0, 0);
        minimask = game.add.graphics(0, 0);
        //  Shapes drawn to the Graphics object must be filled.
        mask.beginFill(0xffffff);
        minimask.beginFill(0xffffff);
        //  Here we'll draw a Rectangle
        mask.drawRect(200, 30 ,1000, 20);
        minimask.drawRect(437, (config.game.height - 87), 400, 10);
        // And apply it to the Sprite
        healthbar.mask = mask; 
        healthbar2.mask = minimask;

        energybar = game.add.sprite(926, (config.game.height - 65), 'energy');
        game.add.tween(energybar).to({x: '+84'}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        maskenergy = game.add.graphics(0, 0);
        maskenergy.beginFill(0xffffff);
        maskenergy.drawRect(1010, (config.game.height - 65) ,84, 31);
        energybar.mask = maskenergy; 
    }

    function abilityTwo () {
        if(CoolDown2 == 4 && singlePress2 == true && totalenergy >= 20){
            var playerObject = player.player;
            this.direction = action.getDirection();
            singlePress2 = false;
            this.k2 = true;
            
            var fx4 = this.game.add.audio('laser');
            fx4.addMarker('laser-segment', 1, 1);

            if(this.direction == 'left'){
                this.laser = this.game.add.sprite(playerObject.body.x - 950, playerObject.body.y,'laser');
                this.game.physics.enable(this.laser, Phaser.Physics.ARCADE);
                this.laser.enableBody = true;
                this.laser.body.collideWorldBounds = true;
                this.laser.physicsBodyType = Phaser.Physics.ARCADE;
                this.laser.anchor.setTo(0, .5);
                fx4.play('laser-segment');
            }
            else if(this.direction == 'right'){
                this.laser = this.game.add.sprite(playerObject.body.x + 75, playerObject.body.y,'laser');
                this.game.physics.enable(this.laser, Phaser.Physics.ARCADE);
                this.laser.enableBody = true;
                this.laser.body.collideWorldBounds = true;
                this.laser.physicsBodyType = Phaser.Physics.ARCADE;
                this.laser.anchor.setTo(0, .5);
                fx4.play('laser-segment');
            }
                    
            text2 = this.game.add.text(229, (config.game.height - 75), '', { font: "40px Arial", fill: "#FFFF00", align: "center" });
            text2.stroke = '#000000';
            text2.strokeThickness = 6;
            text2.setText(CoolDown2);

            timer2 = this.game.time.events.loop(Phaser.Timer.SECOND, updateCounter2, this);

            CDmask = this.game.add.graphics(0, 0);
            CDmask.beginFill(0xffffff);
            CDmask.drawRect(216, (config.game.height - 75),50, 50);

            CD1 = this.game.add.graphics(0,0);
            CD1.beginFill(0x000000, .5);
            CD1.drawRect(216, (config.game.height - 75) ,50, 50);
            CD1.mask = CDmask;

            depleteEnergy(20);

            this.game.add.tween(CD1).to({y: '+50'}, 4000, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.game.add.tween(energybar).to({x: '-16'}, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    }

    function finalAbility () {
        if(CoolDown3 == 5 && singlePress3 == true && totalenergy >= 40){
            
            var fx3 = this.game.add.audio('nuclearblast');
            fx3.addMarker('nuke-segment', 4, 3);
        
            singlePress3 = false;
            this.k3 = true;
            text3 = this.game.add.text(324, (config.game.height - 75), '', { font: "40px Arial", fill: "#FFFF00", align: "center" });
            text3.stroke = '#000000';
            text3.strokeThickness = 6;
            text3.setText(CoolDown3);
            fx3.play('nuke-segment', 3, 2);

            timer3 = this.game.time.events.loop(Phaser.Timer.SECOND, updateCounter3, this);

            CDmask = this.game.add.graphics(0, 0);
            CDmask.beginFill(0xffffff);
            CDmask.drawRect(311, (config.game.height - 75),50, 50);

            CD1 = this.game.add.graphics(0,0);
            CD1.beginFill(0x000000, .5);
            CD1.drawRect(311, (config.game.height - 75) ,50, 50);
            CD1.mask = CDmask;

            depleteEnergy(40);

            this.game.add.tween(CD1).to({y: '+50'}, 5000, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.game.add.tween(energybar).to({x: '-32'}, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
            
            var flash = this.game.add.graphics(0, 0);
            flash.beginFill(0xffffff);
            flash.drawRect(0, 0, 1280, 720);
            flash.alpha = 1;
            this.game.add.tween(environment.nuke).to({alpha: 1}, 2590, Phaser.Easing.Linear.None)
            .to({alpha: 0}, 10, Phaser.Easing.Linear.None)
            .start();
            this.game.add.tween(flash).to({alpha: 0}, 600, Phaser.Easing.Linear.None)
            .to({alpha: 1}, 2000,Phaser.Easing.Linear.None)
            .to({alpha: 0}, 500, Phaser.Easing.Linear.None)
            .start();
        }
    }

    //depletes on use of skills
    function depleteEnergy(amount) {
        totalenergy = totalenergy - amount;
        if (totalenergy <= 0)
            totalenergy = 0;
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
        this.k2 = false;
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
        this.k3 = false;
        text3.setText(CoolDown3);
        if(CoolDown3 == 0){
            CoolDown3 = 5;
            this.game.world.remove(text3);
            this.game.time.events.remove(timer3);
            singlePress3 = true;
        }
    }

    //items in the game may use this function
    HUD.prototype.restoreEnergy = function(amount){
        totalenergy = totalenergy + amount;
        if (totalenergy >= 100)
            totalenergy = 100;
        this.game.add.tween(energybar).to({x: 1006}, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

    HUD.prototype.score = function(points){
        total = total + points;
        this.game.totalscore = total;
        score.setText('Score: ' + this.game.totalscore);
    }

    HUD.prototype.hurt = function(damage)
    {
        totaldamage = totaldamage + damage;
        if (totaldamage > 1000)
        {
            this.player.alive = false;
            this.player.player.kill();
            totaldamage = 0;
            totalenergy = 100;
            this.game.state.start('game-over');
        }
        else if (totaldamage > 700)
        {
            this.player.level = 3;
            this.defense = 40;
            this.power = 40;
            this.handicap = 40;
        }
        else if (totaldamage > 300)
        {
            this.player.level = 2;
            this.power = 20;
            this.defense = 20;
            this.handicap = 20;
        }

        this.game.add.tween(healthbar).to({x: (-1800 - totaldamage)}, 50, Phaser.Easing.Bounce.Out, true, 0, 0, false);
        this.game.add.tween(healthbar2).to({x: 437 - (totaldamage*.4)}, 50, Phaser.Easing.Bounce.Out, true, 0, 0, false);
        this.game.add.tween(healthbar).to({x: (-1800 - totaldamage)}, 50, Phaser.Easing.Bounce.Out, true, 0, 0, false);                
    }
    return new HUD();

});
