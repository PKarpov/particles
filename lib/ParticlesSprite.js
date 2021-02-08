/**
 * Спрайт-контейнер для системы частиц
 * textures - массив текстур для системы
 * system - система (json)
 * Напрямую создавать инстанс не рекомендуется. Используйте ParticlesSprite.create для правильной работы и автоапдейтов.
 */

function ParticlesSprite(textures, system) {
    Sprite.call(this);

    this.emitter = new PIXI.particles.Emitter(this, textures, system);
    this.emitter.emit = true;
}

ParticlesSprite.prototype = Object.create(Sprite.prototype);

ParticlesSprite.pool = [];

ParticlesSprite.create = function(textures, system) {
    var view = new ParticlesSprite(textures, system);
    ParticlesSprite.pool.push(view);
    return view;
};

ParticlesSprite.destroy = function(view) {
    var ix = ParticlesSprite.pool.indexOf(view);
    if(ix >= 0) ParticlesSprite.pool.splice(ix, 1);
};

ParticlesSprite.update = function(delta) {
    for(var i=0; i<ParticlesSprite.pool.length; i++) {
        var view = ParticlesSprite.pool[i];
        view.emitter.update(delta / 1000);
    }
};