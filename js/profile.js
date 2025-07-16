import { tg } from "./common.js";

const form  = document.getElementById("profile-form");
const phone = document.getElementById("phone");

// Кнопка «← Назад»
document.getElementById("profile-back").onclick = () => {
  window.location.href = "index.html";
};

// Подставляем телефон, если он в localStorage
const stored = localStorage.getItem("user_phone");
if (stored) {
  phone.value = stored;
}

// Отправка формы
form.onsubmit = (e) => {
  e.preventDefault();

  const data = {
    type: "profile_update",   // должен совпадать с тем, что обрабатывает бот
    payload: {
      first_name:  document.getElementById("first-name").value,
      last_name:   document.getElementById("last-name").value,
      patronymic:  document.getElementById("profile-patronymic").value,
      phone:       phone.value,
      email:       document.getElementById("email").value,
    },
  };

  // Сохраняем телефон локально на будущее
  localStorage.setItem("user_phone", data.payload.phone);

  // Шлём боту
  tg.sendData(JSON.stringify(data));

  // Закрываем WebApp и возвращаемся в чат
  tg.close();
};
