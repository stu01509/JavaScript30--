// 定義元件
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

// 定義功能
function togglePlay(){
  
  if(video.paused){
    video.play();    
  }else{
    video.pause();    
  }
}

function changeIcon(){
  const icon = "";
  if(this.paused){
    toggle.textContent = "▌▌";
  }else{
    toggle.textContent = "►";
  }
}

function skip(){
  // console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function setRange(){
  video[this.name] = this.value;
  console.log(this.value);
  
}

function setProgress(){
  const percent = (video.currentTime / video.duration)*100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
  
}
// 功能綁定

video.addEventListener('click' , togglePlay);
video.addEventListener('play', changeIcon);
video.addEventListener('pause', changeIcon);
video.addEventListener('timeupdate', setProgress);

toggle.addEventListener('click' , togglePlay);


skipButtons.forEach(function(button){
  button.addEventListener('click', skip);
});

ranges.forEach(function(range){
  range.addEventListener('change', setRange);
  range.addEventListener('mousemove', setRange);
})

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', function(e){
  if(mouseDown){
    scrub(e);
  }
});
progress.addEventListener('mousedown', ()=> mouseDown = true);
progress.addEventListener('mouseup', ()=> mouseDown = false);