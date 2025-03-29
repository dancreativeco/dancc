 // Initialize GSAP ScrollTrigger
 gsap.registerPlugin(ScrollTrigger);

 // Mobile Navigation Toggle
 const mobileNavToggle = document.getElementById('mobileNavToggle');
 const sidebar = document.getElementById('sidebar');

 mobileNavToggle.addEventListener('click', () => {
     mobileNavToggle.classList.toggle('active');
     sidebar.classList.toggle('active');
 });

 // Navigation Active State
 const navLinks = document.querySelectorAll('.nav-link');
 const sections = document.querySelectorAll('.section');

 window.addEventListener('scroll', () => {
     let current = '';

     sections.forEach(section => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.clientHeight;

         if (pageYOffset >= sectionTop - sectionHeight / 3) {
             current = section.getAttribute('id');
         }

     });

     navLinks.forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href').slice(1) === current) {
             link.classList.add('active');
         }
     });
 });

 // Close mobile menu when clicking a link
 navLinks.forEach(link => {
     link.addEventListener('click', () => {
         if (sidebar.classList.contains('active')) {
             sidebar.classList.remove('active');
             mobileNavToggle.classList.remove('active');
         }
     });
 });

 // Portfolio Filtering
 const filterButtons = document.querySelectorAll('.filter-btn');
 const portfolioItems = document.querySelectorAll('.portfolio-item');

 filterButtons.forEach(button => {
     button.addEventListener('click', () => {
         // Remove active class from all buttons
         filterButtons.forEach(btn => btn.classList.remove('active'));

         // Add active class to clicked button
         button.classList.add('active');

         const filterValue = button.getAttribute('data-filter');

         portfolioItems.forEach(item => {
             if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                 item.style.display = 'block';

                 // Animation for showing items
                 gsap.fromTo(item,
                     { opacity: 0, y: 20 },
                     { opacity: 1, y: 0, duration: 0.4 }
                 );
             } else {
                 item.style.display = 'none';
             }
         });
     });
 });

 // GSAP Animations
 window.addEventListener('load', () => {
     // Hero section animations
     gsap.from('.hero-title', {
         opacity: 0,
         y: 50,
         duration: 1,
         delay: 0.2
     });

     gsap.from('.hero-subtitle', {
         opacity: 0,
         y: 50,
         duration: 1,
         delay: 0.4
     });

     gsap.from('.cta-btn', {
         opacity: 1,
         y: 50,
         duration: 1,
         delay: 1
     });

     // Section animations
     gsap.utils.toArray('.section').forEach(section => {
         gsap.from(section.querySelector('.section-title'), {
             scrollTrigger: {
                 trigger: section,
                 start: "top 70%",
             },
             opacity: 0,
             y: 50,
             duration: 0.8
         });
     });

     // Service cards animation
     gsap.from('.service-card', {
         scrollTrigger: {
             trigger: '#services',
             start: "top 70%",
         },
         opacity: 0,
         y: 50,
         duration: 0.8,
         stagger: 0.2
     });

     // Portfolio items animation
     gsap.from('.portfolio-item', {
         scrollTrigger: {
             trigger: '#portfolio',
             start: "top 70%",
         },
         opacity: 0,
         y: 50,
         duration: 0.8,
         stagger: 0.2
     });

     // Testimonials animation
     gsap.from('.testimonial', {
         scrollTrigger: {
             trigger: '#testimonials',
             start: "top 70%",
         },
         opacity: 0,
         y: 50,
         duration: 0.8,
         stagger: 0.3
     });
 });