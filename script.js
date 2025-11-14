// Simple article auto-detection
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    
    // Mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});

async function loadArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;

    // Define your articles here
    const articles = [
        {
            title: "Financial Markets Foundation",
            description: "Understanding the core concepts of market structures and participants",
            file: "1-financial-markets.html",
            difficulty: "Beginner",
            readTime: "8 min"
        },
        {
            title: "Forex Trading Instruments", 
            description: "Master spot, forward, futures, options and swap markets",
            file: "2-forex-instruments.html",
            difficulty: "Intermediate",
            readTime: "12 min"
        }
    ];

    articlesGrid.innerHTML = articles.map(article => `
        <article class="article-card" onclick="location.href='${article.file}'">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <div class="article-meta">
                <span>${article.readTime} read</span>
                <span>${article.difficulty}</span>
            </div>
            <button class="read-more" onclick="event.stopPropagation(); location.href='${article.file}'">
                Read Article
            </button>
        </article>
    `).join('');
}
