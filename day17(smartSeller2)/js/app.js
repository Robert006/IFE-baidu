var regionFilter = document.getElementById('region-select');
var tableWrapper = document.getElementById('table-wrapper');
var productFilter = document.getElementById('product-select');
var regionArr = [{
    value: 1,
    text: "华东",
}, {
    value: 2,
    text: "华南",
}, {
    value: 3,
    text: "华北",
}];
var productArr = [{
    value: 1,
    text: "手机",
}, {
    value: 2,
    text: "笔记本",
}, {
    value: 3,
    text: "智能音箱",
}];
var checkedType = {
    region: ['华东', '华南', '华北'],
    product: ['手机', '笔记本', '智能音箱'],
};
var data = sourceData[0].sale;
var line = document.getElementById('line');
var ctx = line.getContext('2d');

renderTable(sourceData);

var tbody = document.querySelector('tbody');

renderBar(data);
drawAxis(ctx);
lineChart(sourceData);

tbody.onmouseover = function (e) {
    if (!e.target.className) {
        console.log();
        var rowsData = getRowsData(e);
        // console.log(dataArr)
        renderBar(rowsData);
        ctx.clear = true;
        drawLine(ctx, rowsData);
        drawAxis(ctx);
    }
}

tbody.onmouseout = function () {
    ctx.clear = false;
    lineChart(sourceData);
}

function getRowsData(event) {
    var arr = event.target.parentNode.querySelectorAll('td');
    var dataArr = [];
    for (let i = 0; i < arr.length; i++) {
        var num = parseInt(arr[i].innerHTML);
        if (num) {
            dataArr.push(num);
        }
    }
    return dataArr;
}

function lineChart(data) {
    for (let i = 0; i < data.length; i++) {
        drawLine(ctx, data[i].sale);
    }
}