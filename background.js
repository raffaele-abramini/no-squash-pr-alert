(() => {
  const contextMenuId = 'webext-domain-permission-toggle:add-permission';
  const chromeManifest = chrome.runtime.getManifest();
  const extensionName = chromeManifest.name;
  const options = {
    title: `Enable ${extensionName} on this domain`,
    reloadOnSuccess: `Do you want to reload this page to apply ${extensionName}?`
  };

  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: contextMenuId,
      title: options.title,
      contexts: ['page_action', 'browser_action'],
      documentUrlPatterns: ['http://*/*', 'https://*/*']
    });
  });

  chrome.contextMenus.onClicked.addListener(
    ({ menuItemId }, { tabId, url }) => {
      if (menuItemId !== contextMenuId) {
        return;
      }

      chrome.permissions.request(
        {
          origins: [`${new URL(url).origin}/*`]
        },
        granted => {
          if (chrome.runtime.lastError) {
            console.error(`Error: ${chrome.runtime.lastError.message}`);
            alert(`Error: ${chrome.runtime.lastError.message}`);
          } else if (
            granted &&
            options.reloadOnSuccess &&
            confirm(options.reloadOnSuccess)
          ) {
            chrome.tabs.reload(tabId);
          }
        }
      );
    }
  );
})();