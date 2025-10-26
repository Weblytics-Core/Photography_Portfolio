// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;
    
    // Toggle menu function
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen && !event.target.closest('.main-nav')) {
            toggleMenu();
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when resizing window to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu();
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Image data - separate arrays for hero section and gallery
const heroImages = [
    { path: 'https://drive.google.com/thumbnail?id=1ziHCEcMGNh_6Rd_tS7aV69iqJkM0uJxl&sz=w1000', alt: 'Nature Photography 1' },
    { path: 'https://drive.google.com/thumbnail?id=1ACRYxQ2LzoH_42NvlA814j1Twk5sNHBp&sz=w1000', alt: 'Nature Photography 2' },
    { path: 'https://drive.google.com/thumbnail?id=125F5EDqCameZOHSBdfr57vToUvJBFXrF&sz=w1000', alt: 'Nature Photography 3' },
    { path: 'https://drive.google.com/thumbnail?id=1w-MZAqmWNx_z3tXtwgCjfN9KxyMe3ccK&sz=w1000', alt: 'Nature Photography 3' },
];

// Import gallery images from the separate file
// The galleryImages array is now defined in gallery-images.js

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to load gallery images with improved batch loading
function loadGalleryImages() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) {
        console.error('Gallery container not found');
        return;
    }
    
    // Clear existing gallery items
    gallery.innerHTML = '';
    
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading Gallery...</div>
        <div class="loading-progress">
            <div class="loading-progress-bar"></div>
        </div>
    `;
    gallery.appendChild(loadingIndicator);
    
    // Check if galleryImages is defined
    if (!galleryImages || !Array.isArray(galleryImages)) {
        console.error('galleryImages is not defined or not an array');
        loadingIndicator.querySelector('.loading-text').textContent = 'Error loading gallery';
        return;
    }
    
    // Use the original order of gallery images
    const orderedImages = [...galleryImages];
    
    // Load all images at once
    const initialBatchSize = orderedImages.length;
    
    let loadedImages = 0;
    const totalImages = orderedImages.length;
    const fragment = document.createDocumentFragment();
    
    // Pre-create image objects for faster loading
    const imageCache = new Map();
    
    // Preload critical images immediately
    const preloadImages = orderedImages.slice(0, Math.min(20, orderedImages.length));
    preloadImages.forEach(imageData => {
        const img = new Image();
        img.src = imageData.path;
        imageCache.set(imageData.path, img);
    });
    
    // Create all DOM elements with optimized structure
    const galleryItems = orderedImages.map((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);
        galleryItem.setAttribute('data-id', `image-${index}`);
        
        // Minimize DOM operations - no title in gallery view
        galleryItem.dataset.imagePath = image.path;
        galleryItem.dataset.imageAlt = image.alt || 'Gallery Image';
        galleryItem.dataset.imageTitle = image.title || image.alt;
        
        return galleryItem;
    });
    
    // Function to update loading progress
    function updateProgress() {
        loadedImages++;
        const progress = (loadedImages / totalImages) * 100;
        const progressBar = loadingIndicator.querySelector('.loading-progress-bar');
        progressBar.style.width = `${progress}%`;
        loadingIndicator.querySelector('.loading-text').textContent = 
            `Loading Gallery... ${Math.round(progress)}%`;
        
        if (loadedImages === totalImages) {
            setTimeout(() => {
                loadingIndicator.style.display = 'none';
            }, 500);
        }
    }
    
    // Ultra-optimized image loading function
    function loadImage(galleryItem) {
        const imagePath = galleryItem.dataset.imagePath;
        const imageAlt = galleryItem.dataset.imageAlt;
        
        // Check if image is already cached
        let img = imageCache.get(imagePath);
        
        if (!img) {
            // Create new image with maximum performance settings
            img = new Image();
            img.loading = 'eager';
            img.decoding = 'sync'; // Sync for immediate display
            img.fetchPriority = 'high';
            imageCache.set(imagePath, img);
        }
        
        img.alt = imageAlt;
        
        // Optimized styles for hardware acceleration
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
        `;
        
        // Handle successful load
        const handleLoad = () => {
            updateProgress();
            galleryItem.classList.add('loaded');
            
            // Fast aspect ratio calculation and class assignment
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            
            if (aspectRatio > 1.5) {
                galleryItem.classList.add('wide');
            } else if (aspectRatio < 0.7) {
                galleryItem.classList.add('tall');
            } else if (aspectRatio >= 0.95 && aspectRatio <= 1.05 && Math.random() < 0.1) {
                galleryItem.classList.add('large');
            }
        };
        
        // Handle errors efficiently
        const handleError = () => {
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, #34495e, #2c3e50);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 0.8rem;
                text-align: center;
            `;
            fallback.textContent = 'Image unavailable';
            galleryItem.appendChild(fallback);
            updateProgress();
            galleryItem.classList.add('error');
        };
        
        // Set up event listeners
        if (img.complete && img.naturalWidth > 0) {
            // Image already loaded
            handleLoad();
        } else {
            img.onload = handleLoad;
            img.onerror = handleError;
            if (!img.src) {
                img.src = imagePath;
            }
        }
        
        galleryItem.appendChild(img);
    }
    
    // Simplified preloading for better performance
    function preloadNextImages() {
        // Since we're loading all images aggressively, this function is simplified
        // Focus on ensuring smooth scrolling and interaction
        return;
    }
    
    // Add all gallery items to the fragment
    galleryItems.forEach(item => fragment.appendChild(item));
    
    // Append all items to the gallery at once (better performance)
    gallery.appendChild(fragment);
    
    // Ultra-fast batch loading with maximum concurrency
    function loadBatch(startIndex, batchSize) {
        const endIndex = Math.min(startIndex + batchSize, galleryItems.length);
        
        // Maximum concurrency - load all images simultaneously
        const concurrentLimit = 24; // Increased concurrent limit
        const batchPromises = [];
        
        // Process images in parallel chunks
        for (let i = startIndex; i < endIndex; i += concurrentLimit) {
            const chunkEnd = Math.min(i + concurrentLimit, endIndex);
            
            const chunkPromise = new Promise(resolve => {
                // Use requestIdleCallback for better performance timing
                const processChunk = () => {
                    for (let j = i; j < chunkEnd; j++) {
                        loadImage(galleryItems[j]);
                    }
                    resolve();
                };
                
                if (window.requestIdleCallback) {
                    window.requestIdleCallback(processChunk, { timeout: 1 });
                } else {
                    setTimeout(processChunk, 0);
                }
            });
            
            batchPromises.push(chunkPromise);
        }
        
        // Process all chunks in parallel
        Promise.all(batchPromises).then(() => {
            if (endIndex < galleryItems.length) {
                // Continue with remaining images immediately
                loadBatch(endIndex, Math.min(100, galleryItems.length - endIndex));
            } else {
                // Complete loading process
                requestAnimationFrame(() => {
                    adjustFirstAndLastRows();
                    initializeImageViewer();
                });
            }
        });
    }
    
    // Start ultra-fast loading immediately
    // Load all images at once for maximum speed
    loadBatch(0, initialBatchSize);
    
    // Add window resize handler to readjust rows
    window.addEventListener('resize', adjustFirstAndLastRows);
}

// Function to adjust first and last rows for symmetry
function adjustFirstAndLastRows() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;
    
    const items = Array.from(gallery.querySelectorAll('.gallery-item'));
    if (items.length === 0) return;
    
    // Get gallery width and item width to calculate items per row
    const galleryWidth = gallery.offsetWidth;
    const itemStyle = window.getComputedStyle(items[0]);
    const itemWidth = parseInt(itemStyle.width) + 
                     parseInt(itemStyle.marginLeft) + 
                     parseInt(itemStyle.marginRight);
    
    const itemsPerRow = Math.floor(galleryWidth / itemWidth);
    
    // Calculate how many items should be in the first and last rows
    const totalItems = items.length;
    const itemsInLastRow = totalItems % itemsPerRow || itemsPerRow;
    
    // Reset all previous row classes and spanning
    items.forEach(item => {
        item.classList.remove('first-row', 'last-row');
    });
    
    // Mark first row items
    for (let i = 0; i < Math.min(itemsPerRow, totalItems); i++) {
        if (items[i]) {
            items[i].classList.add('first-row');
            // Remove any spanning classes for first row
            items[i].classList.remove('wide', 'tall', 'large');
        }
    }
    
    // Mark last row items and ensure they don't span multiple rows
    const startOfLastRow = totalItems - itemsInLastRow;
    for (let i = startOfLastRow; i < totalItems; i++) {
        if (items[i]) {
            items[i].classList.add('last-row');
            // Remove any spanning classes for last row
            items[i].classList.remove('wide', 'tall', 'large');
        }
    }
}

// Initialize image viewer
function initializeImageViewer() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageViewer = document.querySelector('.image-viewer');
    const viewerImg = imageViewer.querySelector('img');
    const closeBtn = imageViewer.querySelector('.close-viewer');
    const prevBtn = imageViewer.querySelector('.prev-btn');
    const nextBtn = imageViewer.querySelector('.next-btn');
    const addToCartBtn = imageViewer.querySelector('.viewer-add-to-cart');
    const shareBtn = imageViewer.querySelector('.viewer-share-btn');
    
    if (!imageViewer || !viewerImg || !closeBtn) {
        console.error('Image viewer elements not found');
        return;
    }
    
    let currentImageIndex = 0;
    
    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                currentImageIndex = index;
                const imageData = galleryImages[index];
                openImageViewer(img.src, img.alt, index, imageData);
            }
        });
    });
    
    // Close viewer when clicking outside the image
    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            closeImageViewer();
        }
    });
    
    // Close viewer when clicking close button
    closeBtn.addEventListener('click', closeImageViewer);
    
    // Add to cart button click handler
    addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const currentImageData = galleryImages[currentImageIndex];
    if (currentImageData) {
        addToCart({
            id: `image-${currentImageIndex}`,
            title: currentImageData.title || currentImageData.alt,
            price: currentImageData.price,
            image: viewerImg.src
        });
    }
});
    
    // Share button click handler
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            shareImage(viewerImg.src, viewerImg.alt);
        });
    }

    // Add navigation button click handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navigateImage('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navigateImage('next');
        });
    }
}

// Function to share an image
function shareImage(imageSrc, imageAlt) {
    // Check if Web Share API is supported
    if (navigator.share) {
        // Share the image
        navigator.share({
            title: 'Photography Portfolio - ' + imageAlt,
            text: 'Check out this amazing photo: ' + imageAlt,
            url: imageSrc  // Use image source instead of main site link
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        const tempInput = document.createElement('input');
        tempInput.value = imageSrc;  // Use image source instead of main site link
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Image link copied to clipboard');
    }
}

// Navigate between images
function navigateImage(direction) {
    const viewerContent = document.querySelector('.viewer-content img');
    if (!viewerContent) return;

    const currentSrc = viewerContent.src;
    // Extract the filename from the full path
    const currentPath = currentSrc.split('/').pop();
    const currentIndex = galleryImages.findIndex(img => img.path.split('/').pop() === currentPath);
    
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'prev') {
        // Loop to last image if at first image
        newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    } else if (direction === 'next') {
        // Loop to first image if at last image
        newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    } else {
        return;
    }

    const newImage = galleryImages[newIndex];
    openImageViewer(newImage.path, newImage.title || newImage.alt, newIndex, newImage);
}

// Open image viewer
function openImageViewer(src, alt, index, imageData) {
    const imageViewer = document.querySelector('.image-viewer');
    const viewerImg = document.querySelector('.viewer-content img');
    const prevBtn = document.querySelector('.nav-btn.prev-btn');
    const nextBtn = document.querySelector('.nav-btn.next-btn');
    const addToCartBtn = document.querySelector('.viewer-add-to-cart');
    
    if (!imageViewer || !viewerImg) {
        console.error('Image viewer elements not found');
        return;
    }
    
    // Stop previous watermark interval if any
    stopWatermarkInterval();
    viewerImg.onload = function() {
        startWatermarkInterval(viewerImg);
    };
    viewerImg.src = src;
    viewerImg.alt = alt;
    imageViewer.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Update price display
    if (addToCartBtn) {
        const price = imageData.price || 0;
        addToCartBtn.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            Add to Cart - ₹${price.toFixed(2)}
        `;
    }

    // Always show navigation buttons since we're implementing looping
    if (prevBtn) prevBtn.style.display = 'flex';
    if (nextBtn) nextBtn.style.display = 'flex';
}

