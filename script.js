     document.addEventListener('DOMContentLoaded', () => {
            const header = document.querySelector('.header');
            const navMenu = document.querySelector('.nav-menu');
            const heroContent = document.querySelector('.hero-content');
            const roadmapHeading = document.querySelector('.roadmap-heading');
            const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
            const counters = document.querySelectorAll('.counter-value');
            let countersActivated = false;
            let roadmapHeadingAnimated = false;

            // Service Modal Elements
            const serviceModalOverlay = document.getElementById('service-modal-overlay');
            const serviceModalContent = document.getElementById('service-modal-content');
            const closeServiceModalBtn = document.getElementById('close-service-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalSubservicesList = document.getElementById('modal-subservices-list');
            const serviceCards = document.querySelectorAll('.services-grid-item');

            // Portfolio Modal Elements
            const portfolioImageModalOverlay = document.getElementById('portfolio-image-modal-overlay');
            const portfolioImageModalContent = document.getElementById('portfolio-image-modal-content');
            const closePortfolioModalBtn = document.getElementById('close-portfolio-modal');
            const portfolioEnlargedImg = document.getElementById('portfolio-enlarged-img');

            // Portfolio Grid Containers
            const developmentPortfolioGrid = document.getElementById('development-portfolio-grid');
            const marketingDesignPortfolioGrid = document.getElementById('marketing-design-portfolio-grid');

            // Data for services and sub-services
            const servicesData = {
                development: {
                    title: "Development Services",
                    subservices: [
                        "Web Development (Custom Websites, CMS Integration)",
                        "E-commerce Solutions (Shopify, WooCommerce, Custom Stores)",
                        "Portfolio Websites",
                        "Android App Development",
                        "iOS App Development",
                        "Cross-Platform Mobile Apps (React Native, Flutter)",
                        "Backend Development (APIs, Databases)",
                        "Website Maintenance & Support"
                    ]
                },
                design: {
                    title: "Design Services",
                    subservices: [
                        "Logo Design & Branding",
                        "Poster Design",
                        "Flyer Design",
                        "Book Cover Design",
                        "Business Card Design",
                        "Exhibition Stand Design",
                        "Chocolate & Packaging Design",
                        "UI/UX Design for Web & Mobile"
                    ]
                },
                marketing: {
                    title: "Marketing Services",
                    subservices: [
                        "Google Ads (Search, Display, Shopping)",
                        "Instagram Marketing",
                        "TikTok Marketing",
                        "Facebook Marketing",
                        "Reels & Short-form Video Marketing",
                        "SMS Marketing",
                        "Email Marketing Campaigns",
                        "SEO (Search Engine Optimization)",
                        "Content Marketing Strategy"
                    ]
                }
            };

            // Data for portfolio items (for image modal and dynamic loading)
            const portfolioData = {
                project1: {
                    image: '/neksus-12.png',
                    enlargedImage: '/neksus-12.png',
                    title: "Portfolio Website",
                    department: "Development",
                    type: "Website Design"
                },
             

                     project3: {
                    image: 'imgs/neksus-13.png',
                    enlargedImage: 'imgs/neksus-13.png',
                    title: "Data analysis",
                    department: "Development",
                    type: "Business Analysis"
                },
                     project4: {
                    image: 'imgs/neksus-14.png',
                    enlargedImage: 'imgs/neksus-14.png',
                    title: "DATA ANALYSIS",
                    department: "Development",
                    type: "Business Analysis"
                },
                project5: {
                    image: 'imgs/neksus-15.png',
                    enlargedImage: 'imgs/neksus-15.png',
                    title: "Quotely",
                    department: "Development",
                    type: "Website Development"
                },
                   project2: {
                    image: 'imgs/neksus-06.png',
                    enlargedImage: 'imgs/neksus-06.png',
                    title: "Portfolio Website",
                    department: "Development",
                    type: "Website Development"
                },
                project6: {
                    image: 'imgs/neksus-16.png',
                    enlargedImage: 'imgs/neksus-16.png',
                    title: "Beauty Lounge Website",
                    department: "Development",
                    type: "Website Development"
                },
                project7: {
                    image: 'imgs/neksus-08.png',
                    enlargedImage: 'imgs/neksus-08.png',
                    title: "Heatwave Flyer",
                    department: "Design",
                    type: "Marketing"
                },
                project8: {
                    image: 'imgs/neksus-10.png',
                    enlargedImage: 'imgs/neksus-10.png',
                    title: "Exhibition Stand",
                    department: "Design",
                    type: "Exhibition Stand"
                },
                   project9: {
                    image: 'imgs/neksus-09.png',
                    enlargedImage: 'imgs/neksus-09.png',
                    title: "Flyer",
                    department: "Design",
                    type: "Marketing"
                },
                   project10: {
                    image: 'imgs/neksus-11.png',
                    enlargedImage: 'imgs/neksus-11.png',
                    title: "Exhibition Stand",
                    department: "Design",
                    type: "Exhibition Stand"
                },
                     project11: {
                    image: 'imgs/neksus-17.png',
                    enlargedImage: 'imgs/neksus-17.png',
                    title: "Logo",
                    department: "Design",
                    type: "Branding"
                },
                     project12: {
                    image: 'imgs/neksus-18.png',
                    enlargedImage: 'imgs/neksus-18.png',
                    title: "LOGO",
                    department: "Design",
                    type: "Branding"
                },
                  project13: {
                    image: 'imgs/Neksus-20.png',
                    enlargedImage: 'imgs/Neksus-20.png',
                    title: "PilaVee",
                    department: "Development",
                    type: "Website Development"
                },
                  project14: {
                    image: 'imgs/Neksus-19.png',
                    enlargedImage: 'imgs/Neksus-19.png',
                    title: "Ru2ya",
                    department: "Development",
                    type: "Website Development"
                }
            };

            // Function to create a portfolio item element
            const createPortfolioItem = (projectId, project) => {
                const portfolioItemDiv = document.createElement('div');
                portfolioItemDiv.classList.add('portfolio-item');
                portfolioItemDiv.setAttribute('data-project-id', projectId);

                portfolioItemDiv.innerHTML = `
                    <img src="${project.image}" alt="Neksus ${project.department} project: ${project.title} in Lebanon">
                    <div class="portfolio-overlay">
                        <h3>${project.title}</h3>
                        <p>Department: ${project.department}</p>
                        <p>Type: ${project.type}</p>
                        <button class="arrow-btn"><i class="fa fa-arrow-right"></i></button>
                    </div>
                `;

                // Attach event listener to the arrow button within this new item
                const arrowBtn = portfolioItemDiv.querySelector('.arrow-btn');
                arrowBtn.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent click from bubbling to parent item
                    const currentProjectId = portfolioItemDiv.getAttribute('data-project-id');
                    const currentProjectData = portfolioData[currentProjectId];

                    if (currentProjectData && currentProjectData.enlargedImage) {
                        portfolioEnlargedImg.src = currentProjectData.enlargedImage;
                        portfolioImageModalOverlay.classList.add('active'); // Show the image modal
                    }
                });

                return portfolioItemDiv;
            };

            // Populate portfolio grids dynamically
            for (const projectId in portfolioData) {
                const project = portfolioData[projectId];
                const portfolioItemElement = createPortfolioItem(projectId, project);

                if (project.department === "Development") {
                    developmentPortfolioGrid.appendChild(portfolioItemElement);
                } else if (project.department === "Design" || project.department === "Marketing") {
                    marketingDesignPortfolioGrid.appendChild(portfolioItemElement);
                }
            }


            // Initial hero content animation on page load
            heroContent.classList.add('active');

            // Wrap each letter of the roadmap heading in a span for individual animation
            if (roadmapHeading) {
                roadmapHeading.innerHTML = roadmapHeading.textContent.split('').map(letter => {
                    return `<span>${letter === ' ' ? '&nbsp;' : letter}`;
                }).join('');
            }


            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Close mobile menu when a link is clicked (Adjusted, no longer toggling active class)
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    // No need to remove 'active' class as it's not being toggled for mobile menu
                });
            });

            // Function to animate a single counter
            const animateCounter = (counterElement) => {
                const target = parseInt(counterElement.getAttribute('data-target'));
                let current = 0;
                const duration = 1000; // 1 second
                const increment = target / (duration / 10); // Adjust speed

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counterElement.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counterElement.textContent = target;
                    }
                };
                updateCounter();
            };

            // Scroll reveal animation and counter/rotation trigger
            const revealOnScroll = () => {
                const windowHeight = window.innerHeight;
                scrollRevealElements.forEach(el => {
                    const elementTop = el.getBoundingClientRect().top;
                    const elementVisible = 150; // How much of the element needs to be visible

                    if (elementTop < windowHeight - elementVisible) {
                        el.classList.add('active');

                        // Check for 'why-us' section to trigger specific animations
                        if (el.id === 'why-us') {
                            // Animate counters if not already activated
                            if (!countersActivated) {
                                counters.forEach(counter => {
                                    animateCounter(counter);
                                });
                                countersActivated = true; // Set flag to true after activation
                            }

                            // Trigger initial icon rotation for all icons in why-us section
                            el.querySelectorAll('.feature-card .icon').forEach(icon => {
                                // Only add 'initial-rotate' if it hasn't been added yet
                                if (!icon.classList.contains('initial-rotate')) {
                                    icon.classList.add('initial-rotate');
                                }
                            });

                            // Trigger roadmap heading animation
                            if (roadmapHeading && !roadmapHeadingAnimated) { // Ensure roadmapHeading exists
                                roadmapHeading.classList.add('animate');
                                roadmapHeading.querySelectorAll('span').forEach((span, index) => {
                                    span.style.animationDelay = `${0.05 * index}s`;
                                });
                                roadmapHeadingAnimated = true;
                            }
                        }

                    } else {
                        // Optional: Remove 'active' class if element scrolls out of view upwards
                        // el.classList.remove('active');
                    }
                });
            };

            // Initial check on load
            revealOnScroll();

            // Add scroll event listener with a slight debounce for performance
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(revealOnScroll, 15);
            });


            // Service Modal Logic
            serviceCards.forEach(card => {
                card.addEventListener('click', () => {
                    const serviceType = card.getAttribute('data-service');
                    const data = servicesData[serviceType];

                    if (data) {
                        modalTitle.textContent = data.title;
                        modalSubservicesList.innerHTML = ''; // Clear previous list
                        data.subservices.forEach(subservice => {
                            const li = document.createElement('li');
                            li.textContent = subservice;
                            modalSubservicesList.appendChild(li);
                        });
                        serviceModalOverlay.classList.add('active'); // Show the modal
                    }
                });
            });

            // Close service modal when close button is clicked
            closeServiceModalBtn.addEventListener('click', () => {
                serviceModalOverlay.classList.remove('active');
            });

            // Close service modal when clicking outside the content box
            serviceModalOverlay.addEventListener('click', (event) => {
                if (event.target === serviceModalOverlay) {
                    serviceModalOverlay.classList.remove('active');
                }
            });

            // Close portfolio image modal when close button is clicked
            closePortfolioModalBtn.addEventListener('click', () => {
                portfolioImageModalOverlay.classList.remove('active');
            });

            // Close portfolio image modal when clicking outside the content box
            portfolioImageModalOverlay.addEventListener('click', (event) => {
                if (event.target === portfolioImageModalOverlay) {
                    portfolioImageModalOverlay.classList.remove('active');
                }
            });
        });




