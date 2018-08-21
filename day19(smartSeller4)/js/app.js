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

if (history.state) {
    checkedType = history.state;

}
renderTable(filterData());


renderCheckbox(regionFilter, regionArr);
renderCheckbox(productFilter, productArr);

// 改变多选选中状态
handleCheckState();

window.onpopstate = function (e) {
    checkedType = e.state;
    // 改变表格数据
    renderTable(filterData());
    // 改变多选选中状态
    handleCheckState();
}

function handleCheckState() {
    var ckregion = regionFilter.querySelectorAll('input');
    var ckproduct = productFilter.querySelectorAll('input');
    if (checkedType.region.length == 3) {
        ckregion[0].checked = true;
    }
    if (checkedType.product.length == 3) {
        ckproduct[0].checked = true;
    }
    for (var i = 1; i < ckregion.length; i++) {
        if (checkedType.region.indexOf(ckregion[i].dataset.text) !== -1) {
            ckregion[i].checked = true;
        }

    }
    for (var j = 1; j < ckproduct.length; j++) {
        if (checkedType.product.indexOf(ckproduct[j].dataset.text) !== -1) {
            ckproduct[j].checked = true;
        }
    }
}