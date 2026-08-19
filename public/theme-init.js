(function () {
  try {
    var m = document.querySelector('meta[name="theme-color"]');
    if (!m) return;
    var t =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (t === 'dark') m.setAttribute('content', '#09090b');
  } catch (_) {}
  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform))
      document.documentElement.classList.add('os-macos');
  } catch (_) {}
})();