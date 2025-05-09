const videoButton = document.querySelector('.info_video_player_button');
const modal = document.getElementById('videoModal');
const closeBtn = document.getElementById('closeVideo');
const video = document.getElementById('projectVideo');

videoButton.addEventListener('click', () => {
  modal.style.display = 'flex';
  video.play();

  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
});

closeBtn.addEventListener('click', () => {
  video.pause();
  modal.style.display = 'none';
});