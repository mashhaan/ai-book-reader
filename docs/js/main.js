// ===== Тема (світла/темна) =====
(function () {
  const KEY = "abr-theme";
  const saved = localStorage.getItem(KEY);
  if (saved === "dark") document.body.classList.add("dark");

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const sync = () => {
      btn.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
      btn.setAttribute(
        "aria-label",
        document.body.classList.contains("dark") ? "Світла тема" : "Темна тема"
      );
    };
    sync();
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem(KEY, document.body.classList.contains("dark") ? "dark" : "light");
      sync();
    });
  });
})();

// ===== Бургер-меню =====
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("navMenu");
  if (!burger || !navMenu) return;

  const close = () => {
    navMenu.classList.remove("nav-open", "open");
    burger.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
  };

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    const opened = navMenu.classList.toggle("nav-open");
    navMenu.classList.toggle("open", opened);
    burger.classList.toggle("active", opened);
    burger.setAttribute("aria-expanded", String(opened));
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.classList.contains("nav-open")) return;
    if (!navMenu.contains(e.target) && !burger.contains(e.target)) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  navMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
});

// ===== Плавна прокрутка по якорях =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
});

// ===== Кнопка "вгору" =====
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.id = "scrollTopBtn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Догори");
  btn.textContent = "↑";
  document.body.appendChild(btn);

  const onScroll = () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ===== Динамічні картки переваг (index.html) =====
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("js-features");
  if (!root) return;

  const items = [
    { icon: "⚡", title: "Швидкий старт", text: "Завантажте PDF та слухайте за лічені секунди." },
    { icon: "🧠", title: "Розумний AI", text: "Аналізує структуру тексту та фільтрує зайве." },
    { icon: "🎧", title: "Природний голос", text: "Озвучення з людською інтонацією та паузами." },
    { icon: "📶", title: "Офлайн-режим", text: "Слухайте улюблені книги без підключення." },
    { icon: "🔒", title: "Приватність", text: "Ваші документи залишаються лише з вами." },
    { icon: "🌍", title: "Багатомовність", text: "Підтримка популярних мов світу." },
  ];

  const heading = document.createElement("h2");
  heading.className = "section-title";
  heading.textContent = "Переваги (динамічно через JS)";
  root.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "js-features-grid";
  root.appendChild(grid);

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const card = document.createElement("article");
    card.className = "js-feature-card";

    const icon = document.createElement("div");
    icon.className = "js-feature-icon";
    icon.textContent = it.icon;

    const h3 = document.createElement("h3");
    h3.textContent = (i + 1) + ". " + it.title;

    const p = document.createElement("p");
    p.textContent = it.text;

    card.appendChild(icon);
    card.appendChild(h3);
    card.appendChild(p);

    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });

    grid.appendChild(card);
  }
});

// ===== Валідація форми контактів =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = (form.querySelector("#contact-name")?.value || "").trim();
    const email = (form.querySelector("#contact-email")?.value || "").trim();
    const topic = (form.querySelector("#contact-topic")?.value || "").trim();
    const message = (form.querySelector("#contact-message")?.value || "").trim();

    if (name.length < 2) {
      alert("Будь ласка, введіть ім'я (мінімум 2 символи).");
      return;
    }
    if (!emailRe.test(email)) {
      alert("Будь ласка, введіть коректну email-адресу.");
      return;
    }
    if (!topic) {
      alert("Будь ласка, оберіть тему звернення.");
      return;
    }
    if (message.length < 10) {
      alert("Повідомлення має містити щонайменше 10 символів.");
      return;
    }

    if (!confirm("Надіслати повідомлення?")) return;

    alert("Дякуємо, " + name + "! Ваше повідомлення надіслано.");
    form.reset();
  });
});

// ===== Годинник у шапці =====
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("clock");
  if (!el) return;
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const d = new Date();
    el.textContent =
      pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
  };
  tick();
  setInterval(tick, 1000);
});

// ===== Лічильник відвідувань =====
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("visitCounter");
  if (!el) return;
  const KEY = "abr-visits";
  const n = parseInt(localStorage.getItem(KEY) || "0", 10) + 1;
  localStorage.setItem(KEY, String(n));
  el.textContent = "Ви відвідали сторінку " + n + " разів.";
});
