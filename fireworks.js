window.onload = function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    var explosion = [];
    var fireworks = [];

    function rad(deg) {
        return deg * Math.PI / 180;
    }

    //Fireworks {{

    function Firework() {
        this.x = W / 2;
        this.y = H;

        this.radius = 5;

        //Random number: Math.floor(Math.random() * (max - min + 1)) + min;
        this.life = Math.floor(Math.random() * (200 - 100 + 1)) + 100;

        this.velocity = 10;
        this.angle = 300;

    }

    Firework.prototype.draw = function() {

        if(this.life <= 0) {

            for(var i = 0; i < 10; i++) {
                explosions.push(new Explosion(this.x, this.y));
            }

            for(var i = 0; i < explosions.length; i++) {
                var e = explosions[i];
                e.draw();
            }

            fireworks = [];

        }

        this.x += this.velocity * Math.cos(rad(this.angle));
        this.y += this.velocity * Math.sin(rad(this.angle));

        this.life -= 10;


        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
    }

    //}}

    //Explosion {{

    function Explosion(x, y) {
        this.x = x;
        this.y = y;

        this.w = 10;
        this.h = 10;

        this.radius = 5;

        this.vx = -5 + Math.random() * 10;
        this.vy = -15 + Math.random() * 10;
        this.gravity = 1;
    };

    Explosion.prototype.draw = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;

        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
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
    }

    var interval = setInterval(draw, 30)

};
