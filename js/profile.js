import { tg } from "./common.js";

console.log("🛠 profile.js загружен");

document.addEventListener("DOMContentLoaded", () => {
  tg.ready();
  console.log("⚙️ WebApp готов");

  // Кнопка «Назад»
  document.getElementById("profile-back")
          .addEventListener("click", () => window.location.href = "index.html");

  // Поле телефона, Имя, Фамилия, Отчество, Email
  const fields = {
    first_name: document.getElementById("first-name"),
    last_name:  document.getElementById("last-name"),
    patronymic: document.getElementById("profile-patronymic"),
    phone:      document.getElementById("phone"),
    email:      document.getElementById("email"),
  };

  // 1) Сначала localStorage
  const storedPhone = localStorage.getItem("user_phone");
  if (storedPhone) {
    fields.phone.value = storedPhone;
  }

  // 2) Потом URL‑параметры (они перезапишут, если нужно)
  const params = new URLSearchParams(window.location.search);
  for (const key of ["first_name","last_name","patronymic","phone","email"]) {
    const v = params.get(key);
    if (v !== null) {
      fields[key].value = v;
      if (key === "phone") localStorage.setItem("user_phone", v);
    }
  }

  // Отправка формы
  document.getElementById("profile-form")
    .addEventListener("submit", e => {
      e.preventDefault();
      const payload = {
        first_name: fields.first_name.value,
        last_name:  fields.last_name.value,
        patronymic: fields.patronymic.value,
        phone:      fields.phone.value,
        email:      fields.email.value,
      };
      console.log("📤 Отправка данных боту:", payload);
      tg.sendData(JSON.stringify({
        type:    "profile_update",
        payload
      }));
      // tg.close();  // пока не закрываем, чтобы увидеть логи
    });
});
