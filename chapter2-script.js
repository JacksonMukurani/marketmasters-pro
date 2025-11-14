// Chapter 2 Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Market Tiers Interactive
    const tiers = document.querySelectorAll('.tier');
    const tierTitle = document.getElementById('tier-title');
    const tierDescription = document.getElementById('tier-description');
    
    const tierData = {
        1: {
            title: "Tier 1: Interbank Market",
            description: "The wholesale level where major financial institutions (Deutsche Bank, Citibank, HSBC) trade directly with each other. Sets benchmark exchange rates and provides core liquidity for the entire market ecosystem."
        },
        2: {
            title: "Tier 2: Smaller Banks & Institutions",
            description: "Regional banks and specialized financial institutions that access Tier 1 liquidity. They provide liquidity to smaller brokers and institutional clients while managing their own currency exposures."
        },
        3: {
            title: "Tier 3: Retail Brokers",
            description: "Brokerage firms that aggregate liquidity from upper tiers and provide market access to retail traders. They offer various execution models (Market Maker, ECN, STP) with different pricing structures."
        },
        4: {
            title: "Tier 4: Retail Traders",
            description: "Individual traders accessing markets through retail brokers. While having minimal individual market impact, collectively they contribute significant volume and provide additional market liquidity."
        }
    };
    
    tiers.forEach(tier => {
        tier.addEventListener('click', function() {
            const tierNumber = this.getAttribute('data-tier');
            const data = tierData[tierNumber];
            
            // Update active state
            tiers.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update info panel
            if (tierTitle) tierTitle.textContent = data.title;
            if (tierDescription) tierDescription.textContent = data.description;
        });
    });

    // Broker Comparison Tool
    const brokerData = [
        {
            name: "IC Markets",
            regulation: "ASIC, CySEC",
            minDeposit: "$200",
            spreads: "0.0 pips",
            rating: "9.2/10",
            region: "au",
            accountType: "retail"
        },
        {
            name: "Pepperstone",
            regulation: "FCA, ASIC",
            minDeposit: "$200",
            spreads: "0.0 pips",
            rating: "9.0/10",
            region: "uk",
            accountType: "retail"
        },
        {
            name: "Saxo Bank",
            regulation: "FCA, MAS",
            minDeposit: "$10,000",
            spreads: "0.4 pips",
            rating: "8.8/10",
            region: "eu",
            accountType: "professional"
        },
        {
            name: "Interactive Brokers",
            regulation: "SEC, FCA",
            minDeposit: "$0",
            spreads: "Variable",
            rating: "9.1/10",
            region: "us",
            accountType: "institutional"
        },
        {
            name: "XM Group",
            regulation: "CySEC, ASIC",
            minDeposit: "$5",
            spreads: "0.6 pips",
            rating: "8.5/10",
            region: "eu",
            accountType: "retail"
        }
    ];

    const regionFilter = document.getElementById('region-filter');
    const accountTypeFilter = document.getElementById('account-type-filter');
    const compareButton = document.getElementById('compare-brokers');
    const brokerTable = document.getElementById('broker-table');

    function populateBrokerTable(brokers) {
        if (!brokerTable) return;
        
        const tbody = brokerTable.querySelector('tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        brokers.forEach(broker => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${broker.name}</strong></td>
                <td>${broker.regulation}</td>
                <td>${broker.minDeposit}</td>
                <td>${broker.spreads}</td>
                <td><span style="color: var(--primary-orange)">${broker.rating}</span></td>
            `;
            tbody.appendChild(row);
        });
    }

    function filterBrokers() {
        const region = regionFilter ? regionFilter.value : 'all';
        const accountType = accountTypeFilter ? accountTypeFilter.value : 'all';
        
        let filteredBrokers = brokerData.filter(broker => {
            const regionMatch = region === 'all' || broker.region === region;
            const typeMatch = accountType === 'all' || broker.accountType === accountType;
            return regionMatch && typeMatch;
        });
        
        populateBrokerTable(filteredBrokers);
    }

    if (compareButton) {
        compareButton.addEventListener('click', filterBrokers);
    }
    
    // Initial population
    populateBrokerTable(brokerData);

    // Instrument Comparison Interactive
    const instrumentData = {
        spot: {
            name: "Spot Forex",
            delivery: "T+2 Settlement",
            liquidity: "Very High",
            usage: "Short-term trading, speculation",
            typicalUsers: "Retail traders, corporations"
        },
        forward: {
            name: "Forward Contracts",
            delivery: "Future Date",
            liquidity: "Medium",
            usage: "Hedging, future commitments",
            typicalUsers: "Corporations, institutions"
        },
        futures: {
            name: "Futures Contracts",
            delivery: "Standardized Dates",
            liquidity: "High",
            usage: "Hedging, speculation",
            typicalUsers: "Institutions, professional traders"
        },
        options: {
            name: "Options",
            delivery: "Right to Exercise",
            liquidity: "Medium-High",
            usage: "Risk management, speculation",
            typicalUsers: "Institutions, sophisticated traders"
        }
    };

    // Forex Instrument Calculator
    class ForexInstrumentCalculator {
        constructor() {
            this.instruments = {
                spot: { contractSize: 100000, tickValue: 10 },
                futures: { contractSize: 125000, tickValue: 12.50 },
                options: { contractSize: 100000, premiumMultiplier: 100 }
            };
        }

        calculatePipValue(lotSize, instrument = 'spot') {
            const instrumentData = this.instruments[instrument];
            return (lotSize / instrumentData.contractSize) * instrumentData.tickValue;
        }

        calculatePositionValue(price, lotSize, instrument = 'spot') {
            const instrumentData = this.instruments[instrument];
            return price * lotSize * (instrumentData.contractSize / 100000);
        }
    }

    // Initialize calculator
    const forexCalculator = new ForexInstrumentCalculator();

    // Demo: Add calculator to page if calculator element exists
    const calculatorDemo = document.getElementById('forex-calculator-demo');
    if (calculatorDemo) {
        calculatorDemo.innerHTML = `
            <div class="calculator-tool">
                <h4>Forex Instrument Calculator</h4>
                <select id="instrument-type">
                    <option value="spot">Spot Forex</option>
                    <option value="futures">Futures</option>
                    <option value="options">Options</option>
                </select>
                <input type="number" id="lot-size" placeholder="Lot Size" value="1">
                <input type="number" id="price-level" placeholder="Price" value="1.1000">
                <button id="calculate-instrument">Calculate</button>
                <div id="instrument-result" class="calculator-result"></div>
            </div>
        `;

        const calculateInstrumentBtn = document.getElementById('calculate-instrument');
        if (calculateInstrumentBtn) {
            calculateInstrumentBtn.addEventListener('click', function() {
                const instrument = document.getElementById('instrument-type').value;
                const lotSize = parseFloat(document.getElementById('lot-size').value) || 1;
                const price = parseFloat(document.getElementById('price-level').value) || 1.1000;
                const instrumentResult = document.getElementById('instrument-result');
                
                const pipValue = forexCalculator.calculatePipValue(lotSize, instrument);
                const positionValue = forexCalculator.calculatePositionValue(price, lotSize, instrument);
                
                if (instrumentResult) {
                    instrumentResult.innerHTML = `
                        <strong>Results for ${instrument.toUpperCase()}:</strong><br>
                        Pip Value: $${pipValue.toFixed(2)}<br>
                        Position Value: $${positionValue.toFixed(2)}
                    `;
                }
            });
        }
    }

    // Regulatory Comparison Chart
    const regulatoryData = {
        'FCA (UK)': { protection: '£85,000', leverage: '30:1', segregation: 'Required' },
        'ASIC (Australia)': { protection: 'Unlimited', leverage: '30:1', segregation: 'Required' },
        'SEC (US)': { protection: '$500,000', leverage: '50:1', segregation: 'Required' },
        'CySEC (Cyprus)': { protection: '€20,000', leverage: '30:1', segregation: 'Required' },
        'Offshore': { protection: 'None', leverage: '500:1+', segregation: 'Varies' }
    };

    function createRegulatoryChart() {
        const chartContainer = document.getElementById('regulatory-chart');
        if (chartContainer) {
            let chartHTML = '<div class="regulatory-grid">';
            
            Object.entries(regulatoryData).forEach(([regulator, data]) => {
                const protectionColor = data.protection === 'None' ? 'var(--danger)' : 'var(--success)';
                const leverageColor = data.leverage === '500:1+' ? 'var(--warning)' : 'var(--text-muted)';
                
                chartHTML += `
                    <div class="regulatory-item">
                        <h5>${regulator}</h5>
                        <div class="regulatory-details">
                            <span style="color: ${protectionColor}">Protection: ${data.protection}</span>
                            <span style="color: ${leverageColor}">Leverage: ${data.leverage}</span>
                            <span>Segregation: ${data.segregation}</span>
                        </div>
                    </div>
                `;
            });
            
            chartHTML += '</div>';
            chartContainer.innerHTML = chartHTML;
        }
    }

    createRegulatoryChart();

    // Mobile menu functionality for chapter pages
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            const isDisplayed = navLinks.style.display === 'flex';
            navLinks.style.display = isDisplayed ? 'none' : 'flex';
        });
    }

    // Smooth scrolling for anchor links in chapter pages
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
});

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadArticle };
}
