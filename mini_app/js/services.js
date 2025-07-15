import { tg } from './common.js';

const list = document.getElementById('services-page');
const back = document.getElementById('services-back');

// Обработчики кнопок услуг
list.querySelectorAll('button[data-action]').forEach(btn => {
  btn.addEventListener('click', () => {
    const a = btn.dataset.action;
    switch (a) {
      case 'wallet': alert('Баланс: 0 ₽'); break;
      case 'shop':   window.open('https://shop.example.com','_blank'); break;
      case 'reviews':alert('Отзывы:\n– Отлично стригут!'); break;
      case 'about':  alert('О компании…'); break;
      case 'lang':   alert('Язык: Русский'); break;
    }
  });
});

// Кнопка «Назад»
back.onclick = () => {
  window.location.href = 'index.html';
};
