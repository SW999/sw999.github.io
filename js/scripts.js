const d = document;
const $toggleMenu = d.querySelector('.menu-toggle');
const $title = d.querySelector('.title-section');
const userAgent = navigator.userAgent;

if (/(android|iphone)/gi.test(userAgent) && /(chrome|safari)/gi.test(userAgent)) {
  d.body.classList.add('mobile-slug');
}

$toggleMenu.addEventListener('click', () => {
  $toggleMenu.classList.toggle('on');
  $title.classList.toggle('hide');
  d.querySelector('.menu-section').classList.toggle('on');
  d.querySelector('nav ul').classList.toggle('hidden');
});
