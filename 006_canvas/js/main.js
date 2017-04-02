(function () {
    'use strict'

    var stage = document.getElementById('stage');
    var ctx;
    var WIDTH = 480;
    var HEIGHT = 260;
    var dpr;
    var isMoving = false;
    var isColor = false;
    var App;
    var app;

    var Robot;
    var robot;

    var Ground;
    var ground;

    var Mountain;
    var mountain;

    var Buil;
    var buil;

    var Sun;
    var sun;

    var Label;
    var label;


    var img = new Image();

    Ground = function () {
        this.draw = function () {
            ctx.fillStyle = '#dedede';
            ctx.fillRect(0, 150, WIDTH, HEIGHT - 150);
        };
    };

    Label = function () {
        this.draw = function () {
            ctx.beginPath();
            ctx.moveTo(100, 230);
            ctx.lineTo(400, 230);
            ctx.font = '15px Arial'
            ctx.fillStyle = '#444444';
            ctx.fillText('ロボット散歩中です・・・・・・・。', 100, 230, 200);

        };
    };


    Sun = function () {
        this.draw = function () {
            var g = ctx.createRadialGradient(420, 40, 0, 420, 40, 20);
            g.addColorStop(0.8, 'orange');
            g.addColorStop(1.0, 'yellow');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(420, 40, 20, 0, 2 * Math.PI);
            ctx.fill();
        };
    };

    Mountain = function (x, y) {
        this.x = x;
        this.y = y;
        this.draw = function () {
            var g = ctx.createLinearGradient(this.x, this.y - 50, this.x, this.y + 30);
            g.addColorStop(0.0, 'green');
            g.addColorStop(1.0, 'lightgreen');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + 80, this.y - 50);
            ctx.lineTo(this.x + 200, this.y);
            ctx.fill();

            this.x -= 0.2;
            if (this.x + 200 < 0) {
                this.x = WIDTH;
            }

        };
    };

    Buil = function (x, y) {
        this.x = x;
        this.y = y;
        this.draw = function () {
            ctx.fillStyle = '#C0C0C0';
            ctx.fillRect(this.x - 230, this.y - 70, 40, 590);
            ctx.fillStyle = '#808080';
            ctx.fillRect(this.x - 300, this.y - 50, 50, 590);
            ctx.fillStyle = '#D3D3D3';
            ctx.fillRect(this.x - 260, this.y - 20, 40, 590);

            this.x -= 0.2;
            if (this.x + 300 < 0) {
                this.x = WIDTH + 300;
            }

        };
    };

    Robot = function (x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.draw = function () {
            if (isColor) {
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(this.x, this.y, 35, 50);
                ctx.fillRect(this.x - 5, this.y - 30, 50, 30);
            } else {
                ctx.fillStyle = 'white';
                ctx.fillRect(this.x, this.y, 35, 50);
                ctx.fillRect(this.x - 5, this.y - 30, 50, 30);

            }
            //腕

            ctx.fillStyle = 'green';
            ctx.save();
            // ctx.rotate(45 * Math.PI / 180 * this.angle);
            ctx.fillRect(this.x + 7, this.y + 3, 15, 30);
            ctx.restore();
            //口
            ctx.fillRect(this.x + 30, this.y - 15, 15, 10);
            ctx.beginPath();
            // arc(x, y, r, start, end)
            ctx.arc(this.x + 30, this.y - 10, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'green'
            ctx.fill();
            //目
            ctx.arc(this.x + 30, this.y - 23, 4, 0, 6 * Math.PI);
            ctx.fillStyle = 'green'
            ctx.fill();
            //タイヤ
            ctx.beginPath();
            ctx.arc(this.x + 17, this.y + 60, 15, 0, 2 * Math.PI);
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,03)';
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 5;
            ctx.fillStyle = '#2F4F4F';
            ctx.fill();
            ctx.restore();
            //タイヤ　線
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.save();
            ctx.translate(this.x + 17, this.y + 60);
            ctx.rotate(Math.PI / 180 * this.angle);
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI / 180 * 75);
            ctx.stroke();
            ctx.restore();

            if (isMoving) {
                this.x += 2;
                this.angle += 5;
                if (this.x > WIDTH) {
                    this.x = -100;
                }
            }
        };
    };

    App = function () {
        this.setup = function () {
            if (typeof stage.getContext === 'undefined') {
                return;
            }
            //解像度
            ctx = stage.getContext('2d');
            dpr = window.devicePixelRatio || 1;

            stage.width = WIDTH * dpr;
            stage.height = HEIGHT * dpr;
            ctx.scale(dpr, dpr);
            stage.style.width = WIDTH + 'px';
            stage.style.height = HEIGHT + 'px';

        };
        this.draw = function () {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.fillStyle = ctx.createPattern(img, 'repeat');
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            sun.draw();
            buil.draw();
            mountain.draw();
            ground.draw();
            robot.draw();
            label.draw();
            setTimeout(function () {
                this.draw();
            }.bind(this), 10);

        }
    };

    img.src = 'img/sky.png';
    img.addEventListener('load', function () {
        robot = new Robot(100, 120);
        label = new Label();
        ground = new Ground();
        mountain = new Mountain(400, 150);
        buil = new Buil(400, 120);
        sun = new Sun();
        app = new App();
        app.setup();
        app.draw();

    });

    stage.addEventListener('click', function () {
        isMoving = !isMoving;
        isColor = !isColor;


    });
    function rand(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

})();