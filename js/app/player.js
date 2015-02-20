define(['app/config'],
function(config) {

    "use strict";

    var Player = function() 
    {
        this.player = null;
        this.bullets = null;
    }

    Player.prototype.build = function(game)
    {
        this.game = game;
        this.registerSprite();
        this.registerAnimations();
        this.registerBullets();
    }

    Player.prototype.registerSprite = function()
    {
        var player = this.game.add.sprite(config.game.width / 2 - 40, 0, 'player');
        this.game.physics.arcade.enable(player);
        player.frame = 11;
        player.width = 100;
        player.height = 100;
        player.body.bounce.y = 0;
        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = true;

        this.player = player;
    }

    Player.prototype.registerAnimations = function()
    {
        this.player.animations.add('rest-right',
            config.animations.player.restRight, 6, true);
        this.player.animations.add('rest-left', 
            config.animations.player.restLeft, 6, true);
        this.player.animations.add('run-right', 
            config.animations.player.runRight, 6, true);
        this.player.animations.add('run-left', 
            config.animations.player.runLeft, 6, true);
        this.player.animations.add('jump-right', 
            config.animations.player.jumpRight, 2, true);
        this.player.animations.add('jump-left', 
            config.animations.player.jumpLeft, 2, true);
        this.player.play('rest-right');
    }

    Player.prototype.registerBullets = function()
    {
        this.fireRate = 100;
        this.nextFire = 0;

        var bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        this.bullets = bullets;
    }

    Player.prototype.moveLeft = function()
    {
        this.player.play('run-left');
    }

    Player.prototype.moveRight = function()
    {
        this.player.play('run-right');
    }

    Player.prototype.rest = function(facing)
    {
        switch (facing) {
            case "left":
                this.player.play('rest-left');
                break;
            case "right":
                this.player.play('rest-right');
                break;
        }
    }

    Player.prototype.jump = function(facing)
    {
        if (this.player.body.velocity.y == 0) {
            this.player.body.velocity.y = -500;
        }

        switch (facing) {
            case "left":
                this.player.play('jump-left');
                break;
            case "right":
                this.player.play('jump-right');
                break;
        }
    }

    Player.prototype.shoot = function()
    {
        if (this.game.input.mousePointer.x >= this.player.x) {
            this.player.play('run-right');
        } else if (this.game.input.mousePointer.x <= this.player.x) {
            this.player.play('run-left');
        }

        if (this.game.time.now > this.nextFire
            && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.player.x, this.player.y);
            this.game.physics.arcade.moveToPointer(bullet, 1000);
        }
    }

    return new Player();

});
