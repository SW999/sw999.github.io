const d = document;
const $toggleMenu = d.querySelector('.menu-toggle');

$toggleMenu.addEventListener('click', () => {
  $toggleMenu.classList.toggle('on');
  d.querySelector('.menu-section').classList.toggle('on');
  d.querySelector('nav ul').classList.toggle('hidden');
});
