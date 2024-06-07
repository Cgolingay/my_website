function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total_duration');
let wave = document.getElementById('wave');
let random_icon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img:'images/sacrifice.jpg',
        name: 'Sacrifice (Eat Me Up)',
        artist: 'ENHYPEN',
        music: 'music/ENHYPEN 엔하이픈 Sacrifice Eat Me Up Color Coded Lyrics Eng Rom Han 가사.mp3'
    },

    {
        img:'images/lucifer.jpg',
        name: 'Lucifer',
        artist: 'ENHYPEN',
        music: 'music/Lucifer.mp3'
    },

    {
        img:'images/enhypen-fatal-trouble.jpeg',
        name: 'Fatal Trouble',
        artist: 'ENHYPEN',
        music: 'music/ENHYPEN Fatal Trouble Lyrics 엔하이픈 Fatal Trouble 가사 Color Coded Han_Rom_Eng ShadowByYoongi.mp3'
    }
]

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track = load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + "of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener(ended, nextTrack);
}

function reset() {
    curr_time.textContent = "0.00";
    total_duration.textContent = "0.00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    random_icon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    random_icon.classList.remove('randomActive');
}

function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i> ';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i> ';
}

function nextTrack(){

    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    } else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index; 
    } else {
        track_index = 0;
    }

    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    } else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        
    }
}   