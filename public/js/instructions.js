let startButton = document.querySelector('.start-button');
startButton.addEventListener('click', (event) => {
  document.querySelector('.instructions').classList.add('hidden');
  document.querySelector('.game').classList.remove('hidden');
  fetchLevelData(level);
})