define(function() {

    "use strict";

    var config = {
        game: {
            width: 1280,
            height: 720,
            spawnpoints: [2500, 2000]
        },
        movement: {
            speed: 9 
        },
        animations: {

            player: {
                restRight: [1],
                restLeft: [0],
                runRight: [12,2,4,8],
                runLeft: [11,3,5,7],
                jumpRight: [9],
                jumpLeft: [10]

            },

            mob: {
                restRight: [1],
                restLeft: [1],
                runRight: [1],
                runLeft: [10, 11, 12, 13, 14, 15],
                jumpRight: [30, 31],
                jumpLeft: [32, 33]
            }
        },
        platform: {
            bare: {
                x: 0,
                y: 720 - 265, 
                height: 10,
                width: 400
            }
        }
    }

    return config;

});
