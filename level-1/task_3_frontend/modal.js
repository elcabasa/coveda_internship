/* =========================================
   Modal Layer - edit & confirm dialogs
   ========================================= */
const modal = {
  editEl: document.getElementById("modal"),
  confirmEl: document.getElementById("confirm"),

  // Open edit modal pre-filled with product data
  openEdit(product) {
    document.getElementById("editId").value = product.id;
    document.getElementById("editName").value = product.name;
    document.getElementById("editPrice").value = product.price;
    this.editEl.classList.remove("hidden");
  },

  closeEdit() {
    this.editEl.classList.add("hidden");
  },

  // Promise-based confirm dialog
  confirm() {
    return new Promise((resolve) => {
      this.confirmEl.classList.remove("hidden");
      const ok = document.getElementById("confirmOk");
      const cancel = document.getElementById("confirmCancel");

      const cleanup = (result) => {
        this.confirmEl.classList.add("hidden");
        ok.removeEventListener("click", onOk);
        cancel.removeEventListener("click", onCancel);
        resolve(result);
      };
      const onOk = () => cleanup(true);
      const onCancel = () => cleanup(false);

      ok.addEventListener("click", onOk);
      cancel.addEventListener("click", onCancel);
    });
  },

  // Wire up close buttons + overlay click
  init() {
    document.getElementById("modalClose").addEventListener("click", () => this.closeEdit());
    document.getElementById("modalCancel").addEventListener("click", () => this.closeEdit());
    this.editEl.addEventListener("click", (e) => {
      if (e.target === this.editEl) this.closeEdit();
    });
  },
};
