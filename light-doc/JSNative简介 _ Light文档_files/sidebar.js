(function () {
    'use strict';
    var sidebarTopList = document.getElementsByClassName('sidebar-top');

    if (!sidebarTopList) return;
    for (var index = 0; index < sidebarTopList.length; index++) {
        sidebarTopList[index].addEventListener('click', function (e) {
            var sidebarList = this.nextSibling;
            sidebarList.classList.toggle('hide');
            var sidebarArrow = this.querySelector('.sidebar-arrow');
            sidebarArrow.classList.toggle('rotate')
        });

    }
}());
