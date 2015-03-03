define(['app/config', 
        'app/controls', 
        'app/player',
        'app/mobFactory',
        'app/platform'], 
function(config, controls, player, mobFactory, platform) {

    "use strict"

    var update = function(game) {
        var playerObject = player.player;
        var bullets = player.bullets;
        var mobObjects = mobFactory.getMobs();
        game.physics.arcade.collide(playerObject, platform.platformGroup);

        mobObjects.forEach(function(obj) {
            obj.mob.healthGraphic.x = obj.mob.body.x + 30;
            obj.mob.healthGraphic.y = obj.mob.body.y;
            game.physics.arcade.collide(obj.mob, platform.platformGroup);
            game.physics.arcade.overlap(player.bullets, obj.mob,
                // TODO for some reason these are backwards ?
                function(bullet, mob) {
                    mob.kill();
                    obj.hurt(10);
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

        controls.check(game);
    };

    return update;

});
