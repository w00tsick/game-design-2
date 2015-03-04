define(['app/config', 
        'app/mob'], 
function(config, Mob) {

    "use strict";

    var MobFactory = {
        mobs: [],
        canspawn: true,
        build: function(game, mobs)
        {
            for (var i = 0; i < mobs; i++)
            {
                // TODO add positioning options
                MobFactory.mobs.push(new Mob(game, (i + 1) * 100));
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
