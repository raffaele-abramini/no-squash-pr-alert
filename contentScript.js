(() => {
  const mergeWithoutSquashButton = document.querySelector('.btn-group-merge .js-details-target');
  const message = "Are you sure you want to merge this PR WITHOUT squashing your commits?";

  if (!mergeWithoutSquashButton) {
    return;
  }

  mergeWithoutSquashButton.addEventListener("click", (e) => {
    if (!window.confirm(message)) {
      e.stopImmediatePropagation();
    }
  });
})();