document.addEventListener('DOMContentLoaded', function() {
    // Cache elements
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.fixed-header');
    
    // Calculate header height including padding
    function getHeaderHeight() {
        const style = window.getComputedStyle(header);
        return header.offsetHeight + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
    }
    
    // Smooth scrolling with proper offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = getHeaderHeight();
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = getHeaderHeight();
        const scrollPosition = window.pageYOffset + headerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
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
    
    // Set first nav item as active by default
    if (navLinks.length > 0 && window.location.hash === '') {
        navLinks[0].classList.add('active');
    }
    
    // Remove "Made in Framer" text if exists
    const footerElements = document.querySelectorAll('footer, [class*="framer"], [class*="Framer"]');
    footerElements.forEach(element => {
        if (/framer/i.test(element.textContent) || /framer/i.test(element.innerHTML)) {
            element.style.display = 'none';
        }
    });
});