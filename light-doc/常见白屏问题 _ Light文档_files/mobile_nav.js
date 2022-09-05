(function() {
  'use strict';
  var html = document.getElementsByTagName('html')[0];
  var body = document.getElementsByTagName('body')[0];
  var navToggle = document.getElementById('mobile-nav-toggle');
  var dimmer = document.getElementById('mobile-nav-dimmer');
  var CLASS_NAME = 'mobile-nav-on';
  if (!navToggle) return;


  [].slice.call(document.querySelectorAll('table')).forEach(function (el) {
    var wrapper = document.createElement('div');
    wrapper.className = 'table-area';
    el.parentNode.insertBefore(wrapper, el);
    el.parentNode.removeChild(el);
    wrapper.appendChild(el);
  })


  //部分ios代码区字体过大
  var highlightFigure = document.querySelectorAll('figure.highlight')
  for (var index = 0; index < highlightFigure.length; index++) {
    var figure = highlightFigure[index];
    // var tr = figure.querySelector('tr');
    var td = figure.querySelector('td');
    // var table = figure.querySelector('div.table-area');
    var pre = td.children[0];
    var wrapper = document.createElement('div');
    wrapper.className = 'pre-area';
    figure.parentNode.insertBefore(pre, figure);
    figure.parentNode.removeChild(figure); 
  }
  

  navToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    html.style.overflow = 'hidden';
    body.classList.toggle(CLASS_NAME);
  });

  dimmer.addEventListener('click', function(e) {
    if (!body.classList.contains(CLASS_NAME)) return;
    e.preventDefault();
    html.style.overflow = 'auto';
    body.classList.remove(CLASS_NAME);
  });
}());
