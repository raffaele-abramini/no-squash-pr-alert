(() => {
  console.log('Non-squashed merge ALERT! is active');

  const mergeButton = document.querySelector('.btn-group-merge button');
  const rebaseButton = document.querySelector('.btn-group-rebase button');
  const message = 'Are you sure you want to merge this PR WITHOUT squashing your commits?';

  if (!mergeButton) {
    return;
  }

  const mergeAlertCb = e => {
    if (!window.confirm(message)) {
      e.stopImmediatePropagation();
    }
  };

  mergeButton.addEventListener('click', mergeAlertCb, false);
  rebaseButton.addEventListener('click', mergeAlertCb, false);
})();