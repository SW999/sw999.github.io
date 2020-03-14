const d = document;
const $toggleMenu = d.querySelector('.menu-toggle');
const $title = d.querySelector('.title-section');
const isAndroid = /(android)/gi.test(navigator.userAgent);

if (isAndroid) {
  d.body.classList.add('os-android');
}

if ('ontouchstart' in window) {
  const onResize = () => document.body.height = window.innerHeight;

  window.addEventListener('resize', onResize);
  onResize();
}

$toggleMenu.addEventListener('click', () => {
  $toggleMenu.classList.toggle('on');
  $title.classList.toggle('hide');
  d.querySelector('.menu-section').classList.toggle('on');
  d.querySelector('nav ul').classList.toggle('hidden');
});
