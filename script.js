
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
    const imageContainer = document.getElementById('main-image'); 
    const currentFile = myPlaylist[index];
    
    clearTimeout(imageTimeout);

    // Simple extension match checking
#main-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Centers the image perfectly */
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain; /* Ensures the whole photo fits without cropping */
    z-index: 1; /* Sits behind your text layout */
}

function nextMedia() {
    currentMediaIndex++;
    if (currentMediaIndex >= myPlaylist.length) {
        currentMediaIndex = 0;
    }
    loadMedia(currentMediaIndex);
}

document.getElementById('main-video').addEventListener('ended', nextMedia);
