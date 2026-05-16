const myPlaylist = [
    "SENOPHOTO2.jpeg",
    "SENOPHOTO1.jpeg",
    "SENOPHOTO7.jpg",
    "SENOVID4.mp4",
    "SENOPHOTO4.jpg",
    "SENOPHOTO6.jpg",
    "SENOPHOTO5.jpeg",
    "SENOPHOTO3.jpeg",
    "SENOPHOTO8.jpg",
    "SENOVID2.mp4",
    "SENOPHOTO12.jpeg",
    "SENOPHOTO11.jpeg",
    "SENOPHOTO13.mp4", // Note: If this is a video, our script will handle it perfectly!
    "SENOPHOTO15.jpeg",
    "SENOPHOTO14.jpeg",
    "SENOPHOTO10.jpeg",
    "SENOPHOTO9.jpeg", // Double check if your folder has a '0' here (e.g., SENOPHOTO09)
    "SENOVID1.mp4"
];

let currentMediaIndex = 0;
let imageTimeout;

document.getElementById('main-profile').addEventListener('click', function() {
    const sound = document.getElementById('tudum-sound');
    const profileScreen = document.getElementById('profile-screen');
    const videoScreen = document.getElementById('video-screen');

    sound.play().catch(e => console.log("Audio play deferred:", e));

    profileScreen.style.transform = "scale(1.2)";
    profileScreen.classList.add('hidden');

    setTimeout(() => {
        videoScreen.classList.remove('hidden');
        loadMedia(currentMediaIndex);
    }, 600);
});

function loadMedia(index) {
    const videoPlayer = document.getElementById('main-video');
    const imagePlayer = document.getElementById('main-image'); 
    const currentFile = myPlaylist[index];
    
    clearTimeout(imageTimeout);

    // 1. Handle Photos
    if (currentFile.toLowerCase().endsWith('.jpeg') || currentFile.toLowerCase().endsWith('.jpg') || currentFile.toLowerCase().endsWith('.png')) {
        videoPlayer.style.display = "none"; 
        videoPlayer.pause();
        
        imagePlayer.src = currentFile;
        imagePlayer.style.display = "block"; 

        imageTimeout = setTimeout(nextMedia, 4000); // Plays photo for 4 seconds
    } 
    // 2. Handle Videos
    else {
        imagePlayer.style.display = "none";
        imagePlayer.src = "";
        
        videoPlayer.style.display = "block"; 
        videoPlayer.src = currentFile;
        videoPlayer.muted = true; // Required to bypass browser autoplay blocks
        
        videoPlayer.play()
            .then(() => {
                videoPlayer.muted = false; // Unmutes once playing smoothly
            })
            .catch(error => {
                console.error("Playback issue:", error);
            });
    }
}

function nextMedia() {
    currentMediaIndex++;
    if (currentMediaIndex >= myPlaylist.length) {
        currentMediaIndex = 0; // Loops back to the start of the playlist
    }
    loadMedia(currentMediaIndex);
}

// Listens for the video to finish naturally to trigger the next media item
document.getElementById('main-video').addEventListener('ended', nextMedia);
