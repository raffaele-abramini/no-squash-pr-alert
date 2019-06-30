const noSquashedPrAlertService = {
  defaultMessage: 'Are you sure you want to merge this PR WITHOUT squashing your commits?',
  message: undefined,
  domElements: {
    mergeButton: undefined,
    rebaseButton: undefined,
  },

  init() {
    this.domElements = [
      '.btn-group-merge .js-details-target',
      '.btn-group-rebase .js-details-target'
    ];

    this.getMessageFromConfig();
    this.addListeners();
  },

  addListeners() {
    document.addEventListener(
      'click',
      this.handleOnClick.bind(this),
      { capture: true }
    );
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

  handleOnClick(e) {
    this.domElements.forEach((elem) => {
      if (!e.target.matches(elem)) {
        return;
      }

      if (!window.confirm(this.message)) {
        e.stopImmediatePropagation();
      }
    });
  },
};

noSquashedPrAlertService.init();