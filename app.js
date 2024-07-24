// Get the modals
var modal = document.getElementById("contactModal");
var videoModal = document.getElementById("videoModal");

// Get the buttons that open the modals
var contactBtns = document.querySelectorAll(".contact-us-btn");
var videoBtn = document.getElementById("videoBtn");

// Get the <span> elements that close the modals
var span = document.getElementsByClassName("close")[0];
var videoCloseSpan = videoModal.getElementsByClassName("close")[0];

// When the user clicks on the contact button, open the contact modal
contactBtns.forEach(function(btn) {
    btn.onclick = function() {
        modal.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the contact modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks on the video button, open the video modal
videoBtn.onclick = function() {
    videoModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Stop background scrolling
}

// When the user clicks on <span> (x), close the video modal
videoCloseSpan.onclick = function() {
    videoModal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable background scrolling
    var video = videoModal.querySelector('video');
    video.pause();
    video.currentTime = 0; // Reset the video
}

// When the user clicks anywhere outside of the modals, close them
window.onclick = function(event) {
    if (event.target == videoModal) {
        videoModal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable background scrolling
        var video = videoModal.querySelector('video');
        video.pause();
        video.currentTime = 0; // Reset the video
    } else if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Carousel functionality
var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'),
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning');

let timeRunning = 3000;
let timeAutoNext = 7000;

nextBtn.onclick = function(){
    showSlider('next');
}

prevBtn.onclick = function(){
    showSlider('prev');
}

let runTimeOut;

let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    runningTime.offsetHeight; /* trigger reflow */
    runningTime.style.animation = null;
    runningTime.style.animation = 'runningTime 7s linear 1 forwards';
}

function showSlider(type) {
    // Prevent sliding if video modal is open
    if (videoModal.style.display === "block") {
        return;
    }

    let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation(); // Reset the running time animation
}

// Start the initial animation 
resetTimeAnimation();

// Coming Soon button navigation
document.addEventListener('DOMContentLoaded', () => {
    const comingSoonButtons = document.querySelectorAll('.comingSoonBtn');

    comingSoonButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'coming-soon.html';
        });
    });
});
