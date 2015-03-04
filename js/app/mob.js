define(['app/config'],
function(config) {

    "use strict";

    var Mob = function(game, spawnpoint)
    {
        this.game = game;
        this.registerSprite(game, spawnpoint);
        this.registerAnimations();
        this.registerBullets();
    }

    Mob.prototype.registerSprite = function(game, spawnpoint)
    {
        var mob = game.add.sprite(spawnpoint, 0, 'mob');
        game.physics.arcade.enable(mob);
        mob.frame = 11;
        mob.width = 100;
        mob.height = 100;
        mob.body.bounce.y = 0;
        mob.body.gravity.y = 1000;

        mob.healthGraphic = game.add.graphics(0, 0);
        mob.healthGraphic.beginFill(0xff0000);
        mob.healthGraphic.drawRect(0, 10, 40, 7);

        console.log(mob.healthGraphic.width);
        mob.totalHitPoints = 100;
        mob.currentHitPoints = 100;

        this.mob = mob;
    }

    Mob.prototype.hurt = function(amount)
    {
        var healthBarWidth = 40;
        var percent = 1 - (this.mob.totalHitPoints - amount) / this.mob.totalHitPoints;
        this.mob.healthGraphic.width -= healthBarWidth * percent;
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
        bullets.createMultiple(50, 'bullet');
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

    Mob.prototype.rest = function(facing)
    {
        this.mob.body.velocity.x = 0;
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

    Mob.prototype.shoot = function()
    {
        if (this.game.input.mousePointer.x >= this.mob.x) {
            this.mob.play('run-right');
        } else if (this.game.input.mousePointer.x <= this.mob.x) {
            this.mob.play('run-left');
        }

        if (this.game.time.now > this.nextFire
            && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.mob.x, this.mob.y);
            this.game.physics.arcade.moveToPointer(bullet, 1000);
        }
    }

    return Mob;

});
