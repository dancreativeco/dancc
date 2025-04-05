// Add this code to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Optional validation
        contactForm.addEventListener('submit', function(event) {
            // Get form values for client-side validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation - this is optional since Formspree will also validate
            if (!name || !email || !subject || !message) {
                event.preventDefault();
                alert('Please fill in all required fields');
                return false;
            }
            
            // Form will automatically submit to Formspree
            // No need to prevent default or handle submission manually
            
            // You could add a loading indicator here if desired
            const submitButton = contactForm.querySelector('.submit-button');
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }
            
            // Note: Formspree will handle the redirect or thank you message
            // based on your Formspree settings
        });
    }
});