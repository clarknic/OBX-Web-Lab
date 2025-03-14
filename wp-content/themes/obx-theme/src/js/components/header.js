/**
 * Header functionality
 */

export default function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100; // Adjust this value to control when the floating effect starts

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add floating class when scrolled past threshold
        if (scrollTop > scrollThreshold) {
            header.classList.add('is-floating');
        } else {
            header.classList.remove('is-floating');
        }

        lastScrollTop = scrollTop;
    }

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
} 