// Saves options to chrome.storage
function save_options() {
  var message = document.getElementById('message').value;
  chrome.storage.sync.set({
    message: message,
  }, () => {
    // Update status to let user know options were saved.
    const successMessage = document.getElementById('optionSaved');
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    message: 'Are you sure you want to merge this PR WITHOUT squashing your commits?',
  }, (items) => {
    document.getElementById('message').value = items.message;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);