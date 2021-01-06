$(document).ready(function () {

    var prevPage = sessionStorage.getItem('page') !== null ? sessionStorage.getItem('page') + ', ' : '';
    var currentPage = prevPage.split(', ');
    var lastPage = currentPage[currentPage.length - 2] + ' ' + currentPage[currentPage.length - 3];
    var rest = document.getElementById('restaurants_page');

    function getPage() {
        var reg = new RegExp('[^\/]+$', 'i');
        var page = reg.exec(window.location.href);
        return page ? page[0] : null;
    }

    if (lastPage == 'quest.html birthdays.html' || lastPage == 'quest birthdays.html') {
        $('#31, #32').parent().css('display', 'none');
    }

    if (!rest) {
        sessionStorage.setItem('page', prevPage + getPage());
    }
});
