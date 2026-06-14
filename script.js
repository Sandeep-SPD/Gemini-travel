// --- 1. Dark Mode Toggle ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    // Check local storage for theme preference on load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save preference to local storage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// --- 2. Registration Logic ---
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;
        const errorMsg = document.getElementById('reg-error');

        // Form Validation
        if (password !== confirmPassword) {
            errorMsg.innerText = "Passwords do not match!";
            return;
        }

        // Save user to Local Storage
        const user = { name, email, phone, password };
        localStorage.setItem(email, JSON.stringify(user));
        
        alert("Registration Successful! Please login.");
        window.location.href = "login.html"; // Redirect to login
    });
}

// --- 3. Login Logic ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorMsg = document.getElementById('login-error');

        // Retrieve user from Local Storage
        const storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            alert("Login Successful!");
            localStorage.setItem('loggedInUser', storedUser.name); // Create session
            window.location.href = "index.html"; // Redirect to home
        } else {
            errorMsg.innerText = "Invalid Email or Password!";
        }
    });
}

// --- 4. Navbar Authentication State & Logout ---
function updateNavbar() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('nav-login');
    const registerLink = document.getElementById('nav-register');
    const logoutLink = document.getElementById('nav-logout');

    if (loggedInUser) {
        if(loginLink) loginLink.style.display = 'none';
        if(registerLink) registerLink.style.display = 'none';
        if(logoutLink) logoutLink.style.display = 'inline-block';
    }
}
document.addEventListener('DOMContentLoaded', updateNavbar);

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); // Clear session
        alert("You have been logged out.");
        window.location.reload();
    });
}

// --- 5. Package Search Bar ---
const searchInput = document.getElementById('package-search');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        const filter = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.package-card');

        cards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            if (title.includes(filter)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// --- 6. Booking Button Alert ---
const bookBtns = document.querySelectorAll('.book-btn');
bookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if(loggedInUser) {
            alert("Booking Request Submitted Successfully!");
        } else {
            alert("Please login first to book a package.");
            window.location.href = "login.html";
        }
    });
});

// --- 7. Scroll To Top Button ---
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
if (scrollToTopBtn) {
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- 8. Contact Form Alert ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you for reaching out! We will get back to you soon.");
        contactForm.reset();
    });
}

// --- 9. Center-Mode Auto Slider Logic ---
const sliderTrack = document.getElementById('slider-track');

if (sliderTrack) {
    const slides = document.querySelectorAll('.slide-img');
    let currentIndex = 0;

    function updateSlider() {
        // 1. Remove the 'active' class from all images
        slides.forEach(slide => slide.classList.remove('active'));
        
        // 2. Add the 'active' class to the current center image
        slides[currentIndex].classList.add('active');
        
        // 3. Calculate exact distance to move the track
        // Get the pixel width of one image, plus the 20px gap we set in CSS
        const gap = window.innerWidth <= 768 ? 10 : 20; // Matches mobile CSS gap
        const slideWidth = slides[0].clientWidth + gap; 
        
        // 4. Move the track
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function moveToNextSlide() {
        currentIndex++;
        
        // Reset to the beginning if we hit the end
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        
        updateSlider();
    }

    // Run the slider every 3 seconds
    setInterval(moveToNextSlide, 3000);

    // If the user resizes their browser window, recalculate the widths so it doesn't break
    window.addEventListener('resize', updateSlider);
}
