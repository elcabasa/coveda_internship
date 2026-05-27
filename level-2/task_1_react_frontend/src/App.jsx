import { useEffect, useLayoutEffect, useMemo, useReducer, useState } from 'react';
import { PackagePlus } from 'lucide-react';
import { productsApi } from './services/products';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Toast from './components/Toast';

const THEME_STORAGE_KEY = 'stockroom-theme';

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const legacyTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  if (legacyTheme === 'dark' || legacyTheme === 'light') {
    return legacyTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme) {
  const isDark = theme === 'dark';

  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  localStorage.removeItem('theme');
}

const initialState = {
  products: [],
  isLoading: true,
  isSaving: false,
  error: '',
  notice: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, isLoading: true, error: '' };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, products: action.products };
    case 'LOAD_ERROR':
      return { ...state, isLoading: false, products: [], error: action.message };
    case 'SAVE_START':
      return { ...state, isSaving: true, error: '', notice: '' };
    case 'SAVE_SUCCESS':
      return {
        ...state,
        isSaving: false,
        products: action.products,
        notice: action.message,
      };
    case 'SAVE_ERROR':
      return { ...state, isSaving: false, error: action.message };
    case 'CLEAR_NOTICE':
      return { ...state, notice: '' };
    case 'CLEAR_ERROR':
      return { ...state, error: '' };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [query, setQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);

  async function loadProducts() {
    dispatch({ type: 'LOAD_START' });

    try {
      const products = await productsApi.getAll();
      dispatch({ type: 'LOAD_SUCCESS', products });
    } catch (error) {
      dispatch({ type: 'LOAD_ERROR', message: error.message });
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function handleThemeChange(nextTheme) {
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return state.products;
    }

    return state.products.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery),
    );
  }, [query, state.products]);

  const stats = useMemo(() => {
    const totalValue = state.products.reduce(
      (sum, product) => sum + Number(product.price || 0),
      0,
    );

    return {
      count: state.products.length,
      totalValue,
      average:
        state.products.length > 0 ? totalValue / state.products.length : 0,
    };
  }, [state.products]);

  async function refreshAfterMutation(message) {
    const products = await productsApi.getAll();
    dispatch({ type: 'SAVE_SUCCESS', products, message });
  }

  async function handleCreate(formData) {
    dispatch({ type: 'SAVE_START' });

    try {
      await productsApi.create(formData);
      await refreshAfterMutation('Product added to inventory.');
    } catch (error) {
      dispatch({ type: 'SAVE_ERROR', message: error.message });
    }
  }

  async function handleUpdate(formData) {
    if (!editingProduct) return;

    dispatch({ type: 'SAVE_START' });

    try {
      await productsApi.update(editingProduct.id, formData);
      setEditingProduct(null);
      await refreshAfterMutation('Product details updated.');
    } catch (error) {
      dispatch({ type: 'SAVE_ERROR', message: error.message });
    }
  }

  async function handleDelete() {
    if (!deletingProduct) return;

    dispatch({ type: 'SAVE_START' });

    try {
      await productsApi.remove(deletingProduct.id);
      setDeletingProduct(null);
      await refreshAfterMutation('Product removed from inventory.');
    } catch (error) {
      dispatch({ type: 'SAVE_ERROR', message: error.message });
    }
  }

  return (
    <div
      className="theme-app min-h-screen transition-colors"
      data-app-theme={theme}
    >
      <Header
        productCount={state.products.length}
        theme={theme}
        onRefresh={loadProducts}
        onThemeChange={handleThemeChange}
      />

      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="space-y-5">
          <section className="theme-surface rounded-lg border p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="theme-accent-tile flex size-11 items-center justify-center rounded-md">
                <PackagePlus size={22} />
              </div>
              <div>
                <h2 className="theme-text text-lg font-bold">
                  Add product
                </h2>
                <p className="theme-muted text-sm">
                  Keep the catalog current.
                </p>
              </div>
            </div>
            <ProductForm isSaving={state.isSaving} onSubmit={handleCreate} />
          </section>

          <StatsGrid stats={stats} />
        </aside>

        <section className="theme-surface min-w-0 rounded-lg border">
          <div className="theme-divider border-b p-5">
            <SearchBar
              query={query}
              resultCount={visibleProducts.length}
              onQueryChange={setQuery}
            />
          </div>
          <ProductGrid
            isLoading={state.isLoading}
            products={visibleProducts}
            onEdit={setEditingProduct}
            onDelete={setDeletingProduct}
          />
        </section>
      </main>

      <ProductModal
        mode="edit"
        product={editingProduct}
        isSaving={state.isSaving}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleUpdate}
      />

      <ProductModal
        mode="delete"
        product={deletingProduct}
        isSaving={state.isSaving}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDelete}
      />

      <Toast
        type="success"
        message={state.notice}
        onClose={() => dispatch({ type: 'CLEAR_NOTICE' })}
      />
      <Toast
        type="error"
        message={state.error}
        onClose={() => dispatch({ type: 'CLEAR_ERROR' })}
      />
    </div>
  );
}
