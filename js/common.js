// Общая инициализация, импортируется в каждом модуле
window.Telegram.WebApp.ready();
const tg = window.Telegram.WebApp;
export { tg };
// static/js/common.js

// Базовый URL вашего API (меняйте на продовый, когда заведёте бэкенд в облаке)
export const API_BASE = "http://localhost:8000";

// Объект Telegram.WebApp
export const tg = window.Telegram.WebApp;
