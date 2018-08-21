var tableWrapper = document.getElementById('table-wrapper');
var save = document.getElementById('save');
var renderData = JSON.parse(localStorage.getItem('table')) || sourceData;
renderTable(renderData);

var inputs = document.querySelector('tbody').querySelectorAll('input');

inputs.forEach((item) => {
    item.onblur = function (e) {
        var val = e.target.value;
        if (!(+val) && val !== '0') {
            alert('请输入数字');
        }
    }
})
document.onclick = function (e) {
    if (e.target === save) {
        var tableDate = getTableData();
        renderTable(tableDate);
        saveTableData(tableDate);
    } else if (tableWrapper.dom) {
        tableWrapper.dom.innerHTML = tableWrapper.val;
    }
}
tableWrapper.onclick = function (e) {
    e.stopPropagation();
    if (e.target.nodeName.toLowerCase() === 'input') {
        return;
    }
    if (tableWrapper.dom && tableWrapper.dom.firstChild !== e.target) {
        tableWrapper.dom.innerHTML = tableWrapper.val;
    }

    tableWrapper.dom = e.target;
    tableWrapper.val = e.target.innerText;
    if (+tableWrapper.val || tableWrapper.val === '0') {
        var str = "<input type='text' value='" + tableWrapper.val +
            "'><i id='sure'>确定</i><i id='cancel'>取消</i>";
        e.target.innerHTML = str;
        // 绑定事件
        var ipt = e.target.querySelector('input');
        var isure = e.target.querySelector('#sure');
        var icancel = e.target.querySelector('#cancel');
        ipt.focus();
        icancel.onclick = function (e) {
            handleCancel();
        }
        isure.onclick = function () {
            handleSure();
        }
        ipt.onkeydown = function (e) {
            if (e.keyCode === 13) { //enter键
                handleSure();
            } else if (e.keyCode === 27) { //esc键
                handleCancel();
            } else {
                return
            }
        }

        function handleCancel() {
            tableWrapper.dom.innerHTML = tableWrapper.val;
        }

        function handleSure() {
            var newVal = ipt.value;
            if (!(+newVal) && newVal !== '0') {
                alert('请输入数字');
                return;
            } else {
                var upData = getTableData();
                renderTable(upData);
                saveTableData(upData);
            }
        }
    } else {
        return;
    }
}

function saveTableData(data) {
    var strData = JSON.stringify(data);
    localStorage.removeItem('table');
    localStorage.setItem('table', strData)
}

function getTableData() {
    var rows = tableWrapper.querySelector('tbody').querySelectorAll('tr');
    var data = [];
    for (let i = 0; i < rows.length; i++) {
        var cells = rows[i].querySelectorAll('td');
        var single = {
            sale: [],
        };
        for (let j = 0; j < cells.length; j++) {
            var text = cells[j].innerText || cells[j].firstChild.value;
            if (j === 0) {
                single.product = text;
            } else if (j === 1) {
                single.region = text;
            } else {
                if (parseInt(text) || text === '0') {
                    single.sale.push(parseInt(text));
                } else {
                    single.sale.push(cells[j].querySelector('input').value);
                }
            }
        }
        data.push(single);
    }
    return data;
}