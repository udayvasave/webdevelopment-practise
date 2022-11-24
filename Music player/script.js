var currentPlayingSongIndex = 0;
var repeatState = 0;
var progress = 0;

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let pause = document.getElementById("pausebtn");
let gif = document.getElementById("gif");
let repeatElement = document.getElementById("repeat");
let songTitle = document.getElementById("songTitle");
let albumArt = document.getElementById("albumArt");

let songItem = Array.from(document.getElementsByClassName("songItem"));
let songListPlayBtn = Array.from(
  document.getElementsByClassName("songListPlayBtn")
);
let masterPlay2 = document.getElementById("masterPlaySongListPLayBtn");

// let timeStamp = Array.from(document.getElementsByClassName("timeStamp"));

//REPEAT STATES
// {
//0 = repeatAll,
// 1 = repeatOne,
// 2 = repeatNone -not using
//}

let songs = [
  {
    songName: "Beetein Lamhein",
    filePath: "./assets/music/Beetein-Lamhein.mp3",
    coverPath: "./assets/cover/1.jpeg",
  },
  {
    songName: "Labon Ko",
    filePath: "./assets/music/Labon-Ko.mp3",
    coverPath: "./assets/cover/2.jpeg",
  },
  {
    songName: "Haan Tu Hai",
    filePath: "./assets/music/Haan-Tu-Hai.mp3",
    coverPath: "./assets/cover/3.jpg",
  },
  {
    songName: "Zara Si",
    filePath: "./assets/music/Zara-Si.mp3",
    coverPath: "./assets/cover/1.jpeg",
  },
  {
    songName: "Ajab Si",
    filePath: "./assets/music/Ajab-Si.mp3",
    coverPath: "./assets/cover/2.jpeg",
  },
  {
    songName: "Dil Ibadat",
    filePath: "./assets/music/Dil-Ibadat.mp3",
    coverPath: "./assets/cover/3.jpg",
  },
  {
    songName: "Kya Muze Pyaar",
    filePath: "./assets/music/Kya-Muze-Pyaar.mp3",
    coverPath: "./assets/cover/1.jpeg",
  },
  {
    songName: "Guzaarish",
    filePath: "./assets/music/Guzaarish.mp3",
    coverPath: "./assets/cover/2.jpeg",
  },
];

checkRepeatState(0);

// songs.forEach((k) => {
//   console.log(k);
// });

let audioElement = new Audio(songs[currentPlayingSongIndex].filePath);

//On load calculation
// audioElement.onloadedmetadata = function() {
//   //alert(audioElement.duration);
// };

function playNewSong() {
  console.log("Play new song");

  switch (repeatState) {
    case 0:
      console.log(songs.length);
      console.log(currentPlayingSongIndex);
      if (currentPlayingSongIndex == songs.length - 1) {
        currentPlayingSongIndex = 0;
      } else {
        currentPlayingSongIndex++;
      }

      audioElement = new Audio(songs[currentPlayingSongIndex].filePath);

      togglePlayBackState();
      break;
    case 1:
      togglePlayBackState();
      break;
    case 2:
      break;
  }

  // progress = 0;
  // myProgressBar.value = 0;
  console.log("here we will handle changing songs");
}

//Listening progress bar values on seeking song progress
-(
  //play pause click
  masterPlay.addEventListener("click", function () {
    togglePlayBackState();
  })
);

repeatElement.addEventListener("click", () => {
  if (repeatState == 2) {
    repeatState = 0;
  } else {
    repeatState++;
  }
  checkRepeatState();
});

myProgressBar.addEventListener("input", function () {
  var newTime = (myProgressBar.value * audioElement.duration) / 1000;
  audioElement.currentTime = newTime;
});

//Change playing to pause if already playing
//change pause to playing if already paused
//change song title and album art

