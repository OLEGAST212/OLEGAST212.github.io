import { tg } from "./common.js";

const form  = document.getElementById("profile-form");
const phoneInput = document.getElementById("phone");

// 1) пытаемся взять из localStorage (если уже был заход)
const stored = localStorage.getItem("user_phone");
if (stored) {
  phoneInput.value = stored;
} else {
  // 2) иначе разбираем URL и сохраняем
  const params = new URLSearchParams(window.location.search);
  const p = params.get("phone");
  if (p) {
    phoneInput.value = p;
    localStorage.setItem("user_phone", p);
  }
}

// Обработчик сабмита формы
form.onsubmit = (e) => {
  e.preventDefault();

  const data = {
    type: "profile_update",
    payload: {
      first_name:  document.getElementById("first-name").value,
      last_name:   document.getElementById("last-name").value,
      patronymic:  document.getElementById("profile-patronymic").value,
      phone:       phoneInput.value,
      email:       document.getElementById("email").value,
    },
  };

  // Сохраняем в localStorage
  localStorage.setItem("user_phone", data.payload.phone);

  // Отправляем данные боту и закрываем WebApp
  tg.sendData(JSON.stringify(data));
  tg.close();
};
