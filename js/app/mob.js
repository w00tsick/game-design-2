define(['app/config'],
function(config) {

    "use strict";

    var Mob = function(game, spawnpoint, isBoss, hitpoints)
    {
        this.isBoss = isBoss;
        this.hitpoints = hitpoints;
        this.game = game;
        this.registerSprite(game, spawnpoint);
        this.registerAnimations();
        this.registerBullets();
        this.facing = "right"
    }

    Mob.prototype.registerSprite = function(game, spawnpoint)
    {
        var mob = game.add.sprite(spawnpoint, 0, 'mob');
        game.physics.arcade.enable(mob);
        mob.frame = 11;
        mob.width = 200;
        mob.height = 200;
        mob.body.bounce.y = 0;
        mob.body.gravity.y = 1000;
        mob.body.collideWorldBounds = true;
        mob.healthGraphic = game.add.graphics(0, 0);
        mob.healthGraphic.beginFill(0xff0000)
        mob.healthGraphic.drawRect(0, 10, 40, 7);

        mob.totalHitPoints = this.hitpoints;
        mob.currentHitPoints = this.hitpoints;

        this.mob = mob;
    }

    Mob.prototype.hurt = function(amount)
    {
        var healthBarWidth = 40;
        this.mob.healthGraphic.width -= amount * (1/this.mob.totalHitPoints);
        this.mob.currentHitPoints -= amount;
        if (this.mob.currentHitPoints < 1) {
            this.mob.kill();
            this.mob.healthGraphic.destroy();
        }
    }

    Mob.prototype.registerAnimations = function()
    {
        this.mob.animations.add('rest-right',
            config.animations.mob.restRight, 6, true);
        this.mob.animations.add('rest-left', 
            config.animations.mob.restLeft, 6, true);
        this.mob.animations.add('run-right', 
            config.animations.mob.runRight, 6, true);
        this.mob.animations.add('run-left', 
            config.animations.mob.runLeft, 6, true);
        this.mob.animations.add('jump-right', 
            config.animations.mob.jumpRight, 2, true);
        this.mob.animations.add('jump-left', 
            config.animations.mob.jumpLeft, 2, true);
        this.mob.play('rest-right');
    }

    Mob.prototype.registerBullets = function()
    {
        this.fireRate = 100;
        this.nextFire = 0;

        var bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(1, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        this.bullets = bullets;
    }

    Mob.prototype.moveLeft = function()
    {
        this.mob.body.velocity.x = config.movement.speed * 30 * -1;
    }

    Mob.prototype.moveRight = function()
    {
        this.mob.body.velocity.x = config.movement.speed * 30;
    }

    Mob.prototype.rest = function()
    {
        this.mob.body.velocity.x = 0;
        switch (this.facing) {
        case "left":
            this.mob.play('rest-left');
            break;
        case "right":
            this.mob.play('rest-right');
            break;
        }
    }

    Mob.prototype.jump = function(facing)
    {
        if (this.mob.body.velocity.y == 0) {
            this.mob.body.velocity.y = -500;
        }

        switch (facing) {
        case "left":
            this.mob.play('jump-left');
            break;
        case "right":
            this.mob.play('jump-right');
            break;
        }
    }

    Mob.prototype.faceCheck = function(player)
    {
        if (player.player.body.x >= this.mob.x) {
            this.facing = "right";
        } else if (player.player.body.x <= this.mob.x) {
            this.facing = "left";
        }
    }


    Mob.prototype.shoot = function(x,y,mobx,moby)
    {
        switch (this.facing) {
        case "left":
            this.mob.play('run-left');
            break;
        case "right":
            this.mob.play('run-right');
            break;
        }
        if (this.game.time.now > this.nextFire
            && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(mobx, moby);
            this.game.physics.arcade.moveToXY(bullet,x,y,450);
        }
    }

    return Mob;
});
