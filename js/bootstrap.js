requirejs.config({
    baseUrl: 'js',
    path: {
        vendor: 'vendor',
        app: 'app'
    },
});

requirejs(['app/game'], function(phaser) {});

