import './header.css';
class AppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header class="header">
        <div class="container">
          <h1>Racepals</h1>
          <nav>
            <!-- Navigation will go here -->
          </nav>
        </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);