function renderCheckbox(dom, data) {
    var arr = data || [];
    var str = '';
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
        handleEvent(e, dom);
    }
}

function handleState(type) {
    var search = '';
    for (var key in type) {
        search = search + key + '=' + type[key];
    }
    var url = window.location.pathname + '?' + search;
    history.pushState(type, '', url);
}

function handleEvent(event, parent) {
    var type = parent.dataset.type;
    var val = event.target.value;
    var check = parent.querySelectorAll('input');
    var checkArr = [];
    if (val === 'all') {
        if (event.target.checked) {
            for (let j = 0; j < check.length; j++) {
                check[j].checked = true;
                if (check[j].value !== 'all') {
                    checkArr.push(check[j].dataset.text);
                }
            }
            checkedType[type] = checkArr;
            handleState(checkedType);
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
        handleState(checkedType);
        renderTable(filterData());
        if (checkArr.length + 1 === check.length) {
            check[0].checked = true;
        } else {
            check[0].checked = false;
        }
    }
}