class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #A3B899;
          color: white;
          padding: 3rem 1rem;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .footer-column h3 {
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }
        .footer-link {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.5rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: white;
        }
        .footer-contact p {
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .footer-bottom {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }
        .whatsapp-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: white;
          color: #A3B899;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-weight: 500;
          transition: background-color 0.2s;
          text-decoration: none;
          margin-top: 1rem;
        }
        .whatsapp-button:hover {
          background-color: #f0f0f0;
        }
        @media (min-width: 768px) {
          .footer-container {
            grid-template-columns: repeat(3, 1fr);
          }
          .footer-links {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      </style>
      <div class="footer-container">
        <div class="footer-about">
          <div class="footer-logo">Zen met Gwen</div>
          <p class="mb-4">Ontspanning en balans voor lichaam en geest.</p>
          <a href="https://wa.me/32498930036" class="whatsapp-button">
            <i data-feather="message-circle"></i>
            Contacteer ons
          </a>
        </div>
        
        <div class="footer-links">
          <div class="footer-column">
            <h3>Menu</h3>
            <a href="/" class="footer-link">Home</a>
            <a href="/yoga.html" class="footer-link">Yoga</a>
            <a href="/massage.html" class="footer-link">Massage</a>
          </div>
          
          <div class="footer-column">
            <h3>Informatie</h3>
            <a href="/yoga.html#pricing" class="footer-link">Prijzen yoga</a>
            <a href="/massage.html#pricing" class="footer-link">Prijzen massage</a>
            <a href="/yoga.html#schedule" class="footer-link">Lessenrooster</a>
            <a href="/yoga.html#pricing" class="footer-link">Cadeaubonnen</a>
          </div>
        </div>
        
        <div class="footer-contact">
          <h3>Contact</h3>
          <p><i data-feather="smartphone"></i> 0498 93 00 36</p>
          <p><i data-feather="mail"></i> gwen.deryck@telenet.be</p>
          <p><i data-feather="map-pin"></i> Hoogstraat 40, Hofstade 9308</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} Zen met Gwen - Alle rechten voorbehouden
      </div>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);