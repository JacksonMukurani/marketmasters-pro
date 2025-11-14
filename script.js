// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            const isDisplayed = navLinks.style.display === 'flex';
            navLinks.style.display = isDisplayed ? 'none' : 'flex';
            mobileMenu.classList.toggle('active');
        });
    }

    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    if (item.querySelector('.accordion-content')) {
                        item.querySelector('.accordion-content').style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle current item
            accordionItem.classList.toggle('active');
            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = '0';
            }
        });
    });

    // Market Time Converter
    const convertButton = document.getElementById('convert-time');
    if (convertButton) {
        convertButton.addEventListener('click', function() {
            const sessionSelect = document.getElementById('session-select');
            const selectedSession = sessionSelect.value;
            const timeResult = document.getElementById('time-result');
            
            const sessionTimes = {
                tokyo: 'Tokyo: 00:00 JST (15:00 UTC)',
                london: 'London: 08:00 GMT (08:00 UTC)',
                newyork: 'New York: 14:30 EST (19:30 UTC)'
            };
            
            const userTime = new Date().toLocaleString();
            if (timeResult) {
                timeResult.innerHTML = `
                    <strong>${sessionTimes[selectedSession]}</strong><br>
                    Your local time: ${userTime}<br>
                    <small>Use our advanced converter for precise calculations</small>
                `;
            }
        });
    }

    // Position Size Calculator
    const calculateButton = document.getElementById('calculate-position');
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            const accountEquity = parseFloat(document.getElementById('account-equity').value);
            const riskPercent = parseFloat(document.getElementById('risk-percent').value);
            const positionResult = document.getElementById('position-result');
            
            if (!accountEquity || !riskPercent) {
                if (positionResult) {
                    positionResult.innerHTML = '<span style="color: var(--danger)">Please enter both values</span>';
                }
                return;
            }
            
            const riskAmount = accountEquity * (riskPercent / 100);
            const recommendedPosition = riskAmount * 10; // Simplified calculation
            
            if (positionResult) {
                positionResult.innerHTML = `
                    <strong>Recommended Position Size:</strong><br>
                    $${recommendedPosition.toFixed(2)}<br>
                    <small>Risking $${riskAmount.toFixed(2)} (${riskPercent}% of equity)</small>
                `;
            }
        });
    }

    // Article Card Interactions
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('read-more')) {
                const articleId = this.getAttribute('data-article');
                // In a real implementation, this would load the full article
                alert(`Loading article ${articleId}: ${this.querySelector('h3').textContent}`);
            }
        });
        
        const readMoreBtn = card.querySelector('.read-more');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const articleId = card.getAttribute('data-article');
                alert(`Loading full article: ${card.querySelector('h3').textContent}`);
            });
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(45, 45, 45, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--dark-gray)';
                header.style.backdropFilter = 'none';
            }
        }
    });
});

// Ad placement management
class AdManager {
    constructor() {
        this.adContainers = document.querySelectorAll('.ad-container');
        this.init();
    }
    
    init() {
        this.rotateAds();
        setInterval(() => this.rotateAds(), 30000); // Rotate ads every 30 seconds
    }
    
    rotateAds() {
        this.adContainers.forEach(container => {
            // Simulate ad rotation - in real implementation, this would fetch from ad server
            const adTypes = ['Trading Platform', 'Market Data', 'Educational Course', 'Broker Service'];
            const randomAd = adTypes[Math.floor(Math.random() * adTypes.length)];
            const placeholder = container.querySelector('.ad-placeholder');
            if (placeholder) {
                placeholder.textContent = `${randomAd} Ad`;
            }
        });
    }
}

// Initialize ad manager when page loads
window.addEventListener('load', () => {
    new AdManager();
});

// Article loading function
function loadArticle(articleUrl) {
    // In a real implementation, this would load the article content
    // For demo purposes, we'll show an alert
    alert(`Loading article: ${articleUrl}\n\nIn the full implementation, this would navigate to the complete article page with detailed content, interactive examples, and practice exercises.`);
    
    // Alternatively, you could use:
    // window.location.href = articleUrl;
}
