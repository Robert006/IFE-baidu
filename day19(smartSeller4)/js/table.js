function filterData() {
    // console.log(checkedType.region.indexOf)
    return sourceData.filter((item) => {
        return checkedType.region.indexOf(item.region) !== -1 && (checkedType.product.indexOf(item.product) !==
            -1);
    })
}

function renderTable(data) {
    // console.log(data)
    var rarr = checkedType.region.length;
    var parr = checkedType.product.length;
    var str = '<table><thead><tr><th>商品</th><th>地区</th>';
    if (rarr == 1 && parr > 1) {
        str = '<table><thead><tr><th>地区</th><th>商品</th>';
    }
    for (let i = 1; i <= 12; i++) {
        str = str + '<th>' + i + '月' + '</th>';
    }
    str += '</tr></thead><tbody>';
    if (parr == 1 && rarr > 1) {
        for (let j = 0; j < data.length; j++) {
            if (j == 0) {
                str = str + '<tr><td class="rows" rowspan="' + data.length + '">' + data[j].product +
                    '</td><td>' + data[j].region +
                    '</td>';
            } else {
                str = str + '<tr><td>' + data[j].region + '</td>';
            }
            for (let k = 0; k < data[j].sale.length; k++) {
                str = str + '<td>' + data[j].sale[k] + '</td>'
            }
            str += '</tr>';
        }
    } else if (rarr == 1 && parr > 1) {
        for (let j = 0; j < data.length; j++) {
            if (j == 0) {
                str = str + '<tr><td class="rows" rowspan="' + data.length + '">' + data[j].region +
                    '</td><td>' + data[j].product +
                    '</td>';
            } else {
                str = str + '<tr><td>' + data[j].product + '</td>';
            }
            for (let k = 0; k < data[j].sale.length; k++) {
                str = str + '<td>' + data[j].sale[k] + '</td>'
            }
            str += '</tr>';
        }
    } else if (rarr > 1 && parr > 1) {
        data.sort((a, b) => {
            return a.product > b.product ? 1 : -1;
        }); //数据分类排序
        var flag = data[0].product;
        var count = 0;
        for (let i = 0; i < data.length; i++) {
            delete data[i].count
            if (flag !== data[i].product) {
                flag = data[i].product;
                data[i - count].count = count;
                count = 1;
            } else {
                count++;
            }
        }
        data[data.length - count].count = count; //处理最后一个
        for (let j = 0; j < data.length; j++) {
            if (data[j].count) {
                str = str + '<tr><td class="rows" rowspan="' + data[j].count + '">' + data[j].product +
                    '</td><td>' + data[j]
                    .region + '</td>';
            } else {
                str = str + '<tr><td>' + data[j].region + '</td>';
            }
            for (let k = 0; k < data[j].sale.length; k++) {
                str = str + '<td>' + data[j].sale[k] + '</td>'
            }
            str += '</tr>';
        }
    } else if (rarr === 1 && parr === 1) {
        for (let j = 0; j < data.length; j++) {
            str = str + '<tr><td>' + data[j].product + '</td><td>' + data[j].region + '</td>';
            for (let k = 0; k < data[j].sale.length; k++) {
                str = str + '<td>' + data[j].sale[k] + '</td>'
            }
            str += '</tr>';
        }
    }

    str += '</tbody></table>';
    tableWrapper.innerHTML = str;
}