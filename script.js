document.addEventListener('DOMContentLoaded', function () {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navLinks');
        
        function closeMobileMenu() { hamburger.classList.remove('active'); navMenu.classList.remove('show'); hamburger.setAttribute('aria-expanded', 'false'); }
        function updateActiveNavLink(targetId) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                const linkId = link.getAttribute('href').substring(1);
                const isBlogArticle = targetId.includes('guide') || targetId.includes('colors') || targetId.includes('headphones');
                link.classList.toggle('active', linkId === targetId || (isBlogArticle && linkId === 'blog'));
            });
        }
        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                targetPage.focus({ preventScroll: true });
            }
            window.scrollTo({ top: 0, behavior: 'instant' });
            updateActiveNavLink(pageId);
            closeMobileMenu();
            if (history.pushState) history.pushState(null, null, '#' + pageId);
            else location.hash = '#' + pageId;
        }
        function handleArticleLink(articleId) {
            showPage('blog-articles');
            document.querySelectorAll('.full-article').forEach(article => article.classList.remove('active'));
            const targetArticle = document.getElementById(articleId);
            if (targetArticle) {
                targetArticle.classList.add('active');
                targetArticle.focus({ preventScroll: true });
            }
        }
        
        hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navMenu.classList.toggle('show'); hamburger.setAttribute('aria-expanded', navMenu.classList.contains('show')); });
        
        document.body.addEventListener('click', e => {
            if (e.target.matches('.nav-link')) {
                e.preventDefault();
                const pageId = e.target.getAttribute('href').substring(1);
                showPage(pageId);
            }
            if (e.target.matches('.read-article-btn')) { e.preventDefault(); handleArticleLink(e.target.dataset.articleid); }
            if (e.target.matches('.back-to-blog-btn')) { e.preventDefault(); showPage('blog'); }
        });

        const initialId = window.location.hash ? window.location.hash.substring(1) : 'home';
        if (['soundproofing-guide', 'noise-colors', 'headphones-2025'].includes(initialId)) { handleArticleLink(initialId); } else { showPage(initialId || 'home'); }
    }); 