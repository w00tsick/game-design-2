define(function() {

    "use strict";

    var config = {
        game: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        movement: {
            speed: 5
        },
        animations: {
            player: {
                restRight: [20, 21, 22, 23],
                restLeft: [24, 25, 26, 27],
                runRight: [0, 1, 2, 3, 4, 5],
                runLeft: [10, 11, 12, 13, 14, 15],
                jumpRight: [30, 31],
                jumpLeft: [32, 33]
            }
        }
    }

    return config;

});
