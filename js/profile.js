// static/js/profile.js

import { tg, API_BASE } from "./common.js";

document.addEventListener("DOMContentLoaded", async () => {
  tg.ready();

  // 1) Получаем init_data
  const params   = new URLSearchParams(window.location.search);
  const initData = params.get("init_data") || tg.initData || "";
  if (!initData) {
    alert("Ошибка: нет init_data");
    return;
  }

  // 2) GET /api/profile
  const getUrl = `${API_BASE}/api/profile?init_data=${encodeURIComponent(initData)}`;
  const resp   = await fetch(getUrl);
  if (!resp.ok) {
    alert("Не удалось загрузить профиль");
    return;
  }
  const profile = await resp.json();

  // 3) Заполняем форму
  document.getElementById("first-name").value         = profile.first_name  || "";
  document.getElementById("last-name").value          = profile.last_name   || "";
  document.getElementById("profile-patronymic").value = profile.patronymic  || "";
  document.getElementById("phone").value              = profile.phone       || "";
  document.getElementById("email").value              = profile.email       || "";

  // 4) Кнопка “Назад”
  document.getElementById("profile-back").onclick = () => {
    // возвращаем на главную, передав init_data
    location.href = `index.html?init_data=${encodeURIComponent(initData)}`;
  };

  // 5) Сохранение через POST /api/profile
  document.getElementById("profile-form").addEventListener("submit", async e => {
    e.preventDefault();
    const payload = {
      init_data:  initData,
      first_name: document.getElementById("first-name").value,
      last_name:  document.getElementById("last-name").value,
      patronymic: document.getElementById("profile-patronymic").value,
      phone:      document.getElementById("phone").value,
      email:      document.getElementById("email").value,
    };
    const postUrl = `${API_BASE}/api/profile`;
    const saveResp = await fetch(postUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });
    if (!saveResp.ok) {
      alert("Не удалось сохранить профиль");
      return;
    }
    alert("✅ Профиль успешно сохранён");
  });
});
