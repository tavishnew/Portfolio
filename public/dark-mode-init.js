// Dark mode + OS detection init (runs before React hydration)
try {
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    var isDark = localStorage.theme === 'dark' ||
      ((!('theme' in localStorage) || localStorage.theme === 'system') &&
       window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      meta.setAttribute('content', '#09090b');
    }
  }
} catch (_) {}

try {
  if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
    document.documentElement.classList.add('os-macos');
  }
} catch (_) {}