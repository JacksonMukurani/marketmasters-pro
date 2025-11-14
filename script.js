// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    // Mobile menu toggle
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-visible');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav') && navLinks.classList.contains('mobile-visible')) {
                navLinks.classList.remove('mobile-visible');
            }
        });
    }

    // Position Size Calculator
    const calculateButton = document.getElementById('calculate-position');
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            const accountEquity = parseFloat(document.getElementById('account-equity').value) || 10000;
            const riskPercent = parseFloat(document.getElementById('risk-percent').value) || 1;
            const positionResult = document.getElementById('position-result');
            
            const riskAmount = accountEquity * (riskPercent / 100);
            const recommendedPosition = riskAmount * 10;
            
            if (positionResult) {
                positionResult.innerHTML = `
                    <strong>Recommended Position:</strong><br>
                    $${recommendedPosition.toFixed(2)}<br>
                    <small>Risking $${riskAmount.toFixed(2)} (${riskPercent}% of equity)</small>
                `;
            }
        });
    }

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
                    Your local time: ${userTime}
                `;
            }
        });
    }

    // Pip Value Calculator
    const pipButton = document.getElementById('calculate-pip');
    if (pipButton) {
        pipButton.addEventListener('click', function() {
            const currencyPair = document.getElementById('currency-pair').value;
            const lotSize = parseFloat(document.getElementById('lot-size').value) || 1;
            const pipResult = document.getElementById('pip-result');
            
            const pipValues = {
                'EUR/USD': 10,
                'GBP/USD': 10,
                'USD/JPY': 9.09,
                'AUD/USD': 10
            };
            
            const pipValue = pipValues[currencyPair] * lotSize;
            
            if (pipResult) {
                pipResult.innerHTML = `
                    <strong>Pip Value:</strong><br>
                    $${pipValue.toFixed(2)} per pip<br>
                    <small>For ${currencyPair}, ${lotSize} lot(s)</small>
                `;
            }
        });
    }

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

// Ad rotation
class AdManager {
    constructor() {
        this.adContainers = document.querySelectorAll('.ad-container');
        this.init();
    }
    
    init() {
        this.rotateAds();
        setInterval(() => this.rotateAds(), 30000);
    }
    
    rotateAds() {
        this.adContainers.forEach(container => {
            const adTypes = ['Trading Platform', 'Market Data', 'Educational Course', 'Broker Service'];
            const randomAd = adTypes[Math.floor(Math.random() * adTypes.length)];
            const placeholder = container.querySelector('.ad-placeholder');
            if (placeholder) {
                placeholder.textContent = `${randomAd} Ad`;
            }
        });
    }
}

window.addEventListener('load', () => {
    new AdManager();
});
