var common = {
    // 随机数
    getRandom: function (start, end) {
        return start + Math.round(Math.random() * (end - start));
    },
    // 角度
    getAngle: function (px, py, mx, my) { //获得起始点和终点连线，与y轴正半轴之间的夹角
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cos = y / z;
        var radina = Math.acos(cos); //用反三角函数求弧度
        var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度
        if (mx > px && my > py) { //鼠标在第四象限
            angle = 180 - angle;
        }
        if (mx == px && my > py) { //鼠标在y轴负方向上
            angle = 180;
        }
        if (mx > px && my == py) { //鼠标在x轴正方向上
            angle = 90;
        }
        if (mx < px && my > py) { //鼠标在第三象限
            angle = 180 + angle;
        }
        if (mx < px && my == py) { //鼠标在x轴负方向
            angle = 270;
        }
        if (mx < px && my < py) { //鼠标在第二象限
            angle = 360 - angle;
        }
        return angle;
    },
    // 制作长方形
    createRect: function (param) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var bgcolor = param.color || 'transparent';
        rect.setAttribute('x', param.x);
        rect.setAttribute('y', param.y);
        rect.setAttribute('width', param.width);
        rect.setAttribute('height', param.height);
        rect.setAttribute('fill', bgcolor);
        if (!param.bgcolor) {
            var lineWidht = param.strokeWidth || 1;
            var strokeColor = param.stroke || '#fff';
            rect.setAttribute('stroke', strokeColor);
            rect.setAttribute('stroke-width', lineWidht);
        }
        return rect;
    },
    // 创建线条
    createLine: function (start, end, color = '#fff') {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', start.x);
        line.setAttribute('x2', end.x);
        line.setAttribute('y1', start.y);
        line.setAttribute('y2', end.y);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', 1);
        return line;
    },
    // 创建圆
    createCircle: function (option) {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var color = option.stroke || '#fff';
        var fill = option.fill || 'transparent';
        circle.setAttribute('cx', option.x);
        circle.setAttribute('cy', option.y);
        circle.setAttribute('r', option.r);
        circle.setAttribute('fill', fill);
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-width', 1);
        return circle;
    },
    // 创建路径
    createPath: function (option) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        var x = option.x;
        var y = option.y;
        var r = parseInt(option.r);
        var des = ['M', x, y, 'A', r, r, 0, 0, 1, option.endX, option.endY];
        if (option.left) {
            des = ['M', x, y, 'A', r, r, 0, 0, 0, option.endX, option.endY];
        }
        path.setAttribute('x', x);
        path.setAttribute('y', y);
        path.setAttribute('d', des.join(' '));
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#fff');
        path.setAttribute('stroke-width', 1);
        return path;
    }
}