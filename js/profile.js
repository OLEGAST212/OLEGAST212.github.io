import { tg } from "./common.js";
console.log("🛠 profile.js загружен");
// Ждём, пока страница подгрузится
document.addEventListener("DOMContentLoaded", () => {
  tg.ready();

  // Обработчик кнопки «Назад»
  const backBtn = document.getElementById("profile-back");
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Элементы формы
  const form = document.getElementById("profile-form");
  const phoneInput = document.getElementById("phone");

  // 1) Попробовать взять телефон из localStorage
  const stored = localStorage.getItem("user_phone");
  if (stored) {
    phoneInput.value = stored;
  } else {
    // 2) Попробовать взять из URL-параметра ?phone=
    const params = new URLSearchParams(window.location.search);
    const p = params.get("phone");
    if (p) {
      phoneInput.value = p;
      localStorage.setItem("user_phone", p);
    }
  }

  // Сабмит формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Собираем данные
    const payload = {
      first_name:  document.getElementById("first-name").value,
      last_name:   document.getElementById("last-name").value,
      patronymic:  document.getElementById("profile-patronymic").value,
      phone:       phoneInput.value,
      email:       document.getElementById("email").value,
    };

    // Сохраняем телефон локально
    localStorage.setItem("user_phone", payload.phone);

    // Отправляем в бота
    try {
      tg.sendData(JSON.stringify({
        type: "profile_update",
        payload
      }));

    } catch (err) {
      console.error("Ошибка при отправке данных:", err);
      alert("Не удалось отправить данные. Попробуйте ещё раз.");
    }
  });
});
