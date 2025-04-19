// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Project Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    
    let currentIndex = 0;
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Arrange slides next to each other
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    
    slides.forEach(setSlidePosition);
    
    // Move to slide function
    const moveToSlide = (index) => {
        // Ensure index is within bounds
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentIndex = index;
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    };
    
    // Next button click
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });
    
    // Previous button click
    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });
    
    // Auto slide every 5 seconds
    let autoSlide = setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 5000);
    
    // Pause auto slide on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    // Resume auto slide when mouse leaves
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 5000);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate slide width
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        
        // Update slide positions
        slides.forEach((slide, index) => {
            slide.style.left = newSlideWidth * index + 'px';
        });
        
        // Update current slide position
        track.style.transform = 'translateX(-' + newSlideWidth * currentIndex + 'px)';
    });
    
    // Animate skill bars
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const animateSkillBars = () => {
        skillLevels.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = '0';
            setTimeout(() => {
                skill.style.width = width;
            }, 300);
        });
    };
    
    // Animate counters
    // Animate counters with support for "25+" and similar
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
    counters.forEach(counter => {
        const targetText = counter.getAttribute('data-target');
        const match = targetText.match(/\d+/);
        const suffix = match ? targetText.replace(match[0], '') : '';
        
        if (!match) return;

        const target = parseInt(match[0]);
        let count = 0;
        const increment = Math.max(1, target / 30);

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count) + suffix;
                setTimeout(updateCount, 50);
            } else {
                counter.innerText = target + suffix;
            }
        };

        updateCount();
    });
};

    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillBars();
                }
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    observer.observe(document.querySelector('.skills-grid'));
    observer.observe(document.querySelector('.about-stats'));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    fetch('https://script.google.com/macros/s/AKfycbzE3ozcLSVWuYQ4IQFEKcUNQQFNCy5wLV9xnRooA_vYVtgbEmaOcQirKQM9Ji8OQ27ZMw/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        alert('There was a problem submitting the form.');
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert('An error occurred while submitting the form.');
    });
  });
  
