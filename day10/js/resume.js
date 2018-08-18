window.addEventListener('scroll', function (evt) {
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var sidebar = document.querySelector('aside');
    var mainbody = document.querySelector('.main');
    if (scrollTop >= 300) {
        sidebar.className = 'fixed';
        mainbody.className = 'main fixed'
    } else {
        sidebar.className = '';
        mainbody.className = 'main'
    }
})
window.onload = function () {
    var h = new Date().getHours();
    var words = 'GOOD ';
    if (0 < h <= 10) {
        words += 'MORNING';
    } else if (10 < h <= 12) {
        words += 'NOON';
    } else if (12 < h <= 18) {
        words += 'AFTERNOON';
    } else if (18 < h <= 22) {
        words += 'EVENING';
    } else if (22 < h <= 23) {
        words += 'NIGHT';
    }
    document.getElementById('greeting').innerHTML = words;
    document.getElementById('more').onclick = function () {
        alert('那我就再多说一点吧，编程之外，我还喜欢阅读和健身。')
    }
}