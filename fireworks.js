window.onload = function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    var explosion = [];
    var fireworks = [];


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


    //Fireworks {{

    function Firework() {
        this.x = W / 2;
        this.y = H;

        this.radius = 5;

        //Random number: Math.floor(Math.random() * (max - min + 1)) + min;
        //this.life = Math.floor(Math.random() * (900 - 500 + 1)) + 500;

        this.life = Math.floor(Math.random() * ( ((3 * H) / 4) - (H / 2) + 1)) + (H / 2);

        this.velocity = 10;
        this.angle = Math.floor(Math.random() * (320 - 250 + 1)) + 250;

    }

    Firework.prototype.draw = function() {


        if(this.life <= 0) {

            var tx = this.x;
            var ty = this.y;

            fireworks.pop();


            for(var i = 0; i < 20; i++) {
                explosion.push(new Explosion(tx, ty));
            }

            var temp = setInterval(function() {
                for(var i = 0; i < explosion.length; i++) {
                    var e = explosion[i];

                    e.draw();
                }

            }, 30);

            fireworks.push(new Firework());

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

        this.color = Math.floor(Math.random() * 360);

        this.radius = 5;

        this.angle = Math.random() * Math.PI * 2;

        //this.speed = 5;

        /*
        this.vx = this.speed * Math.cos(this.angle);
        this.vy = this.speed * Math.sin(this.angle);
        */

        this.vx = -20 + Math.random() * 40;
        this.vy = -20 + Math.random() * 40;//-20 + Math.abs(this.vx*(Math.random() * 20));

        this.gravity = 1;
    };

    Explosion.prototype.draw = function() {

        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;

        this.radius-= 0.1;

        var color = explosion[explosion.length - 1].color;

        /*
        ctx.globalCompositeOperation = 'lighter';
        var gradient = ctx.createRadialGradient(this.x, this.y, 0.1, this.x, this.y, this.radius);
        gradient.addColorStop(0.1, "rgba(255,255,255,1)");
        gradient.addColorStop(0.8, "hsla("+ color +", 100%, 50%, 1)");
        gradient.addColorStop(1, "hsla("+ color +", 100%, 50%, 0.1)");

        ctx.fillStyle = gradient;
        */

        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.arc(this.x, this.y, 5, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

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

    setInterval(draw, 30);

};
