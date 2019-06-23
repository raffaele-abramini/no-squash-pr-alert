(() => {
  console.log('Non-squashed merge ALERT! is active');

  const mergeButton = document.querySelector('.btn-group-merge button');
  const rebaseButton = document.querySelector('.btn-group-rebase button');
  const message = 'Are you sure you want to merge this PR WITHOUT squashing your commits?';

  const mergeAlertCb = e => {
    if (!window.confirm(message)) {
      e.stopImmediatePropagation();
    }
  };

  if (!mergeButton) {
    mergeButton.addEventListener('click', mergeAlertCb, false);
  }
  if (!mergeButton) {
    rebaseButton.addEventListener('click', mergeAlertCb, false);
  }
})();