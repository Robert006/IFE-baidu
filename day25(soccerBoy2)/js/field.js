function FieldMaker(option) {
    var target = option.ele;
    var width = parseInt(option.ele.parentNode.offsetWidth);
    var scale = (width / 120).toFixed(2);
    target.setAttribute('width', width);
    target.setAttribute('height', scale * 80);
    var bg = common.createRect({
        x: 0,
        y: 0,
        width: width,
        height: scale * 80,
        color: option.bgcolor,
    });
    target.appendChild(bg);
    target.appendChild(common.createRect({
        x: 10 * scale,
        y: 10 * scale,
        width: width - 20 * scale,
        height: 60 * scale,
    })); //全场
    target.appendChild(common.createRect({
        x: 10 * scale,
        y: 20 * scale,
        width: 16 * scale,
        height: 40 * scale,
    })); //左罚球区
    target.appendChild(common.createRect({
        x: 10 * scale,
        y: 31 * scale,
        width: 6 * scale,
        height: 18 * scale,
    })); //左球门区
    target.appendChild(common.createRect({
        x: 8.5 * scale,
        y: 36 * scale,
        width: 1.5 * scale,
        height: 8 * scale,
    })); //左球门
    target.appendChild(common.createRect({
        x: width - 26 * scale,
        y: 20 * scale,
        width: 16 * scale,
        height: 40 * scale,
    })); //右罚球区
    target.appendChild(common.createRect({
        x: width - 16 * scale,
        y: 31 * scale,
        width: 6 * scale,
        height: 18 * scale,
    })); //右球门区
    target.appendChild(common.createRect({
        x: width - 10 * scale,
        y: 36 * scale,
        width: 1.5 * scale,
        height: 8 * scale,
    })); //右球门
    target.appendChild(common.createLine({
        x: 10 * scale + (width - 20 * scale) / 2,
        y: 10 * scale,
    }, {
        x: 10 * scale + (width - 20 * scale) / 2,
        y: 70 * scale,
    }, '#fff')); //中线
    target.appendChild(common.createCircle({
        x: width / 2,
        y: 40 * scale,
        r: 10 * scale,
        fill: 'transparent',
    })); //中圈
    target.appendChild(common.createPath({
        x: 26 * scale,
        y: 40 * scale - Math.sin(Math.PI / 6) * 2 * 8 * scale,
        r: 10 * scale,
        endX: 26 * scale,
        endY: 40 * scale + Math.sin(Math.PI / 6) * 2 * 8 * scale,
    })) //左罚球弧线
    target.appendChild(common.createPath({
        x: width - 26 * scale,
        y: 40 * scale - Math.sin(Math.PI / 6) * 2 * 8 * scale,
        r: 10 * scale,
        endX: width - 26 * scale,
        endY: 40 * scale + Math.sin(Math.PI / 6) * 2 * 8 * scale,
        left: true,
    })) //右罚球弧线
}


FieldMaker.prototype.draw = function () {
    return "success done";
}

FieldMaker.factory = function (type, option) {
    var constr = type,
        newfield;
    if (typeof FieldMaker[constr] !== "function") {
        throw {
            name: "Error",
            message: constr + "doesn't exist"
        }
    } else {
        if (typeof FieldMaker[constr].prototype.draw !== "function") {
            FieldMaker[constr].prototype = new FieldMaker(option);
        }
        newfield = new FieldMaker[constr]();
        return newfield;
    }
}

FieldMaker.Soccer = function () {
    this.name = 'soccer';
}