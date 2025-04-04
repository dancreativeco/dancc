document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a, .hero a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Sticky navigation
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
        
        // Reveal elements on scroll
        revealOnScroll();
    });
    
    // Reveal elements when they come into view
    function revealOnScroll() {
        const elements = document.querySelectorAll('.service-card, .about-content, .skills, .contact form');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Typing effect for hero headline
    const heroHeadline = document.querySelector('.hero h1');
    const text = heroHeadline.textContent;
    let count = 0;
    
    heroHeadline.textContent = '';
    
    function typeEffect() {
        if (count < text.length) {
            heroHeadline.textContent += text.charAt(count);
            count++;
            setTimeout(typeEffect, 70);
        }
    }
    
    setTimeout(typeEffect, 1000);
    
    
    const contactForm = document.querySelector('.contact form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
      
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name');
            return;
        }
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Please enter your email');
            return;
        }
        
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            return;
        }
        
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter your message');
            return;
        }
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        

        setTimeout(() => {
            contactForm.reset();
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            

            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitButton.disabled = false;
            }, 3000);
        }, 2000);
    });
    

    function showError(input, message) {
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const parent = input.parentElement;
        if (!parent.querySelector('.error-message')) {
            parent.appendChild(errorElement);
        }
        
        input.addEventListener('input', function() {
            input.classList.remove('error');
            const error = parent.querySelector('.error-message');
            if (error) {
                parent.removeChild(error);
            }
        });
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    

    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            color: var(--light);
            font-weight: 700;
        }
        
        nav a.active::after {
            width: 100%;
        }
        
        nav.sticky {
            background-color: var(--dark);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .service-card, .about-content, .skills, .contact form {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.visible, .about-content.visible, .skills.visible, .contact form.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .service-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .service-card:nth-child(4) {
            transition-delay: 0.6s;
        }
        
        input.error, textarea.error {
            border-color: #e74c3c;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            text-align: left;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 3rem;
        }
        
        .social-links a {
            color: var(--light);
            font-size: 1.5rem;
            transition: all 0.3s;
        }
        
        .social-links a:hover {
            color: var(--accent);
            transform: translateY(-5px);
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .service-card {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            text-align: center;
            transition: all 0.3s;
        }
        
        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .service-icon {
            font-size: 2.5rem;
            color: var(--accent);
            margin-bottom: 1.5rem;
        }
    `;
    
    document.head.appendChild(style);
    
    revealOnScroll();
});