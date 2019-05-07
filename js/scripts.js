const d = document;
const $toggleMenu = d.querySelector('.menu-toggle');
const $title = d.querySelector('.title-section');

$toggleMenu.addEventListener('click', () => {
  $toggleMenu.classList.toggle('on');
  $title.classList.toggle('hide');
  d.querySelector('.menu-section').classList.toggle('on');
  d.querySelector('nav ul').classList.toggle('hidden');
});
