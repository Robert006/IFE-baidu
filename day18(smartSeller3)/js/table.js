function filterData() {
    // console.log(checkedType.region.indexOf)
    return sourceData.filter((item) => {
        return checkedType.region.indexOf(item.region) !== -1 && (checkedType.product.indexOf(item.product) !==
            -1);
    })
}

function renderTable(data) {
    var str = '<table><thead><tr><th>商品</th><th>地区</th>';
    for (let i = 1; i <= 12; i++) {
        str = str + '<th>' + i + '月' + '</th>';
    }
    str += '</tr></thead><tbody>';
    for (let j = 0; j < data.length; j++) {
        str = str + '<tr><td>' + data[j].product + '</td><td>' + data[j].region + '</td>';
        for (let k = 0; k < data[j].sale.length; k++) {
            str = str + '<td>' + data[j].sale[k] + '<i class="icon edit"></i></td>'
        }
        str += '</tr>';
    }
    str += '</tbody></table>';
    tableWrapper.innerHTML = str;
}