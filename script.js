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

    const mobileNavigation = window.matchMedia('(max-width: 960px)');
    const closeMobileMenu = () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.querySelectorAll('.nav-item.dropdown.active').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        });
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    };

    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            mobileToggle.setAttribute('aria-expanded', 'true');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            closeMobileMenu();
        }
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', event => {
            const dropdown = link.classList.contains('dropdown-toggle')
                ? link.closest('.nav-item.dropdown')
                : null;

            if (mobileNavigation.matches && dropdown) {
                event.preventDefault();
                const willOpen = !dropdown.classList.contains('active');
                navMenu.querySelectorAll('.nav-item.dropdown.active').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
                });
                dropdown.classList.toggle('active', willOpen);
                link.setAttribute('aria-expanded', String(willOpen));
                return;
            }

            closeMobileMenu();
        });
    });

    navMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && mobileNavigation.matches) {
            closeMobileMenu();
            mobileToggle.focus();
        }
    });

    mobileNavigation.addEventListener('change', event => {
        if (!event.matches) closeMobileMenu();
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

    if (modal && closeModal && modalImg && modalTitle && modalDesc) {
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
    }

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

    if (contactForm && toast) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonContent = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`Contact form submission failed with status ${response.status}`);
                }

                contactForm.reset();
                toast.textContent = 'Message sent successfully! We will contact you soon.';
            } catch (error) {
                toast.textContent = 'We could not send your message. Please try again or contact us directly.';
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonContent;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 4000);
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const categoryItems = document.querySelectorAll('.service-cat-item');
    const subPanels = document.querySelectorAll('.sub-panel');

    const activateCategory = item => {
            // Remove active state from all items
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Hide all sub-panels
            subPanels.forEach(panel => panel.classList.remove('active'));

            // Show corresponding right sub-panel
            const targetId = item.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
    };

    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => activateCategory(item));
        item.addEventListener('click', () => activateCategory(item));
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
        const serviceDetails = {
            wordpress: ['Web Development', 'WordPress Web Development'],
            fullstack: ['Web Development', 'Full-Stack Web Development'],
            landing: ['Web Development', 'High-Converting Landing Pages'],
            ecommerce: ['Web Development', 'E-Commerce Development'],
            woocommerce: ['Web Development', 'WooCommerce Development'],
            designsystem: ['UI/UX Design', 'Design Systems & UI Kits'],
            wireframing: ['UI/UX Design', 'Wireframing & Prototyping'],
            saas: ['Software Development', 'SaaS Applications'],
            mobile: ['Software Development', 'Mobile Applications'],
            enterprise: ['Software Development', 'Enterprise Software Solutions'],
            api: ['Software Development', 'API Development & Integrations'],
            legacy: ['Software Development', 'Legacy System Modernization'],
            seo: ['SEO & Digital Marketing', 'Technical & On-Page SEO'],
            ppc: ['SEO & Digital Marketing', 'Pay-Per-Click Advertising'],
            social: ['SEO & Digital Marketing', 'Social Media Marketing'],
            chatbot: ['AI Integration', 'Custom AI Chatbots & Agents'],
            automation: ['AI Integration', 'AI-Powered Automation'],
            llm: ['AI Integration', 'Large Language Model Integration']
        };
        const requestedService = new URLSearchParams(window.location.search).get('service');
        const serviceDetail = serviceDetails[requestedService];

        if (serviceDetail) {
            standaloneForm.elements.namedItem('service').value = serviceDetail[0];
            standaloneForm.elements.namedItem('service_detail').value = serviceDetail[1];
        }

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