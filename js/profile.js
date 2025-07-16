import { tg } from "./common.js";

document.addEventListener("DOMContentLoaded", async () => {
  tg.ready();

  // получили initData, запросили профиль
  const initData = Telegram.WebApp.initData;
  const resp = await fetch(`/api/profile?init_data=${encodeURIComponent(initData)}`);
  const profile = await resp.json();

  // заполняем поля
  {
    const map = {
      "first-name": profile.first_name,
      "last-name":  profile.last_name,
      "profile-patronymic": profile.patronymic,
      "phone":      profile.phone,
      "email":      profile.email
    };
    for (const [id, val] of Object.entries(map))
      if (val !== undefined) document.getElementById(id).value = val;
  }

  // Назад
  document.getElementById("profile-back").onclick = () => window.location.href = "index.html";

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
    alert("✅ Сохранено");
  });
});
