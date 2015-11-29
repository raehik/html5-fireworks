window.onload = function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;


    var fireworks = [];

    //requestAnimationFrame polyfill {{

    (function() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
              window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    //}}

    function resizeCanvas(e) {
        var nW = window.innerWidth;
        var nH = window.innerHeight;

        canvas.width = nW;
        canvas.height = nH;
    }

    window.addEventListener("resize", resizeCanvas);

    function rad(deg) {
        return deg * Math.PI / 180;
    }

    function pad(str, length, prefix) {
        while (str.length < length) {
            str = prefix + str;
        }

        return str;
    }


    //Fireworks {{

    function Firework() {
        this.explosions = [];
        this.x = W / 2;
        this.y = H;

        this.numberOfParticles = 27;

        this.radius = 4;
        this.color = "#" + (Math.random() * 0xffffff << 0).toString(16);

        //Random number: Math.floor(Math.random() * (max - min + 1)) + min;

        this.life = Math.floor(Math.random() * ( ((3 * H) / 4) - (H / 2) + 1)) + (H / 2);

        this.velocity = 10;
        this.angle = Math.floor(Math.random() * (320 - 250 + 1)) + 250;

    }

    Firework.prototype.draw = function() {


        if(this.life <= 0) {

            var tx = this.x;
            var ty = this.y;

            fireworks.pop();


            for(var i = 0; i < 100; i++) {
                this.explosions.push(new Explosion(tx, ty));
            }


            var that = this;

            setInterval(function() {
                for(var i = 0; i < that.explosions.length; i++) {
                    var e = that.explosions[i];

                    e.draw();
                }

            }, 30);

            fireworks.push(new Firework());

        }


        this.x += this.velocity * Math.cos(rad(this.angle));
        this.y += this.velocity * Math.sin(rad(this.angle));

        this.life -= 10;


        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();


    }

    //}}

    //Explosion {{

    function Explosion(x, y) {
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 10;

        this.color = Math.floor(Math.random() * 0xFFFFFF);
        this.hue = Math.floor(Math.random() * 360);

        this.alpha = 1;
        this.fade = 0;

        //this.shrink = Math.random() * 0.05 + 0.93;
        this.shrink = 0.93;

        this.radius = 10;

        this.speed = Math.cos(Math.random() * Math.PI / 2) * 15;
        this.angle = Math.random() * Math.PI * 2;

        this.resistance = 0.95;

        //this.speed = 5;


        this.vx = this.speed * Math.cos(this.angle);
        this.vy = this.speed * Math.sin(this.angle);


        /*
        this.vx = -20 + Math.random() * 40;
        this.vy = -20 + Math.random() * 40;//-20 + Math.abs(this.vx*(Math.random() * 20));
        */

        this.gravity = 0.2;

    };

    Explosion.prototype.draw = function() {
        this.vx *= this.resistance;
        this.vy *= this.resistance;

        this.vy += this.gravity;

        this.x += this.vx;
        this.y += this.vy;

        this.radius *= this.shrink;
        this.alpha -= this.fade;


        ctx.save();

        ctx.globalCompositeOperation = 'lighter';

        var gradient = ctx.createRadialGradient(this.x, this.y, 0.1, this.x, this.y, this.radius);
        gradient.addColorStop(0.1, "rgba(255,255,255,"+ this.alpha +")");
        gradient.addColorStop(0.8, "hsla("+ this.hue +", 100%, 50%, "+ this.alpha +")");
        gradient.addColorStop(1, "hsla("+ this.hue +", 100%, 50%, 0.1)");

        ctx.fillStyle = gradient;


        ctx.beginPath();
        //ctx.fillStyle = "#" + pad(this.color.toString(16), 6, "0");
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        ctx.restore();


    };

    //}}

    fireworks.push(new Firework());

    function draw() {

        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, W, H);

        for(var i = 0; i < fireworks.length; i++) {
            var f = fireworks[i];

            f.draw();
        }

        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);

};
