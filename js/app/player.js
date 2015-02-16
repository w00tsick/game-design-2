define(['app/config'],
function(config) {

    "use strict";

    var Player = function()
    {
        this.ground = null;
        this.platforms = null;
        this.movementSpeed = 300;
    }

    Player.prototype.build = function(game)
    {
 
        game.fireRate = 100;
        game.nextFire = 0;


        game.player = game.add.sprite(config.game.width / 2 - 40, 0, 'player');
        game.player.frame = 11;
        game.player.width = 100;
        game.player.height = 100;
        game.physics.arcade.enable(game.player);
        game.player.body.bounce.y = 0;
        game.player.body.gravity.y = 1000;
        game.player.body.collideWorldBounds = true;
        game.currentDirection = 'rest';
   
        game.player.animations.add('rest-right', [20, 21, 22, 23], 6, true);
        game.player.animations.add('rest-left', [24, 25, 26, 27], 6, true);
        game.player.animations.add('run-right', [0, 1, 2, 3, 4, 5], 6, true);
        game.player.animations.add('run-left', [10, 11, 12, 13, 14, 15], 6, true);
        game.player.animations.add('jump-right', [30, 31], 2, true);
        game.player.animations.add('jump-left', [32, 33], 2, true);
        game.player.play('rest-right');

        game.bullets = game.add.group();
        game.bullets.enableBody = true;
        game.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        game.bullets.setAll('checkWorldBounds', true);
        game.bullets.setAll('outOfBoundsKill', true);

        game.bullets.createMultiple(50, 'bullet');

        game.camera.follow(game.player);
    }
 
    Player.prototype.dontMove = function(game)
    {
        game.player.body.velocity.x = 0;

        if (game.currentDirection == 'right')
        {
            game.player.play('rest-right');
        }
        else if (game.currentDirection == 'left')
        {
            game.player.play('rest-left');
        }
    }

    Player.prototype.moveLeft = function(game)
    {
        //game.player.body.velocity.x = this.movementSpeed * -1;
        game.player.play('run-left');
        game.currentDirection = 'left';
    }

    Player.prototype.moveRight = function(game)
    {
        //game.player.body.velocity.x = this.movementSpeed;
        game.player.play('run-right');
        game.currentDirection = 'right';
    }

    Player.prototype.moveUp = function(game)
    {
        if (game.currentDirection == 'right')
        {
            game.tile.x -= 5;
            game.player.play('jump-right');
        }
        else if (game.currentDirection == 'left')
        {
            game.tile.x += 5;
            game.player.play('jump-left');
        }
    }

    Player.prototype.shoot = function(game)
    {
        if (game.time.now > game.nextFire && game.bullets.countDead() > 0)
        {
            game.nextFire = game.time.now + game.fireRate;
            var bullet = game.bullets.getFirstDead();
            bullet.reset(game.player.x, game.player.y);
            game.physics.arcade.moveToPointer(bullet, 1000);
        }
    }

    return new Player();

});
