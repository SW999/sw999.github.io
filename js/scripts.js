const d = document;
const $toggleMenu = d.querySelector('.menu-toggle');
const $title = d.querySelector('.title-section');
const isMobileDevice = /(iphone|ipod|ipad|android)/gi.test(navigator.userAgent);
const removeAddressBar = () => setTimeout(window.scrollTo(0, 1), 10);

if(isMobileDevice) {
  window.addEventListener('load', removeAddressBar, false);
  window.addEventListener('orientationchange', removeAddressBar, false);
}

$toggleMenu.addEventListener('click', () => {
  $toggleMenu.classList.toggle('on');
  $title.classList.toggle('hide');
  d.querySelector('.menu-section').classList.toggle('on');
  d.querySelector('nav ul').classList.toggle('hidden');
});
