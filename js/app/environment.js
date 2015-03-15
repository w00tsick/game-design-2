define(['app/config', 'app/platform'],
function(config, platform) {

    "use strict";

    var Environment = function() {}
    Environment.prototype.build = function(game)
    {   
    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "float speed = time * 0.2;",
        "float pi = 3.14159265;",

        "void main( void ) {",

            "vec2 position = vec2(640.0/2.0+640.0/2.0*sin(speed*2.0), 360.0/2.0+360.0/2.0*cos(speed*3.0));",
            "vec2 position2 = vec2(640.0/2.0+640.0/2.0*sin((speed+2000.0)*2.0), 360.0/2.0+360.0/2.0*cos((speed+2000.0)*3.0));",

            "vec2 offset = vec2(640.0/2.0, 360.0/2.0) ;",
            "vec2 offset2 = vec2(6.0*sin(speed*1.1), 3.0*cos(speed*1.1));",

            "vec2 oldPos = (gl_FragCoord.xy-offset);",

            "float angle = speed*2.0;",

            "vec2 newPos = vec2(oldPos.x *cos(angle) - oldPos.y *sin(angle),",
            "oldPos.y *cos(angle) + oldPos.x *sin(angle));",

            "newPos = (newPos)*(0.0044+0.004*sin(speed*3.0))-offset2;",
            "vec2 temp = newPos;",
            "newPos.x = temp.x + 0.4*sin(temp.y*2.0+speed*8.0);",
            "newPos.y = (-temp.y + 0.4*sin(temp.x*2.0+speed*8.0));",
            "vec4 final = texture2D(iChannel0,newPos);",
            "//final = texture2D(texCol,gl_FragCoord.xy*vec2(1.0/640, -1.0/360));",
            "gl_FragColor = vec4(final.xyz, 1.0);",

        "}"
        ];
        
        
        game.add.audio('BGmusic').play('',0,1,true);
        game.physics.startSystem(Phaser.Physics.ARCADE)

        this.game = game;
        this.backdrop = game.add.tileSprite(-3000, 0, 5000, config.game.height,
            config.game.level[game.currentLevel].background);
            
        this.nuke = game.add.tileSprite(0, 0, 1920, 1080, 'nuke_bg');
        this.nuke.scale.y = .75;
        this.nuke.scale.x = .75;
        this.nuke.alpha = (0);
        
        var customUniforms = {
        iChannel0: { type: 'sampler2D', value: this.nuke.texture, textureData: { repeat: true } }
        };
        
        this.filter = new Phaser.Filter(game, customUniforms, fragmentSrc);
        this.filter.setResolution(1920, 1080);
        this.nuke.filters = [ this.filter ];    

        this.worldMoving = true;
        this.ableMove = true;
        platform.init(game);

        platform.create(
            { x: 0,
              y: config.game.height - 150 },
            { height: 150,
              width: config.game.width + 1000},
            'floor1', true, true);

        platform.create(
            { x: config.game.width - 200,
              y: 0 },
            { height: config.game.height,
              width: config.game.width},
            'ground1');

        config.game.level[game.currentLevel].platforms.forEach(function(settings) {
            platform.create(
                { x: config.platform.bare.x + settings.x, 
                  y: config.platform.bare.y + settings.y },
                { height: config.platform.bare.height,
                  width: config.platform.bare.width},
                'ground');
        });
    }

    Environment.prototype.getPlatform = function()
    {
        return platform;
    }

    Environment.prototype.move = function(direction, platforms, amount)
    {
        this.backdrop.x -= (direction / (direction - (direction / 2)))
                     * (direction / Math.abs(direction))
        platforms.move(direction);
    }

    Environment.prototype.stopWorld = function()
    {
        this.worldMoving = false;
    }

    Environment.prototype.startWorld = function(player, environment, platforms)
    {
        var game = this.game;
        game.add.tween(player)
            .to({x: config.game.width / 2}, 500)
            .start();
        platforms.platformGroup.forEach(function(platform) {
            if (!platform.is.ground) {
                game.add.tween(platform)
                .to({x: platform.body.x + (config.game.width / 2) - player.body.x }, 500)
                .start();
            }
        });
        this.worldMoving = true;
    }

    return new Environment();

});
