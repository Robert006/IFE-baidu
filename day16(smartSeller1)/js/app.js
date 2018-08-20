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

renderTable(sourceData);

renderCheckbox(regionFilter, regionArr);
renderCheckbox(productFilter, productArr)