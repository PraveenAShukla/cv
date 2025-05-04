document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links with adjusted offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset accounting for fixed header
                const headerHeight = document.querySelector('.fixed-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight - 20, // Extra 20px for spacing
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active section on scroll with fixed header offset
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.fixed-header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.clientHeight;
            
            // Account for fixed header when detecting active section
            if (window.pageYOffset >= sectionTop - headerHeight - 50 && 
                window.pageYOffset < sectionTop + sectionHeight - headerHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Set the first nav item as active by default
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Remove the "Made in Framer" text/element if it exists
    const footerElements = document.querySelectorAll('footer, [class*="framer"], [class*="Framer"]');
    footerElements.forEach(element => {
        if (element.textContent.includes('Framer') || element.innerHTML.includes('Framer')) {
            element.style.display = 'none';
        }
    });
});
