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

    // Ensure elements have the transition class applied and start them as hidden (invisible)
    imagePlayer.classList.add('media-fade');
    videoPlayer.classList.add('media-fade');
    imagePlayer.classList.add('media-hidden');
    videoPlayer.classList.add('media-hidden');

    // 1. Handle Photos
    if (currentFile.toLowerCase().endsWith('.jpeg') || currentFile.toLowerCase().endsWith('.jpg') || currentFile.toLowerCase().endsWith('.png')) {
        videoPlayer.style.display = "none"; 
        videoPlayer.pause();
        
        imagePlayer.src = currentFile;
        imagePlayer.style.display = "block"; 
        
        // Let the browser register the source change, then gently fade it in
        setTimeout(() => {
            imagePlayer.classList.remove('media-hidden');
        }, 50);

        // Play photo for 4 seconds, then trigger the smooth fade-out transition
        imageTimeout = setTimeout(triggerFadeOut, 4000);
    } 
    // 2. Handle Videos
    else {
        imagePlayer.style.display = "none";
        imagePlayer.src = "";
        
        videoPlayer.style.display = "block"; 
        videoPlayer.src = currentFile;
        videoPlayer.muted = true; 
        
        videoPlayer.play()
            .then(() => {
                videoPlayer.muted = false; 
                // Gently fade the video window in once playback begins smoothly
                videoPlayer.classList.remove('media-hidden');
            })
            .catch(error => {
                console.error("Playback issue:", error);
                // If video gets blocked, skip to next asset seamlessly
                triggerFadeOut();
            });
    }
}

// Step A: Make the active media layer melt away cleanly
function triggerFadeOut() {
    const videoPlayer = document.getElementById('main-video');
    const imagePlayer = document.getElementById('main-image');

    imagePlayer.classList.add('media-hidden');
    videoPlayer.classList.add('media-hidden');

    // Step B: Wait exactly 800ms for the fade-out transition to complete before calculating the next index
    setTimeout(nextMedia, 800);
}

function nextMedia() {
    currentMediaIndex++;
    if (currentMediaIndex >= myPlaylist.length) {
        currentMediaIndex = 0; // Loop back around to the beginning cleanly
    }
    loadMedia(currentMediaIndex);
}

// Instead of cutting instantly when a video ends, fade it out smoothly first!
document.getElementById('main-video').removeEventListener('ended', nextMedia); // Clear any old direct bindings
document.getElementById('main-video').addEventListener('ended', triggerFadeOut);
