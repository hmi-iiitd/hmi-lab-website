(() => {
  const form = document.getElementById("pub-filters");
  const list = document.getElementById("pub-list");
  const count = document.getElementById("pub-count");
  if (!form || !list) return;

  const items = Array.from(list.querySelectorAll("article.pub"));

  const apply = () => {
    const qEl = document.getElementById("pub-q");
    const yearEl = document.getElementById("pub-year");
    const kindEl = document.getElementById("pub-kind");
    const themeEl = document.getElementById("pub-theme");
    const q = (qEl && "value" in qEl ? String(qEl.value) : "").trim().toLowerCase();
    const year = yearEl && "value" in yearEl ? String(yearEl.value) : "";
    const kind = kindEl && "value" in kindEl ? String(kindEl.value) : "";
    const theme = themeEl && "value" in themeEl ? String(themeEl.value) : "";

    let visible = 0;
    for (const item of items) {
      const hay = [
        item.getAttribute("data-title") || "",
        item.getAttribute("data-authors") || "",
        item.getAttribute("data-venue") || "",
      ].join(" ");
      const show =
        (!q || hay.includes(q)) &&
        (!year || item.getAttribute("data-year") === year) &&
        (!kind || item.getAttribute("data-kind") === kind) &&
        (!theme || (item.getAttribute("data-themes") || "").includes(theme));
      item.hidden = !show;
      if (show) visible += 1;
    }
    if (count) {
      count.textContent = `${visible} publication${visible === 1 ? "" : "s"}`;
    }
  };

  form.addEventListener("input", apply);
  form.addEventListener("change", apply);
  const qInput = document.getElementById("pub-q");
  if (qInput) {
    qInput.addEventListener("input", apply);
    qInput.addEventListener("search", apply);
  }
})();
