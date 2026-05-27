const API_BASE =
  import.meta.env.VITE_PRODUCTS_API_URL ||
  'https://coveda-internship.onrender.com/api/products';

async function request(path = '', options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.';

    try {
      const data = await response.json();
      message = data.error || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const productsApi = {
  getAll() {
    return request();
  },
  create(product) {
    return request('', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },
  update(id, product) {
    return request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  },
  remove(id) {
    return request(`/${id}`, {
      method: 'DELETE',
    });
  },
};
