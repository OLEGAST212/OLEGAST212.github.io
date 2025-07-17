// js/profile.js

import { tg } from "./common.js";

document.addEventListener("DOMContentLoaded", async () => {
  tg.ready();

  // Загрузка профиля
  const initData = Telegram.WebApp.initData;
  const resp = await fetch(`/api/profile?init_data=${encodeURIComponent(initData)}`);
  const profile = await resp.json();

  document.getElementById("first-name").value = profile.first_name || "";
  document.getElementById("last-name").value = profile.last_name || "";
  document.getElementById("profile-patronymic").value = profile.patronymic || "";
  document.getElementById("phone").value = profile.phone || "";
  document.getElementById("email").value = profile.email || "";

  // Кнопка «Назад»
  document.getElementById("profile-back").addEventListener("click", () => {
    // вернёмся на главную внутри WebApp
    if (tg.openLink) {
      tg.openLink("index.html");
    } else {
      window.history.back();
    }
  });

  // Сохранение
  document.getElementById("profile-form").addEventListener("submit", async e => {
    e.preventDefault();
    const payload = {
      init_data:  Telegram.WebApp.initData,
      first_name:  document.getElementById("first-name").value,
      last_name:   document.getElementById("last-name").value,
      patronymic:  document.getElementById("profile-patronymic").value,
      phone:       document.getElementById("phone").value,
      email:       document.getElementById("email").value,
    };
    await fetch("/api/profile", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload)
    });
    alert("✅ Профиль сохранён");
  });
});
