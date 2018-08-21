function renderBar(data) {
    var config = {
        width: 660,
        height: 360,
        barWidth: 30,
        gap: 15,
        barColor: 'lightblue',
        axisColor: 'black',
    };
    var barArea = document.getElementById('bar');
    bar.innerHTML = '';
    bar.style.width = config.width;
    bar.style.height = config.height;
    var Yaxis = createLine({
        x: 30,
        y: 30
    }, {
        x: 30,
        y: 330
    }, config.axisColor);
    var Xaxis = createLine({
        x: 29,
        y: 330
    }, {
        x: 600,
        y: 330
    }, config.axisColor);
    var bgLine = {
        start: {
            x: 29,
        },
        end: {
            x: 600,
        }
    }
    for (let j = 0; j < 5; j++) {
        bgLine.start.y = 330 - 50 * (j + 1);
        bgLine.end.y = 330 - 50 * (j + 1);
        barArea.appendChild(createLine(bgLine.start, bgLine.end, '#999'))
    }
    barArea.appendChild(Yaxis);
    barArea.appendChild(Xaxis);
    var setting = {
        width: config.barWidth,
        color: config.barColor,
    };
    var max = Math.max.apply(null, data);
    var scale;
    if (max > 300) {
        scale = (300 / max + 0.00005).toFixed(5);
    } else {
        scale = 1;
    }
    for (let i = 0; i < data.length; i++) {
        setting.x = 30 + (i + 1) * config.gap + config.barWidth * i;
        setting.y = 329 - parseInt(data[i] * scale);
        setting.height = parseInt(data[i] * scale);
        var rect = createRect(setting);
        barArea.appendChild(rect);
    }
}

function createLine(start, end, color) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute('x1', start.x);
    line.setAttribute('x2', end.x);
    line.setAttribute('y1', start.y);
    line.setAttribute('y2', end.y);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', 1);
    return line;
}

function createRect(param) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('x', param.x);
    rect.setAttribute('y', param.y);
    rect.setAttribute('width', param.width);
    rect.setAttribute('height', param.height);
    rect.setAttribute('fill', param.color);
    return rect;
}