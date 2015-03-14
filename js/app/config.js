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
                runRight: [2, 4, 6],
                runLeft: [3, 5, 7],
                jumpRight: [8, 9],
                jumpLeft: [7, 10]
            },

            mob: {
                restRight: [20, 21, 22, 23],
                restLeft: [24, 25, 26, 27],
                runRight: [0, 1, 2, 3, 4, 5],
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