// Close image viewer
function closeImageViewer() {
    const imageViewer = document.querySelector('.image-viewer');
    const viewerContent = document.querySelector('.viewer-content img');
    
    if (!imageViewer || !viewerContent) {
        console.error('Image viewer elements not found');
        return;
    }
    stopWatermarkInterval();
    imageViewer.style.display = 'none';
    document.body.style.overflow = '';
    viewerContent.src = '';
    viewerContent.alt = '';
}

// Function to load slideshow images
function loadSlideshowImages() {
    const slides = document.querySelector('.slides');
    slides.innerHTML = ''; // Clear existing slides
    
    // Use hero images for the slideshow
    heroImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        
        slide.innerHTML = `
            <img src="${image.path}" alt="${image.alt}">
        `;
        
        slides.appendChild(slide);
    });
    
    // Reinitialize slideshow
    initializeSlideshow();
}

// Function to initialize slideshow
function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // Clear existing dots
    dotsContainer.innerHTML = '';

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Function to update slides
    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Function to go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetInterval();
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Function to reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Start slideshow
    resetInterval();

    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slideshowContainer.addEventListener('mouseleave', resetInterval);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load gallery and slideshow images
    loadGalleryImages();
    loadSlideshowImages();
    
    // Initialize cart
    initCart();
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
const submitButton = contactForm.querySelector('button[type="submit"]');

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    try {
        // Hide the cart modal and reset body overflow
        const cartModal = document.querySelector('.cart-modal');
        if (cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Find contact section and scroll to it
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            // Use requestAnimationFrame for smooth scrolling
            requestAnimationFrame(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                // Update contact form with cart information after scrolling
                setTimeout(() => {
                    updateContactFormWithCart();
                }, 500);
            });
        } else {
            console.error('Contact section not found');
            showNotification('Error: Contact section not found');
        }
    } catch (error) {
        console.error('Error in handleCheckout:', error);
        showNotification('An error occurred. Please try again.');
    }
}

