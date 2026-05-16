
const myPlaylist = [
      "SENOPHOTO2.jpeg",
    "SENOPHOTO1.jpeg",
    "SENOPHOTO7.jpeg",
    "SENOVID4.mp4",
    "SENOPHOTO4.jpeg",
    "SENOPHOTO6.jpeg",
    "SENOPHOTO5.jpeg",
    "SENOPHOTO3.jpeg",
    "SENOPHOTO8.jpeg",
    "SENOVID2.mp4",
    "SENOPHOTO12.jpeg",
    "SENOPHOTO11.jpeg",
    "SENOPHOTO13.mp4",
    "SENOPHOTO15.jpeg",
    "SENOPHOTO14.jpeg",
    "SENOPHOTO10.jpeg",
    "SENOPHOTO9.jpeg",
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
    const imageContainer = document.getElementById('video-screen'); 
    const currentFile = myPlaylist[index];
    
    clearTimeout(imageTimeout);

    // Simple extension match checking
    if (currentFile.toLowerCase().endsWith('.jpeg') || currentFile.toLowerCase().endsWith('.jpg') || currentFile.toLowerCase().endsWith('.png')) {
        videoPlayer.style.display = "none"; 
        videoPlayer.pause();
        
        imageContainer.style.backgroundImage = `url('${currentFile}')`;
        imageContainer.style.backgroundSize = "cover";
        imageContainer.style.backgroundPosition = "center";

        imageTimeout = setTimeout(nextMedia, 4000);
    } else {
        imageContainer.style.backgroundImage = "none"; 
        videoPlayer.style.display = "block"; 
        
        videoPlayer.src = currentFile;
        videoPlayer.muted = true; // Force muted to guarantee browser layout playback authorization
        
        videoPlayer.play()
            .then(() => {
                videoPlayer.muted = false; // Safely toggle back audio track on successful render
            })
            .catch(error => {
                console.error("Playback error detail:", error);
                // Print the exact system path error right onto the layout text to diagnose filename typos instantly
                document.querySelector('.description').innerHTML = `Error opening file: <b>${currentFile}</b>. Check capitalization!`;
            });
    }
}

function nextMedia() {
    currentMediaIndex++;
    if (currentMediaIndex >= myPlaylist.length) {
        currentMediaIndex = 0;
    }
    loadMedia(currentMediaIndex);
}

document.getElementById('main-video').addEventListener('ended', nextMedia);