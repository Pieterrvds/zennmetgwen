class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 50;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #A3B899;
          text-decoration: none;
        }
        .desktop-nav {
          display: none;
        }
        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 0.375rem;
          color: #A3B899;
        }
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          display: none;
        }
        .mobile-menu.active {
          display: block;
        }
        .nav-link {
          display: block;
          padding: 0.75rem 1rem;
          color: #4B5563;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: #A3B899;
        }
        .nav-link.current {
          color: #A3B899;
        }
        .whatsapp-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #A3B899;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-weight: 500;
          transition: background-color 0.2s;
          text-decoration: none;
        }
        .whatsapp-button:hover {
          background-color: #8ea085;
        }
        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }
          .nav-link {
            padding: 0.5rem;
          }
        }
      </style>
      <div class="nav-container">
        <a href="/" class="logo">Zen met Gwen</a>
        
        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <a href="/" class="nav-link">Home</a>
          <a href="/yoga.html" class="nav-link">Yoga</a>
          <a href="/massage.html" class="nav-link">Massage</a>
          <a href="https://wa.me/32498930036" class="whatsapp-button">
            <i data-feather="message-circle"></i>
            <span class="hidden md:inline">Reserveer</span>
          </a>
        </nav>
        
        <!-- Mobile Navigation Button -->
        <button class="mobile-menu-button" data-collapse-toggle="mobile-menu" aria-controls="mobile-menu" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-feather="menu">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div class="mobile-menu hidden" id="mobile-menu">
        <a href="/" class="nav-link">Home</a>
        <a href="/yoga.html" class="nav-link">Yoga</a>
        <a href="/massage.html" class="nav-link">Massage</a>
        <a href="https://wa.me/32498930036" class="nav-link flex items-center gap-2">
          <i data-feather="message-circle" class="w-4 h-4"></i>
          WhatsApp
        </a>
      </div>
    `;

    // Highlight current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('current');
      }
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);