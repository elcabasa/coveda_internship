/* =========================================
   App - main logic & initialization
   ========================================= */
const app = {
  products: [],     // full product list from API
  filtered: [],     // filtered by search

  // Load products from API and refresh UI
  async load() {
    ui.showLoader(true);
    try {
      this.products = await api.getAll();
      this.applySearch();
    } catch (err) {
      ui.alert(err.message || "Could not load products", "error");
      this.products = [];
      this.applySearch();
    } finally {
      ui.showLoader(false);
    }
  },

  // Apply search filter & re-render
  applySearch() {
    const q = document.getElementById("search").value.trim().toLowerCase();
    this.filtered = q
      ? this.products.filter((p) => p.name.toLowerCase().includes(q))
      : [...this.products];
    ui.render(this.filtered);
    ui.updateStats(this.products);
  },

  // Validate add/edit form fields
  validate(name, price) {
    if (!name) return "Product name is required";
    if (price === "" || isNaN(price) || Number(price) < 0)
      return "Please enter a valid price";
    return null;
  },

  // Handle Add Product submission
  async handleAdd(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value;
    const err = this.validate(name, price);
    if (err) return ui.alert(err, "error");

    try {
      await api.create({ name, price: Number(price) });
      ui.alert("Product added successfully");
      e.target.reset();
      this.load();
    } catch (err) {
      ui.alert(err.message, "error");
    }
  },

  // Handle Edit Product submission
  async handleEdit(e) {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const name = document.getElementById("editName").value.trim();
    const price = document.getElementById("editPrice").value;
    const err = this.validate(name, price);
    if (err) return ui.alert(err, "error");

    try {
      await api.update(id, { name, price: Number(price) });
      modal.closeEdit();
      ui.alert("Product updated successfully");
      this.load();
    } catch (err) {
      ui.alert(err.message, "error");
    }
  },

  // Delegate clicks on product grid (Edit/Delete buttons)
  async handleGridClick(e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const product = this.products.find((p) => p.id === id);
    if (!product) return;

    if (btn.dataset.action === "edit") {
      modal.openEdit(product);
    } else if (btn.dataset.action === "delete") {
      const ok = await modal.confirm();
      if (!ok) return;
      try {
        await api.remove(id);
        ui.alert("Product deleted");
        this.load();
      } catch (err) {
        ui.alert(err.message, "error");
      }
    }
  },

  // Wire up all event listeners
  init() {
    modal.init();
    document.getElementById("addForm").addEventListener("submit", (e) => this.handleAdd(e));
    document.getElementById("editForm").addEventListener("submit", (e) => this.handleEdit(e));
    document.getElementById("search").addEventListener("input", () => this.applySearch());
    ui.el.products.addEventListener("click", (e) => this.handleGridClick(e));
    this.load();
  },
};

// Start the app once DOM is ready
document.addEventListener("DOMContentLoaded", () => app.init());
