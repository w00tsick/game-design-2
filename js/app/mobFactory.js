define(['app/config', 
        'app/mob'], 
function(config, Mob) {

    "use strict";

    var MobFactory = {
        mobs: [],
        build: function(game, mobs)
        {
            for (var i = 0; i < mobs; i++)
            {
                // TODO add positioning options
                MobFactory.mobs.push(new Mob(game, 100 - i * 40));
            }

            return MobFactory.mobs;
        },
        getMobs: function()
        {
            return MobFactory.mobs;
        }
    }

    return MobFactory;

});
