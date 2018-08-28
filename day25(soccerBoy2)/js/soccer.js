var SingleSoccer = (function () {
    var instance = null;

    function Soccer(option) {
        var width = parseInt(svgNode.parentNode.offsetWidth);
        var scale = (width / 120).toFixed(2);
        var span = document.createElement('span');
        var rx = common.getRandom(10 * scale, width - 12 * scale);
        var ry = common.getRandom(10 * scale, 68 * scale);
        span.style.cssText =
            'position:absolute;background:url(img/soccer.png) center no-repeat;background-size:cover;border-radius:50%;';
        span.style.width = 1 * scale + 'px';
        span.style.height = 1 * scale + 'px';
        span.style.top = ry + 'px';
        span.style.left = rx + 'px';
        svgNode.parentNode.appendChild(span);
        if (option.initSpeed < 0 || option.direction < 0) {
            return false;
        }
        this.pos = {
            x: rx,
            y: ry,
            type: 'soccer'
        }
        this.direction = option.direction;
        this.initSpeed = option.initSpeed;
        this.run = function () {
            // 计算时间
            console.log(this.pos)
            var newPos = this.pos;
            var h = 68 * scale - newPos.y;
            var iSpeed = this.initSpeed;
            var iDirect = this.direction;
            var s;
            if (ACCEL < 0) {
                var dt = iSpeed / Math.abs(ACCEL);
                s = 1 / 2 * ACCEL * (Math.pow(dt, 2)) + iSpeed * dt;
            } else {
                s = h / Math.sin(iDirect / 180 * Math.PI);
            }
            if (h / Math.sin(iDirect / 180 * Math.PI) <= s) {
                s = h / Math.sin(iDirect / 180 * Math.PI);
            }
            var x = s * (Math.cos(iDirect / 180 * Math.PI));
            var delta = Math.pow(2 * iSpeed, 2) + 8 * ACCEL * s;
            // console.log(s)
            if (delta >= 0) {
                var t1 = (-2 * iSpeed + Math.sqrt(delta)) / (2 * ACCEL);
                var t2 = (-2 * iSpeed + Math.sqrt(delta)) / (2 * ACCEL);
                var t = t1 > t2 ? t1 : t2;
            }
            t = t.toFixed(2);
            // 判断方向
            var target = {};
            if (iDirect % 360 <= 90) { //1象限
                target.x = rx + x;
                target.y = ry + h;
            } else if (iDirect % 360 <= 180) { //2象限
                target.x = rx - x;
                target.y = ry + h;
            } else if (iDirect % 360 <= 270) { //3象限
                target.x = rx - x;
                target.y = ry - h;
            } else if (iDirect % 360 < 360) { //4象限
                target.x = rx + x;
                target.y = ry - h;
            }
            // var str = 'all cubic-bezier(0.78,0,1,1) ' + t + 's';
            // if (ACCEL > 0) {
            //     span.style.transition = 'all ' + t + 's cubic-bezier(0.78,0,1,1)';
            // } else {
            //     span.style.transition = 'all ' + t + 's cubic-bezier(0,0.78,1,1)';
            // }
            span.style.transition = 'all ' + t + 's cubic-bezier(0,0.78,1,1)';
            setTimeout(function () {
                newPos.x = target.x;
                newPos.y = target.y;
                span.style.top = target.y + 'px';
                span.style.left = target.x + 'px';
            }, 0)
        };
        this.getPos = function () {
            this.pos.x = span.offsetLeft - 10 * scale;
            this.pos.y = span.offsetTop - 10 * scale;
            return this.pos //足球位置
        };
        this.goals = function () {
            span.style.transition = 'all 3s cubic-bezier(0,0.78,1,1)';
            var door = [common.getRandom(8.5 * scale, 10 * scale), common.getRandom((width - 10 * scale), (width - 8.5 * scale))];
            var gx = door[common.getRandom(0, 1)];
            var gy = common.getRandom(36 * scale, 44 * scale);
            setTimeout((function () {
                this.x = gx;
                this.y = gy;
                span.style.top = gy + 'px';
                span.style.left = gx + 'px';
            }).bind(this), 0)
        }
    }
    return {
        getInstance: function (option) {
            if (!instance) {
                instance = new Soccer(option);
            }
            return instance;
        }
    }
})();