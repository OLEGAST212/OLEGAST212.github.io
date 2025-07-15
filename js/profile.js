import { tg } from './common.js';

const form  = document.getElementById('profile-form');
const phone = document.getElementById('phone');

// Назад на главную
// back.onclick = () => window.location.href = 'index.html';

document.getElementById('profile-back').onclick = () => {
  // перейти на profile.html
  // window.location.href = 'index.html';
  alert('Клик работает');
};

// Подставляем телефон из localStorage (или tg.initData, если передаёте через бота)
const stored = localStorage.getItem('user_phone');
if (stored) phone.value = stored;

// Отправка формы
form.onsubmit = e => {
  e.preventDefault();
  const data = {
    first_name:  document.getElementById('first-name').value,
    last_name:   document.getElementById('last-name').value,
    patronymic:  document.getElementById('patronymic').value,
    phone:       phone.value,
    email:       document.getElementById('email').value,
  };
  localStorage.setItem('user_phone', data.phone);
  tg.sendData(JSON.stringify({ type:'profile', payload:data }));
  tg.close();
};
