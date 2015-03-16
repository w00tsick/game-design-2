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
            this.game.load.audio('nuclearblast', 'assets/audio/SoundEffects/nuclearblast.mp3');
            this.game.load.audio('laser', 'assets/audio/SoundEffects/laser.mp3');
            this.game.load.image('button1', 'assets/images/hotkey1.png');
            this.game.load.image('toolbar', 'assets/images/toolbar.png');
            this.game.load.image('button2', 'assets/images/hotkey2.png');
            this.game.load.image('button3', 'assets/images/Hotkey3.png');
            this.game.load.image('healthUI', 'assets/images/PCAhZzQ.png');
            this.game.load.image('battery', 'assets/images/empty-battery.png');
            this.game.load.image('energy', 'assets/images/energy.png');
            this.game.load.image('missile', 'assets/images/missiles.png');
            this.game.load.image('laser', 'assets/images/LaserBeam.png');
            this.game.load.audio('sfx', 'assets/audio/SoundEffects/LikeABoss.mp3');        
            //https://www.youtube.com/watch?v=i57YfVVYILU remember to give credit
            //he put this up for everyone to use
            //this.game.load.audio('BGmenu', 'assets/audio/SoundEffects/likeabossinstrumentalremix3.mp3');
            //https://www.youtube.com/watch?v=QKAhyrP0MEg give credit for this as well
            //this.game.load.audio('BGmusic', 'assets/audio/SoundEffects/FutureClub.mp3');
        },
        create: function() {
            var bgm = this.game.add.audio('BGmenu');
            //bgm.play('',0,1,true);
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
            var t = this.game.add.text(this.game.world.centerX - 170, this.game.world.centerY + 100, text, style);
            t.inputEnabled = true;
            var fx = this.game.add.audio('sfx');
            t.events.onInputUp.add(function() {
                bgm.stop();
                //fx.play('', 0,1);
                this.game.state.start('game');
            }, this);
            
            var text2 = "Fullscreen";
            var t2 = this.game.add.text(this.game.world.centerX - 160, this.game.world.centerY + 175, text2, style);
            t2.inputEnabled = true;
            t2.events.onInputUp.add(function() {
                this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.scale.startFullScreen();
            }, this);
        
            var text3 = "Help";
            var t3 = this.game.add.text(this.game.world.centerX - 85, this.game.world.centerY + 250, text3, style);
            t3.inputEnabled = true;
            var fx = this.game.add.audio('sfx');
            t3.events.onInputUp.add(function() {
                bgm.stop();
                //fx.play('', 0,1);
                this.game.state.start('help');
            }, this);
        },
        
        update: function() {
            this.filter.update();
        }
    }

    return menu;

});
