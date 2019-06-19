// const mergeWithoutSquashButton = document.querySelector('.btn-group-merge .js-details-target');
const mergeWithoutSquashButton = document.querySelector('.btn-group-merge .js-details-target');

mergeWithoutSquashButton.addEventListener("click", (e) => {
  if (!window.confirm("Are you sure you want to merge WITHOUT squashing your commits?")) {
    e.stopImmediatePropagation();
  }
});