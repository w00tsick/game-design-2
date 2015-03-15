define(['app/config', 
        'app/mob'], 
function(config, Mob) {

    "use strict";

    var MobFactory = {
        mobs: [],
        canspawn: true,
        buildBoss: function(game)
        {
            MobFactory.mobs.push(new Mob(game, 100, true,
                config.game.level[game.currentLevel].bossHitPoints));
        },
        build: function(game, mobs)
        {
            var buildLocations = [];
            for (var i = 0; i < mobs; i++)
            {
                var loc = Math.random() * config.game.width - 100;
                if (function(loc, buildLocations) {
                    return buildLocations.forEach(function(i) {
                        if (i - loc > -100 || i - loc < 100) return false;
                    });
                }) {
                    buildLocations.push(loc);
                }
                else
                {
                    i--;
                }
            }

            for (var i = 0; i < mobs; i++)
            {
                // TODO add positioning options
                MobFactory.mobs.push(new Mob(game, buildLocations[i], false,
                    config.game.level[game.currentLevel].mobHitPoints));
            }

            return MobFactory.mobs;
        },
        getAliveMobs: function()
        {
            var temp = [];
            MobFactory.mobs.forEach(function(mob) {
                if (mob.mob.alive) {
                    temp.push(mob)
                }
            });
            return temp;
        }
    }

    return MobFactory;

});
