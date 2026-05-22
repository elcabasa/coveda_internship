/* =========================================
   UI Layer - rendering products, stats, alerts
   ========================================= */
const ui = {
  // DOM references
  el: {
    products: document.getElementById("products"),
    loader: document.getElementById("loader"),
    empty: document.getElementById("empty"),
    alert: document.getElementById("alert"),
    statTotal: document.getElementById("statTotal"),
    statValue: document.getElementById("statValue"),
    statAvg: document.getElementById("statAvg"),
  },

  // Toggle loader visibility
  showLoader(show) {
    this.el.loader.classList.toggle("hidden", !show);
  },

  // Render the list of products into the grid
  render(products) {
    this.el.products.innerHTML = "";
    this.el.empty.classList.toggle("hidden", products.length > 0);

    products.forEach((p) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-id">#${p.id}</div>
        <div class="product-name">${this.escape(p.name)}</div>
        <div class="product-price">$${Number(p.price).toFixed(2)}</div>
        <div class="product-actions">
          <button class="btn btn-ghost btn-small" data-action="edit" data-id="${p.id}">Edit</button>
          <button class="btn btn-danger btn-small" data-action="delete" data-id="${p.id}">Delete</button>
        </div>
      `;
      this.el.products.appendChild(card);
    });
  },

  // Update dashboard stat cards
  updateStats(products) {
    const total = products.length;
    const value = products.reduce((sum, p) => sum + Number(p.price || 0), 0);
    const avg = total ? value / total : 0;
    this.el.statTotal.textContent = total;
    this.el.statValue.textContent = `$${value.toFixed(2)}`;
    this.el.statAvg.textContent = `$${avg.toFixed(2)}`;
  },

  // Flash alert (auto-dismiss)
  alert(message, type = "success") {
    const a = this.el.alert;
    a.textContent = message;
    a.className = `alert ${type}`;
    setTimeout(() => a.classList.add("hidden"), 3000);
  },

  // Prevent HTML injection in product names
  escape(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },
};
