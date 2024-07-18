// Get the modal
var modal = document.getElementById("contactModal");

// Get the buttons that open the modal
var contactBtns = document.querySelectorAll(".contact-us-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
contactBtns.forEach(function(btn) {
    btn.onclick = function() {
        modal.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
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

// Handle email subscription form submission
document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');

    emailForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: '00082c6d-2c8f-4230-b9db-0aebfbb3f319', 
                email: email,
                subject: 'New Subscriber',
                from_name: 'Loadstone',
                from_email: 'ernest@edhost.co.za',  
                redirect: ''  
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.success) {
                alert('Thank you for subscribing!');
                emailForm.reset();  
                modal.style.display = "none";  
            } else {
                alert('There was an error. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error. Please try again.');
        });
    });
});
