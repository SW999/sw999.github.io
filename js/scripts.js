const d = document;
const $toggleMenu = d.querySelector('.menu-toggle');
const $title = d.querySelector('.title-section');

if ('ontouchstart' in window) {
  window.addEventListener('resize', () => {
    document.body.height = window.innerHeight;
  });
  window.onresize();
}

$toggleMenu.addEventListener('click', () => {
  $toggleMenu.classList.toggle('on');
  $title.classList.toggle('hide');
  d.querySelector('.menu-section').classList.toggle('on');
  d.querySelector('nav ul').classList.toggle('hidden');
});
