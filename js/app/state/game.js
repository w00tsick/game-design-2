define(['app/config', 
        'app/environment',
        'app/HUD',
        'app/player', 
        'app/action', 
        'app/mobFactory',
        'app/controls',
        'app/platform'], 
function(config, environment, HUD, player, action, mobFactory, controls, platform) {
    "use strict"

    var count = 0;

    var game = function(game) {
        this.game = game;
    };

    game.prototype = {
        preload: function() {
            this.game.load.image('ground', 'assets/images/ground-temp.jpg');
            this.game.load.image('nuke_bg', 'assets/images/nuke.jpg');
            this.game.load.audio('impact', 'assets/audio/SoundEffects/bullet-hit.wav');
            this.game.load.audio('bomb', 'assets/audio/SoundEffects/bomb.wav');
            this.game.load.image('background1', 'assets/images/bgtest.jpg');
            this.game.load.image('background2', 'assets/images/bgtest2.jpg');
            this.game.load.image('background3', 'assets/images/bgtest3.jpg');
            this.game.load.image('ground1', 'assets/images/bound1.jpg');
            this.game.load.image('ground2', 'assets/images/bound2.jpg');
            this.game.load.image('ground3', 'assets/images/bound3.jpg');
            this.game.load.image('floor1', 'assets/images/floor1.jpg');
            this.game.load.image('floor2', 'assets/images/floor2.jpg');
            this.game.load.image('floor3', 'assets/images/floor3.jpg');
            this.game.load.audio('impact', 'assets/audio/SoundEffects/bullet-hit.wav');
            this.game.load.image('health', 'assets/images/gradient.png');
            this.game.load.image('minihealth', 'assets/images/minihealthbar.png');
            this.game.load.spritesheet('player', 'assets/images/player-sprite-wire.png', 400, 400);
            this.game.load.image('bullet', 'assets/images/bullet-temp.png');
	    this.game.load.spritesheet('mob', 'assets/images/Soldier3_SpriteSheet.png', 100, 100);

        },
        create: function() {
            mobFactory.canspawn = true;
            environment.build(this.game);
            player.build(this.game);
            HUD.build(this.game, player);
            action.init(this.game);
            controls.bind(this.game, action, environment, player);
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);
            // Reseting the bounds to prevent them to pass through the floor.
            this.game.world.setBounds(0, 0, config.game.width, config.game.height - 150);
        },
	
	render: function(){
	  //this.game.debug.bodyInfo(player.player, 16, 250);  
	},
	
        update: function() {	    
            var game = this.game;
            var fx = this.game.add.audio('impact');
            fx.addMarker('impact-segment', 0, .5);
            var fx2 = this.game.add.audio('bomb');
            fx2.addMarker('bomb-segment', 0, 1);
            var playerObject = player.player;
            var bullets = player.bullets;
            var mobObjects = mobFactory.getAliveMobs();

            environment.filter.update();

            // Jump cheking	   
            if(playerObject.body.velocity.y >= 0 && playerObject.body.velocity.y <= 20){
                count += 1;
                if(count > 10)
                    player.setJumping(false);
            }else{
                player.setJumping(true);
                count = 0;
            }       
            game.physics.arcade.collide(playerObject, platform.platformGroup);

            // Homing Missile
            if(HUD.k1){
                HUD.missile.rotation = game.physics.arcade.moveToPointer(HUD.missile, 1000, this.game.input.activePointer, 500)
                game.physics.arcade.collide(HUD.missile, platform.platformGroup,
                    function(missile, plat) {
                        missile.kill();
                        fx2.play('bomb-segment');
                        HUD.k1 = false;
                });
		game.physics.arcade.overlap(HUD.missile, platform.platformGroup,
                    function(missile, plat) {
                        missile.kill();
                        HUD.k1 = false;
                });
            }

            //laser

            if(HUD.k2){
                if(HUD.direction == 'left'){
                    HUD.laser.body.x = playerObject.body.x - 950;
                    HUD.laser.body.y = playerObject.body.y;
                }
                else if(HUD.direction == 'right'){
                    HUD.laser.body.x = playerObject.body.x + 75;
                    HUD.laser.body.y = playerObject.body.y;
                }
            }
            else if (HUD.k2 == false){
                if(typeof HUD.laser != 'undefined')
                    HUD.laser.kill();
            }


            //nuke
            if(HUD.k3){
                mobObjects.forEach(function(obj) {
                    obj.hurt(1000);
                    HUD.score(50);
                });
            }	    
            mobObjects.forEach(function(obj) {
                obj.mob.healthGraphic.x = obj.mob.body.x + 30;
                obj.mob.healthGraphic.y = obj.mob.body.y;
                game.physics.arcade.collide(obj.mob, platform.platformGroup);
		game.physics.arcade.overlap(obj.mob, platform.platformGroup,
		    function(mob, platform){
			if(!platform.is.ground){
			    mob.body.gravity.y = 0;
			    mob.body.velocity.y = 0;
			    mob.body.y = platform.body.y - mob.width - 1;
			}
		    }
                );
                game.physics.arcade.overlap(player.bullets, obj.mob,
                    // TODO for some reason these are backwards ?
                    function(bullet, mob) {
                        mob.kill();
                        fx.play('impact-segment');
                        obj.hurt(50 + HUD.power);
                        HUD.score(50 - HUD.handicap);
                    }
                );

                game.physics.arcade.collide(HUD.missile, obj.mob,
                    function(missile, mob) {
                        missile.kill();
                        fx2.play('bomb-segment');
                        HUD.k1 = false;
                        obj.hurt(700 + HUD.power);
                        HUD.score(50 - HUD.handicap);
                });
		
		game.physics.arcade.overlap(HUD.missile, obj.mob,
                    function(missile, mob) {
                        missile.kill();
                        HUD.k1 = false;
                        obj.hurt(700);
                        HUD.score(50);
                });

                game.physics.arcade.overlap(HUD.laser, obj.mob,
                    function(laser, mob) {
                        if(HUD.k2){
                            obj.hurt(4 + (HUD.power / 20));
                            HUD.score(4);
                        }
                });
                game.physics.arcade.overlap(obj.mob, player.player,
                    function(player, mob) {
                    }
                );

                /* Mobs shooting
                 *  Is he able to shoot
                 */
                obj.faceCheck(player);
		var mobx, moby, py, px;
		if(obj.facing == "right")
		    mobx = obj.mob.body.x + obj.mob.width;
		else
		    mobx = obj.mob.body.x;

		moby = obj.mob.body.y + (obj.mob.height/2);
		
		py = playerObject.body.y + (playerObject.height/2);
		if(action.direction = "right")
		    px = playerObject.body.x + playerObject.width;
		else
		    px = playerObject.body.x;

		var ray = new Phaser.Line(mobx, moby, px, py)
                if(!platform.getIntersection(ray,game))
                    obj.shoot(px, py, mobx, moby);
                else
                    obj.rest();

                var mobBullets = obj.bullets;
                game.physics.arcade.collide(mobBullets, platform.platformGroup,
                    function(bullet, platform) {                        
			bullet.kill();
                    }
                );
		
		game.physics.arcade.overlap(mobBullets, platform.platformGroup,
                    function(bullet, platform) {                        
			bullet.kill();
                    }
                );

                game.physics.arcade.overlap(mobBullets, playerObject,
                    // backwars either
                    function(bullet, player) {
                        player.kill();
                        fx.play('impact-segment');
                        HUD.hurt(50 - HUD.defense);
                    }
                );
            });

            game.physics.arcade.collide(bullets, platform.platformGroup,
                function(bullet, platform) {		    
                    bullet.kill();
                }
            );

	    game.physics.arcade.overlap(bullets, platform.platformGroup,
		function(bullet, platform) {
                    bullet.kill();		
		}
	    );

            config.game.level[game.currentLevel].spawnpoints.forEach(function(spawnpoint) {
                if (Math.abs(environment.backdrop.x) < spawnpoint)
                {
                    if (mobFactory.canspawn)
                    {
                        var mobs = mobFactory.build(game, 5);
                        mobFactory.canspawn = false;
                        environment.stopWorld();
                    }
                    else if (mobFactory.getAliveMobs().length == 0
                        && playerObject.body.x < config.game.width / 2)
                    {
                        config.game.level[game.currentLevel].spawnpoints.shift();
                        mobFactory.canspawn = true;
                        environment.startWorld(playerObject, environment,
                            platform);
                    }
                }
            });

            if (Math.abs(environment.backdrop.x) < 
                config.game.level[game.currentLevel].bossSpawnpoint)
            {
                if (mobFactory.canspawn)
                {
                    var boss = mobFactory.buildBoss(game);
                    environment.stopWorld();
                    mobFactory.canspawn = false;
                }

                if (mobFactory.getAliveMobs().length == 0)
                {
                    mobFactory.canspawn = true;
                    environment.startWorld(playerObject, environment,
                        platform);
                    if (game.currentLevel < config.game.level.length)
                    {
                        game.currentLevel = game.currentLevel + 1;
                        game.state.start('game');
                    }

                    if (game.currentLevel == config.game.level.length)
                    {
                        game.state.start('you-win');
                    }
                }
            }

        controls.check(game);
        }
    }

    return game;

});
