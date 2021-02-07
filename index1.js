var app = new PIXI.Application(800, 800, { backgroundColor: 0xeeeeee });
document.body.appendChild(app.view);
var bunny = PIXI.Sprite.fromImage('./art/iam.jpg');

var root = app.stage.addChild(new PIXI.Container());

app.ticker.add(function(delta) {
    // bunny.rotation += 0.1 * delta;
});
// var tt = root.addChild(new PIXI.Graphics())
//     .beginFill(0x990000)
//     .drawCircle(200, 200, 70);

var box = root.addChild(new PIXI.particles.ParticleContainer(20, {
    scale: true,
    position: true,
    rotation: true,
    alpha: true
}));

var particleTextures = new PIXI.Texture.fromImage('./art/hole.png');
var vacant = [];
var spark;

chief = root.addChild(new PIXI.Sprite(PIXI.Texture.fromImage('./art/iam.jpg')));
chief.anchor.set(0.5);
chief.scale.set(0.1);


box.position.set(400);
for (let i = 0; i < 15; i++) {
    spark = new PIXI.Sprite(particleTextures);
    spark.anchor.set(0.5);
    vacant.push(spark);
}
var ungle = 0;

app.ticker.add(function(delta) {
    ungle += 0.01;
    var xx = 300 * Math.cos(ungle);
    var yy = 300 * Math.sin(ungle);
    chief.position.set(400 + xx, 400 + yy);
    if (Math.random()< 0.1 && vacant.length) {
        spark = vacant.shift();
        var dir = Math.PI * 2 * Math.random();
        var speed = 1 + Math.random() * 1;
        spark.position.set(xx, yy);
        spark.dx = speed * Math.cos(dir);
        spark.dy = speed * Math.sin(dir);
        spark.life = 0.01 + Math.random() * 0.02;
        spark.alpha = 1;
        spark.scale.set(0.7 + Math.random() * 0.4);
        box.addChild(spark);
    }
    for (let i = 0; i < box.children.length; i++) {
        spark = box.getChildAt(i);
        spark.scale.set(spark.scale.x - spark.life);
        if (spark.scale.x < 0.3) {
            vacant.push(box.removeChild(spark));
        } else {
            spark.alpha -= 0.02;
            spark.x += spark.dx;
            spark.y += spark.dy;
        }
    }
});

