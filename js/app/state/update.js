define(['app/config', 
        'app/controls', 
        'app/player',
        'app/environment',
        'app/mobFactory',
        'app/platform'], 
function(config, controls, player, environment, mobFactory, platform) {

    "use strict"
    var count = 0;

    var update = function(game) {
        var playerObject = player.player;
        var bullets = player.bullets;
        var mobObjects = mobFactory.getAliveMobs();
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
        mobObjects.forEach(function(obj) {
            obj.mob.healthGraphic.x = obj.mob.body.x + 30;
            obj.mob.healthGraphic.y = obj.mob.body.y;
            game.physics.arcade.collide(obj.mob, platform.platformGroup);
            game.physics.arcade.overlap(player.bullets, obj.mob,
                // TODO for some reason these are backwards ?
                function(bullet, mob) {
                    mob.kill();
                    obj.hurt(50);
                }
            );
            game.physics.arcade.overlap(obj.mob, player.player,
                function(player, mob) {
                    console.log('test');
                }
            );
        });

        game.physics.arcade.collide(bullets, platform.platformGroup,
            function(bullet, platform) {
                bullet.kill();
            }
        );

        config.game.spawnpoints.forEach(function(spawnpoint) {
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
                    config.game.spawnpoints.shift();
                    mobFactory.canspawn = true;
                    environment.startWorld(playerObject, environment,
                        platform);
                }
            }
        });

        controls.check(game);
    };

    return update;

});
