// js/profile.js
import { tg } from "./common.js";

console.log("🛠 profile.js загружен");

document.addEventListener("DOMContentLoaded", () => {
  tg.ready();
  console.log("⚙️ WebApp готов");

  // Кнопка «Назад»
  const backBtn = document.getElementById("profile-back");
  backBtn.addEventListener("click", () => {
    console.log("🔙 Нажата кнопка Назад");
    window.location.href = "index.html";
  });

  // Поле телефона
  const phoneInput = document.getElementById("phone");
  const stored = localStorage.getItem("user_phone");
  if (stored) {
    phoneInput.value = stored;
  } else {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("phone");
    if (p) {
      phoneInput.value = p;
      localStorage.setItem("user_phone", p);
    }
  }

  // Отправка формы
  const form = document.getElementById("profile-form");
  form.addEventListener("submit", (e) => {
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

    console.log("📤 Отправка данных боту:", data);
    tg.sendData(JSON.stringify(data));
    // !!! Убираем tg.close(), чтобы окно не закрывалось !!!
  });
});
