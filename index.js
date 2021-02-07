var app = new PIXI.Application(800, 800, { backgroundColor: 0xeeeeee });
document.body.appendChild(app.view);
var bunny = PIXI.Sprite.fromImage('./art/iam.jpg');
bunny.anchor.set(0.5);
bunny.scale.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

// app.stage.addChild(bunny);
var root = app.stage.addChild(new PIXI.Container());

// Listen for animate update
app.ticker.add(function(delta) {
    // bunny.rotation += 0.1 * delta;
});

var emitterMatch = {
    "alpha": {
        "start": 1,
        "end": 0
    },
    "scale": {
        "start": 1,
        "end": 0.1,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "start": "#ffffff",
        "end": "#ffffff"
    },
    "speed": {
        "start": 150,
        "end": 50,
        "minimumSpeedMultiplier": 1
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 0,
        "max": 360
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 1,
        "max": 1.2
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": 0.2,
    "maxParticles": 2,
    "pos": {
        "x": 100,
        "y": 100
    },
    "addAtBack": false,
    "spawnType": "point"
}

/*emitterMatch = {
    "alpha": {
        "start": 0.8,
        "end": 0.1
    },
    "scale": {
        "start": 0.7,
        "end": 0.3,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "start": "#ffffff",
        "end": "#ffffff"
    },
    "speed": {
        "start": 600,
        "end": 400,
        "minimumSpeedMultiplier": 1
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 0,
        "max": 360
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 50,
        "max": 70
    },
    "lifetime": {
        "min": 2.5,
        "max": 3
    },
    "blendMode": "normal",
    "frequency": 0.0001,
    "emitterLifetime": 2,
    "maxParticles": 100,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "rect",
    "spawnRect": {
        "x": -100,
        "y": -100,
        "w": 200,
        "h": 200
    }
}*/


// var box = app.stage.addChild(new PIXI.Container());
root.addChild(new PIXI.Graphics())
    .beginFill(0x990000)
    .drawCircle(200, 200, 70);

var box = root.addChild(new PIXI.particles.ParticleContainer(100, {
    scale: true,
    position: true,
    rotation: true,
    alpha: true
}));

chief = root.addChild(new PIXI.Sprite(PIXI.Texture.fromImage('./art/iam.jpg')));
chief.anchor.set(0.5);
chief.scale.set(0.1);

box.position.set(400);
var particleTextures = [new PIXI.Texture.fromImage('./art/hole.png')];
// this.starTexture = [new PIXI.Texture.fromImage("flare")];
// var part = new PIXI.particles.Emitter(box, particleTextures, emitterMatch);
// // var part = app.stage.addChild(new PIXI.particles.Emitter(particleTextures, emitterMatch));
// part.playOnceAndDestroy();
var ungle = 0;


app.ticker.add(function(delta) {
    ungle += 0.01;
    var xx = 300 * Math.cos(ungle);
    var yy = 300 * Math.sin(ungle);
    chief.position.set(400 + xx, 400 + yy);
    if (Math.random()< 0.05) {
        var pos = Object.assign({}, emitterMatch)
        pos.pos = {
                x: xx,
                y: yy
            }
        new PIXI.particles.Emitter(box, particleTextures, pos).playOnceAndDestroy();
        // part.playOnceAndDestroy();
    }
    // var part = new PIXI.particles.Emitter(box, particleTextures, emitterMatch);
    // playOnceAndDestroy()
    //
    // part.position.set(xx, yy);
    // part.update(delta * 0.001);
    // bunny.rotation += 0.1 * delta;
});

