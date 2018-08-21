function renderCheckbox(dom, data) {
    var arr = data || [];
    var str = '';
    var type = dom.dataset.type;
    arr.unshift({
        value: 'all',
        text: '全选'
    });
    for (let i = 0; i < arr.length; i++) {
        str = str + '<label><input type="checkbox" data-text="' + arr[i].text + '" value="' + arr[i].value +
            '">' + arr[i].text + "</label>";
    }
    dom.innerHTML = str;
    dom.onclick = function (e) {
        if (!e.target.value) {
            return;
        }
        var val = e.target.value;
        var check = dom.querySelectorAll('input');
        var checkArr = [];
        if (val === 'all') {
            if (e.target.checked) {
                for (let j = 0; j < check.length; j++) {
                    check[j].checked = true;
                    if (check[j].value !== 'all') {
                        checkArr.push(check[j].dataset.text);
                    }
                }
                checkedType[type] = checkArr;
                renderTable(filterData());
            } else {
                for (let j = 0; j < check.length; j++) {
                    check[j].checked = false;
                }
            }
        } else {
            for (let j = 0; j < check.length; j++) {
                if (check[j].checked) {
                    if (check[j].value !== 'all') {
                        checkArr.push(check[j].dataset.text);
                    }
                }
            }
            checkedType[type] = checkArr;
            renderTable(filterData());
            if (checkArr.length + 1 === check.length) {
                check[0].checked = true;
            } else {
                check[0].checked = false;
            }
        }
    }
}