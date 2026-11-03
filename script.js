/* ====================================================================
   FILE: script.js
   MANJUTECH - Interactive Functionality & Smooth Animations
   ==================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Set Current Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 1. Navbar Sticky & Scroll Behavior
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Navigation Highlight on Scroll
        highlightNavOnScroll();
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Highlight Active Nav Item on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavOnScroll() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // 4. Portfolio Filter System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 5. Portfolio Modal Detail View
    const modal = document.getElementById('portfolio-modal');
    const closeModal = document.getElementById('close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', () => {
            modalImg.src = button.getAttribute('data-img');
            modalTitle.textContent = button.getAttribute('data-title');
            modalDesc.textContent = button.getAttribute('data-desc');
            modal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // 6. Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !animated) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (target === 50 ? '+' : '%');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.ceil(current) + (target === 50 ? '+' : '%');
                    }
                }, 30);
            });
            animated = true;
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Run once on load

    // 7. Contact Form Submission Toast
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show Success Toast
        toast.classList.add('show');
        contactForm.reset();

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const categoryItems = document.querySelectorAll('.service-cat-item');
    const subPanels = document.querySelectorAll('.sub-panel');

    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            // Remove active state from all items
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Hide all sub-panels
            subPanels.forEach(panel => panel.classList.remove('active'));

            // Show corresponding right sub-panel
            const targetId = this.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('navContactForm');
    const successBox = document.getElementById('formSuccessMessage');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById('navSubmitBtn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Hide form and display success message
                    form.style.display = 'none';
                    successBox.style.display = 'flex';
                } else {
                    alert('Oops! There was a problem submitting your form.');
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert('Oops! Network error occurred.');
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const standaloneForm = document.getElementById('standaloneEnquiryForm');
    const standaloneSuccess = document.getElementById('standaloneSuccessBox');
    const standaloneReset = document.getElementById('standaloneResetBtn');

    if (standaloneForm) {
        standaloneForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById('standaloneSubmitBtn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(standaloneForm);

            try {
                const response = await fetch(standaloneForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    standaloneForm.style.display = 'none';
                    standaloneSuccess.style.display = 'flex';
                } else {
                    alert('Problem sending message. Please try again.');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert('Network error occurred.');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    if (standaloneReset) {
        standaloneReset.addEventListener('click', function () {
            standaloneForm.reset();
            standaloneForm.style.display = 'flex';
            standaloneSuccess.style.display = 'none';
            const submitBtn = document.getElementById('standaloneSubmitBtn');
            submitBtn.innerHTML = 'Submit Enquiry <i class="fa-solid fa-paper-plane"></i>';
            submitBtn.disabled = false;
        });
    }
});