function togglePlayBackState() {
  //change song title and album art
  songTitle.innerText = songs[currentPlayingSongIndex].songName;
  albumArt.src = songs[currentPlayingSongIndex].coverPath;
  audioElement.addEventListener("ended", () => {
    console.log("ended");
    masterPlay.src = "./Icons/Play.svg";
    playNewSong();
  });

  //Listening progress bar values on seeking song progress
  audioElement.addEventListener("timeupdate", () => {
    var totalSong = audioElement.duration;
    var currentTime = audioElement.currentTime;
    //console.log(currentTime)
    var seekToTime = (currentTime * 1000) / totalSong;
    myProgressBar.value = seekToTime;
  });

  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("play");
    masterPlay.classList.add("pause");
    masterPlay.src = "./Icons/Pause.svg";
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("pause");
    masterPlay.classList.add("play");
    masterPlay.src = "./Icons/Play.svg";
    gif.style.opacity = 0;
  }
}

//change the repeat state icon based on the repeat State variable
function checkRepeatState() {
  switch (repeatState) {
    case 0:
      repeatElement.src = "./Icons/repeat.svg";
      break;
    case 1:
      repeatElement.src = "./Icons/repeat-once.png";
      break;
    case 2:
      repeatElement.src = "./Icons/repeat-off.svg";
      break;
    default:
      repeatElement.src = "./Icons/repeat-off.svg";
  }
}

// Adding Song Titles & covers in the verticle song list(inside big container) from songs array

songItem.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
//                          adding duration
// songItem.forEach((element, i) => {
//   console.log(element, i);
//   element.getElementsByClassName("timeStamp")[0].innerText =
//     songs.filePath[i].duration;
// });

//               ***************Listening to play button in song list*************
//
//                                      ***TRY-1***

// const makeAllPlays = () => {
//   Array.from(document.getElementsByClassName("songListPlayBtn")).forEach(
//     (element) => {
//       element.remove((src = "./Icons/Pause.svg"));
//       element.classList.add("play");
//     }
//   );
// };

// Array.from(document.getElementsByClassName("songListPlayBtn")).forEach(
//   (element) => {
//     element.addEventListener("click", (e) => {
//       makeAllPlays();
//       e.target.classList.remove("play");
//       e.target.add((src = "./Icons/Pause.svg"));
//     });
//   }
// );

//                             ***TRY-2***

songListPlayBtn.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element);
    const svgIconPlay = (masterPlay2.src = "./Icons/Play.svg");
    const svgIconPause = (masterPlay2.src = "./Icons/Pause.svg");
    // console.log(svgIconPause, svgIconPlay);
    if (element === svgIconPlay) {
      element.add(svgIconPause);
    } else if (element === svgIconPause) {
      element.add(svgIconPlay);
    }
  });
});
//                              ***TRY-3****

// songListPlayBtn.forEach((element) => {
//   element.addEventListener("click", (e) => {
//     console.log(e.target);
//     if (audioElement.paused || audioElement.currentTime <= 0) {
//       audioElement.play();
//       e.target.classList.remove("songListPlayBtn");
//       e.target.classList.add("pause");
//       masterPlay2.src = "./Icons/Pause.svg";
//     } else {
//       audioElement.pause();
//       e.target.classList.remove("pause");
//       e.target.classList.add("songListPlayBtn");
//       masterPlay2.src = "./Icons/Play.svg";
//     }
//   });
// });

//                                 ***TRY-4***

// const makeAllPlays = () => {
//   Array.from(document.getElementsByClassName("songListPlayBtn")).forEach(
//     (element) => {
//       // element.classList.remove("pause");
//       element.target.remove((masterPlay2.src = "./Icons/Pause.svg"));
//       element.classList.add("songListPlayBtn");
//     }
//   );
// };

// Array.from(document.getElementsByClassName("songListPlayBtn")).forEach(
//   (element) => {
//     element.addEventListener("click", (e) => {
//       makeAllPlays();
//       // songIndex = parseInt(e.target.id);
//       e.target.classList.remove("songListPlayBtn");
//       e.target.classList.add("pause");
//       e.target.masterPlay2.src = "./Icons/Pause.svg";
//     });
//   }
// );
