
document.querySelectorAll(".dump-tabs").forEach((tabs) => {
  const buttons = tabs.querySelectorAll("[data-dump-tab]");
  const panels = tabs.parentElement.querySelectorAll("[data-dump-panel]");

  function activateTab(name) {
    buttons.forEach((button) => {
      const active = button.dataset.dumpTab === name;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.dumpPanel !== name;
    });
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.dumpTab);
    });

    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (index + direction + buttons.length) % buttons.length;

      buttons[next].focus();
      activateTab(buttons[next].dataset.dumpTab);
    });
  });
});
