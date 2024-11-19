// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    const articles = document.querySelectorAll('#main .thumb');
    
    // Show loading spinner on page load
    document.getElementById('loading').style.display = 'block';

    // Load all images with a ripple effect
    articles.forEach((article, i) => {
        // Get element position
        const rect = article.getBoundingClientRect();
        const elementX = rect.left + (rect.width / 2);
        const elementY = rect.top + (rect.height / 2);
        
        // Calculate distance from center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distance = Math.sqrt(
            Math.pow(elementX - centerX, 2) + 
            Math.pow(elementY - centerY, 2)
        );
        
        // Delay based on distance from center
        const delay = distance * 0.5; // Adjust multiplier for speed
        
        setTimeout(() => {
            article.classList.add('visible');
        }, delay);
    });

    // Hide loading spinner when all images are loaded
    window.onload = function() {
        document.getElementById('loading').style.display = 'none';
    };
});

// Handle form submission
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Show loading state
    const submitButton = form.querySelector('input[type="submit"]');
    submitButton.value = 'Sending...';
    submitButton.disabled = true;

    // Send form data using Fetch API
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message!');
            form.reset();
        } else {
            alert('There was a problem with your submission.');
        }
    })
    .catch(error => {
        alert('There was a problem with your submission.');
    })
    .finally(() => {
        submitButton.value = 'Send';
        submitButton.disabled = false;
    });
});
