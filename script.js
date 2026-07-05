function getNextTheme(currentTheme) {
    return currentTheme === 'dark' ? 'light' : 'dark';
}

function resolveInitialTheme(savedTheme, prefersDark) {
    return savedTheme || (prefersDark ? 'dark' : 'light');
}

function getFooterYear(date = new Date()) {
    return date.getFullYear();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getNextTheme, resolveInitialTheme, getFooterYear };
}

function readStoredTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (e) {
        return null;
    }
}

function storeTheme(theme) {
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        // Storage unavailable (e.g. private browsing) - theme just won't persist.
    }
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        if (themeToggle) {
            function updateThemeToggleIcon(theme) {
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    icon.className = theme === 'dark' ? 'far fa-sun' : 'far fa-moon';
                }
            }

            function setTheme(theme) {
                document.body.classList.toggle('dark-mode', theme === 'dark');
                storeTheme(theme);
                updateThemeToggleIcon(theme);
            }

            // Check for saved theme preference or use the system preference
            setTheme(resolveInitialTheme(readStoredTheme(), prefersDarkScheme.matches));

            // Theme toggle button event listener
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
                setTheme(getNextTheme(currentTheme));
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Keep the footer copyright year up to date automatically
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = getFooterYear();
        }
    });
}
