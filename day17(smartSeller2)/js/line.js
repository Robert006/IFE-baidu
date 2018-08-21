function drawAxis(ctx) {
    ctx.beginPath();
    ctx.moveTo(30, 30);
    ctx.lineTo(30, 330);
    ctx.lineTo(630, 330);
    ctx.strokeStyle = '#000';
    ctx.stroke();
}
// var max = Math.max.call(data.sale);
function drawLine(ctx, data) {
    var config = {
        gap: 50,
        point: {
            radius: 3
        },
        color: 'blue',
    };
    if (ctx.clear) {
        ctx.clearRect(0, 0, line.width, line.height);
    }
    config.color = randomColor();
    ctx.beginPath();
    // var max = Math.max.apply(null, data);
    var scale = (300 / 710).toFixed(5);
    for (let i = 0; i < data.length; i++) {
        var x = 30 + i * config.gap;
        var y = 330 - parseInt(data[i] * scale);
        if (i - 1 >= 0) {
            ctx.moveTo(x, y);
            var dx = 30 + (i - 1) * config.gap;
            var dy = 330 - parseInt(data[i - 1] * scale);
            ctx.lineTo(dx, dy);
        }
        ctx.strokeStyle = config.color;
        ctx.stroke();
        ctx.moveTo(x, y);
        ctx.arc(x, y, config.point.radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = config.color;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
}

function randomColor() {
    var color = 'rgb(' + randomNumber(0, 255) + ',' + randomNumber(0, 255) + ',' + randomNumber(0, 255) + ')';
    return color;
}

function randomNumber(start, end) {
    return start + Math.round(Math.random() * (end - start));
}