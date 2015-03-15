define(function() {

    "use strict";

    var config = {
        game: {
            width: 1280,
            height: 720,

            level: [ 
                {
                    spawnpoints: [2500, 2000],
                    bossSpawnpoint: 1500,
                    bossHitPoints: 1000,
                    mobCount: 5,
                    mobHitPoints: 100,
                    background: "background1",
                    platforms: [
                        { x: 0, y: 0 },
                        { x: -600, y: -50 },
                        { x: -1300, y: 50 },
                        { x: -2300, y: 50 },
                    ]
                },
                {
                    spawnpoints: [2500, 2000],
                    bossSpawnpoint: 1500,
                    bossHitPoints: 1000,
                    mobCount: 7,
                    mobHitPoints: 200,
                    background: "background2",
                    platforms: [
                        { x: 0, y: 0 },
                        { x: -800, y: -100 },
                        { x: -1700, y: 50 },
                        { x: -2000, y: 50 },
                    ]
                }
            ] 
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
                restRight: [0,6,8,9],
                restLeft: [1],
                runRight: [0,6,8,9],
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
