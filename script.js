        // Mobile Menu Toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll to top button
        const scrollToTopButton = document.getElementById('scroll-to-top');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.remove('hidden');
            } else {
                scrollToTopButton.classList.add('hidden');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form submission handling
        const appointmentForm = document.getElementById('appointment-form');
        const successModal = document.getElementById('success-modal');

        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const message = document.getElementById('message').value;

            // In a real application, you would send this data to a server
            console.log({
                name,
                email,
                phone,
                service,
                date,
                time,
                message
            });

            // Show success modal
            successModal.classList.remove('hidden');

            // Reset form
            appointmentForm.reset();
        });

        // Close modal when clicking outside or on close button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'success-modal' || e.target.id === 'close-modal') {
                successModal.classList.add('hidden');
            }
        });

        // Service booking buttons
        const bookButtons = document.querySelectorAll('.service-card button');
        bookButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Scroll to contact section
                const contactSection = document.getElementById('contact');
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Set the service in the dropdown based on which button was clicked
                const serviceCard = button.closest('.service-card');
                const serviceName = serviceCard.querySelector('h3').textContent;
                const serviceSelect = document.getElementById('service');

                // Find the option that contains the service name text
                for (let i = 0; i < serviceSelect.options.length; i++) {
                    if (serviceSelect.options[i].text.includes(serviceName) ||
                        serviceName.includes(serviceSelect.options[i].text)) {
                        serviceSelect.selectedIndex = i;
                        break;
                    }
                }
            });
        });

        // Add animation to service cards on scroll
        const serviceCards = document.querySelectorAll('.service-card');

        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });

        // Complete the success modal HTML
        successModal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md mx-4">
            <div class="text-center">
                <div class="text-green-500 text-5xl mb-4">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="text-2xl font-bold mb-2">Appointment Booked!</h3>
                <p class="text-gray-600 mb-6">
                    Thank you for booking with Fama Barber Shop. We've received your appointment request and will confirm shortly.
                </p>
                <button id="close-modal" class="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md">
                    Close
                </button>
            </div>
        </div>
    `;