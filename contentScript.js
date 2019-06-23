const noSquashedPrAlertService = {
  defaultMessage: 'Are you sure you want to merge this PR WITHOUT squashing your commits?',
  message: undefined,
  domElements: {
    mergeButton: undefined,
    rebaseButton: undefined,
  },

  init() {
    this.domElements = {
      mergeButton: document.querySelector('.btn-group-merge button'),
      rebaseButton: document.querySelector('.btn-group-rebase button'),
    }
    this.getMessageFromConfig();
    this.addListeners();
  },

  addListeners() {
    const { mergeButton, rebaseButton } = this.domElements;
    if (mergeButton) {
      mergeButton.addEventListener('click', this.mergeAlertCb.bind(this), false);
    }
    if (rebaseButton) {
      rebaseButton.addEventListener('click', this.mergeAlertCb.bind(this), false);
    }
  },

  getMessageFromConfig() {
    chrome.storage.sync.get(['message'], (items) => {
      if (items.message) {
        this.message = items.message;
      } else {
        this.message = this.defaultMessage;
        chrome.storage.sync.set({ message: this.defaultMessage })
      }
    });
  },

  mergeAlertCb(e) {
    if (!window.confirm(this.message)) {
      e.stopImmediatePropagation();
    }
  },
};

noSquashedPrAlertService.init();