// Update contact form with cart information
function updateContactFormWithCart() {
    const messageTextarea = document.querySelector('textarea[name="message"]');
    const cartSummary = generateCartSummary();
    
    // Set default message with cart summary
    messageTextarea.value = `I'm interested in purchasing the following items:\n\n${cartSummary}\n\nPlease contact me to proceed with the payment.`;

    // Show the cart summary preview
    const cartSummaryPreview = document.querySelector('.cart-summary-preview');
    cartSummaryPreview.style.display = 'block';

    // Update the cart summary preview content
    const cartItemsPreview = document.querySelector('.cart-items-preview');
    const cartTotalPreview = document.querySelector('.cart-total-preview');
    
    cartItemsPreview.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span class="item-title">${item.title}</span>
            <span class="item-details">Quantity: ${item.quantity} × ₹${item.price.toFixed(2)}</span>
        </div>
    `).join('');

    cartTotalPreview.textContent = `Total: ₹${calculateTotal().toFixed(2)}`;
}

// Generate cart summary for the message
function generateCartSummary() {
    return cart.map(item => {
        return `- ${item.title} (Quantity: ${item.quantity}, Price: ₹${(item.price * item.quantity).toFixed(2)})`;
    }).join('\n') + `\n\nTotal Amount: ₹${calculateTotal().toFixed(2)}`;
}

// Modify form submission to include cart information
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add cart information to form data
    const formData = new FormData(this);
    
    // Create a more detailed cart summary for the email
    const cartSummary = cart.map(item => {
        return `${item.title}
Quantity: ${item.quantity}
Price per item: ₹${item.price.toFixed(2)}
Subtotal: ₹${(item.price * item.quantity).toFixed(2)}
-------------------`;
    }).join('\n\n');

    const totalAmount = calculateTotal().toFixed(2);
    
    // Update the message with a nicely formatted cart summary
    const messageTextarea = this.querySelector('textarea[name="message"]');
    const originalMessage = messageTextarea.value;
    
    const emailMessage = `${originalMessage}

=== CART SUMMARY ===
${cartSummary}

Total Amount: ₹${totalAmount}`;

    // Update the form data
    formData.set('message', emailMessage);
    formData.set('cart_summary', cartSummary);
    formData.set('total_amount', totalAmount);
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Submit form
    fetch(this.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            showNotification('Message sent successfully! The seller will contact you shortly.');
            // Clear cart after successful submission
            cart = [];
            saveCart();
            updateCartUI();
            // Reset form
            this.reset();
            // Hide cart summary preview
            document.querySelector('.cart-summary-preview').style.display = 'none';
            // Show checkout button again
            document.querySelector('.checkout-btn').style.display = 'block';
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to send message. Please try again.');
        // Show checkout button again in case of error
        document.querySelector('.checkout-btn').style.display = 'block';
    })
    .finally(() => {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
});

// Add animation to sections when they come into view
const sections = document.querySelectorAll('section');
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

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for system preference and saved theme preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Set dark mode as default if no saved preference
if (!savedTheme) {
    if (prefersDark) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('dark-mode'); // Force dark mode as default
        localStorage.setItem('theme', 'dark');
    }
} else if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

// Disable right-click, keyboard shortcuts, and browser inspection
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('Right-click is disabled to protect the content.');
});

// Disable keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
    ) {
        e.preventDefault();
        alert('This action is disabled to protect the content.');
    }
});

// Prevent opening developer tools
(function() {
    // Prevent opening developer tools
    const devtools = /./;
    devtools.toString = function() {
        this.opened = true;
    }
    console.log('%c', devtools);
    devtools.opened = false;

    setInterval(function() {
        if (devtools.opened) {
            alert('Developer tools are disabled to protect the content.');
            window.location.reload();
        }
    }, 1000);
})();

// Prevent taking screenshots
document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots are disabled to protect the content.');
    }
});

// Prevent drag and drop
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

// Prevent text selection
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
});

// Prevent image dragging
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
});

// Shopping Cart Functionality
let cart = [];
const cartModal = document.querySelector('.cart-modal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPriceElement = document.querySelector('.total-price');
const checkoutBtn = document.querySelector('.checkout-btn');

// Initialize cart
function initCart() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }

    // Add event listeners for cart buttons
    const cartBtn = document.querySelector('.cart-btn');
    const closeCartBtn = document.querySelector('.close-cart');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', toggleCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    // Initialize cart UI
    updateCartUI();
}

// Toggle cart visibility
function toggleCart() {
    if (cartModal) {
        cartModal.classList.toggle('active');
        // Prevent body scrolling when cart is open
        document.body.style.overflow = cartModal.classList.contains('active') ? 'hidden' : '';
    }
}

// Add item to cart
function addToCart(imageData) {
    const existingItem = cart.find(item => item.id === imageData.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: imageData.id,
            title: imageData.title,
            price: imageData.price,
            image: imageData.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification('Item added to cart!');
}

// Update cart UI
function updateCartUI() {
    if (!cartCount || !cartItemsContainer || !totalPriceElement) return;

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Update cart items
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;

    // Add event listeners for quantity controls
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', handleQuantityChange);
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', handleQuantityInput);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', handleRemoveItem);
    });
}

// Handle quantity button clicks
function handleQuantityChange(e) {
    const button = e.target;
    const itemId = button.dataset.id;
    const item = cart.find(item => item.id === itemId);
    
    if (!item) return;
    
    if (button.classList.contains('decrease')) {
        if (item.quantity > 1) {
            item.quantity--;
        }
    } else if (button.classList.contains('increase')) {
        item.quantity++;
    }
    
    saveCart();
    updateCartUI();
}

// Handle quantity input changes
function handleQuantityInput(e) {
    const input = e.target;
    const itemId = input.dataset.id;
    const item = cart.find(item => item.id === itemId);
    
    if (!item) return;
    
    let newQuantity = parseInt(input.value);
    if (isNaN(newQuantity) || newQuantity < 1) {
        newQuantity = 1;
    }
    
    item.quantity = newQuantity;
    saveCart();
    updateCartUI();
}

// Handle item removal
function handleRemoveItem(e) {
    const button = e.target.closest('.remove-item');
    if (!button) return;
    
    const itemId = button.dataset.id;
    removeFromCart(itemId);
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
    showNotification('Item removed from cart');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Calculate total amount
function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

document.addEventListener('DOMContentLoaded', function() {
        // Document upload UI
        const fileInput = document.getElementById('file-upload');
        const fileList = document.getElementById('file-list');
        const uploadLabel = document.querySelector('.upload-label');
        let filesArray = [];

        // Only add the event listener once
        uploadLabel.onclick = () => fileInput.click();

        fileInput.addEventListener('change', function() {
            // Add new files to filesArray
            for (let i = 0; i < fileInput.files.length; i++) {
                const file = fileInput.files[i];
                // Avoid duplicates
                if (!filesArray.some(f => f.name === file.name && f.size === file.size)) {
                    filesArray.push(file);
                }
            }
            updateFileListUI();
            updateFileInput();
        });

        function updateFileListUI() {
            fileList.innerHTML = '';
            filesArray.forEach((file, idx) => {
                // Don't show the voice file here, it will be handled separately
                if (file.name === "voice-message.webm") return;
                const div = document.createElement('div');
                div.textContent = file.name;
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.type = 'button';
                removeBtn.title = 'Remove document';
                removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
                removeBtn.onclick = function() {
                    filesArray.splice(idx, 1);
                    updateFileListUI();
                    updateFileInput();
                };
                div.appendChild(removeBtn);
                fileList.appendChild(div);
            });
        }

        function updateFileInput() {
            const dataTransfer = new DataTransfer();
            filesArray.forEach(file => dataTransfer.items.add(file));
            if (voiceFile) dataTransfer.items.add(voiceFile);
            fileInput.files = dataTransfer.files;
        }

        // Voice recording UI
        const recordBtn = document.getElementById('record-voice-btn');
        const audioPreview = document.getElementById('voice-preview');
        const removeVoiceBtn = document.getElementById('remove-voice-btn');
        const voiceStatus = document.getElementById('voice-status');
        let mediaRecorder;
        let audioChunks = [];
        let audioBlob;
        let isRecording = false;
        let voiceFile = null;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            recordBtn.disabled = false;
        } else {
            recordBtn.disabled = true;
            recordBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        }

        recordBtn.addEventListener('click', async function() {
            if (!isRecording) {
                // Start recording
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream);
                    audioChunks = [];
                    mediaRecorder.ondataavailable = e => {
                        if (e.data.size > 0) audioChunks.push(e.data);
                    };
                    mediaRecorder.onstop = () => {
                        audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        audioPreview.src = audioUrl;
                        audioPreview.style.display = 'block';
                        removeVoiceBtn.style.display = 'inline-flex';
                        voiceStatus.textContent = "Voice message attached!";
                        voiceStatus.style.color = "green";

                        // Add the audio file as the only voice file
                        voiceFile = new File([audioBlob], "voice-message.webm", { type: "audio/webm" });
                        updateFileInput();
                    };
                    mediaRecorder.start();
                    recordBtn.classList.add('recording');
                    recordBtn.setAttribute('aria-pressed', 'true');
                    recordBtn.innerHTML = '<i class="fas fa-stop"></i>';
                    isRecording = true;
                    voiceStatus.textContent = "Recording...";
                    voiceStatus.style.color = "orange";
                } catch (err) {
                    alert("Microphone access denied or not available.");
                }
            } else {
                // Stop recording
                mediaRecorder.stop();
                recordBtn.classList.remove('recording');
                recordBtn.setAttribute('aria-pressed', 'false');
                recordBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                isRecording = false;
            }
        });

        removeVoiceBtn.addEventListener('click', function() {
            // Remove the voice file
            voiceFile = null;
            updateFileInput();
            audioPreview.src = '';
            audioPreview.style.display = 'none';
            removeVoiceBtn.style.display = 'none';
            voiceStatus.textContent = '';
        });
    });

// --- Watermark logic ---
let watermarkInterval = null;
let lastWatermarkPosition = null;

function drawWatermarkOnCanvas(imgElement) {
    const canvas = document.getElementById('watermark-canvas');
    if (!canvas || !imgElement) return;
    // Set canvas size to match image display size
    const rect = imgElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Watermark text
    const text = 'Subhadip photography';
    ctx.font = 'bold 1.2em Arial';
    ctx.globalAlpha = 0.35;
    ctx.textBaseline = 'top';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = 'white';
    // Calculate random position (avoid edges)
    const textMetrics = ctx.measureText(text);
    const margin = 20;
    const maxX = Math.max(1, canvas.width - textMetrics.width - margin);
    const maxY = Math.max(1, canvas.height - 40 - margin);
    let x, y;
    // Avoid repeating the same position
    do {
        x = Math.floor(Math.random() * maxX) + margin/2;
        y = Math.floor(Math.random() * maxY) + margin/2;
    } while (lastWatermarkPosition && Math.abs(x - lastWatermarkPosition.x) < 30 && Math.abs(y - lastWatermarkPosition.y) < 30);
    lastWatermarkPosition = {x, y};
    ctx.fillText(text, x, y);
    ctx.globalAlpha = 1;
}

function startWatermarkInterval(imgElement) {
    if (watermarkInterval) clearInterval(watermarkInterval);
    drawWatermarkOnCanvas(imgElement);
    watermarkInterval = setInterval(() => {
        drawWatermarkOnCanvas(imgElement);
    }, 3000);
}

function stopWatermarkInterval() {
    if (watermarkInterval) {
        clearInterval(watermarkInterval);
        watermarkInterval = null;
    }
    const canvas = document.getElementById('watermark-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
// --- End Watermark logic ---