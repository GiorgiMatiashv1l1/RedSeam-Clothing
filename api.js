// RedSeam Clothing API Integration
const API_BASE_URL = 'https://redberry-store-api.vercel.app';

class RedSeamAPI {
    constructor() {
        this.token = localStorage.getItem('redseam_token');
    }

    // Helper method to make API requests
    async makeRequest(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        // Add auth token if available
        if (this.token) {
            config.headers['Authorization'] = `Bearer ${this.token}`;
        }

        console.log('Making API request to:', url);
        console.log('Request config:', config);

        try {
            const response = await fetch(url, config);
            console.log('Response status:', response.status);
            
            const data = await response.json();
            console.log('Response data:', data);
            
            if (!response.ok) {
                throw new Error(data.message || `API request failed with status ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Authentication methods
    async login(email, password) {
        const data = await this.makeRequest('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        this.token = data.token;
        localStorage.setItem('redseam_token', this.token);
        return data;
    }

    async register(userData) {
        const formData = new FormData();
        formData.append('email', userData.email);
        formData.append('username', userData.username);
        formData.append('password', userData.password);
        formData.append('password_confirmation', userData.password_confirmation);
        
        if (userData.avatar) {
            formData.append('avatar', userData.avatar);
        }

        const data = await this.makeRequest('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
                // Don't set Content-Type for FormData
            },
            body: formData
        });
        
        this.token = data.token;
        localStorage.setItem('redseam_token', this.token);
        return data;
    }

    // Product methods
    async getProducts(page = 1, filters = {}, sort = '') {
        const params = new URLSearchParams({
            page: page.toString(),
            ...filters,
            sort
        });
        
        return await this.makeRequest(`/products?${params}`);
    }

    async getProduct(id) {
        return await this.makeRequest(`/products/${id}`);
    }

    // Cart methods
    async getCart() {
        return await this.makeRequest('/cart');
    }

    async addToCart(productId, quantity = 1, color = '', size = '') {
        return await this.makeRequest(`/cart/products/${productId}`, {
            method: 'POST',
            body: JSON.stringify({ quantity, color, size })
        });
    }

    async updateCartItem(productId, quantity) {
        return await this.makeRequest(`/cart/products/${productId}`, {
            method: 'PATCH',
            body: JSON.stringify({ quantity })
        });
    }

    async removeFromCart(productId) {
        return await this.makeRequest(`/cart/products/${productId}`, {
            method: 'DELETE'
        });
    }

    async checkout() {
        return await this.makeRequest('/cart/checkout', {
            method: 'POST'
        });
    }

    // Logout
    logout() {
        this.token = null;
        localStorage.removeItem('redseam_token');
    }
}

// Create global API instance
const api = new RedSeamAPI();

// Example usage functions
async function loadProducts(page = 1) {
    try {
        const response = await api.getProducts(page);
        displayProducts(response.data);
        updatePagination(response.meta, response.links);
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

function displayProducts(products) {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-description">
                <p class="description-text">${product.name}</p>
                <p class="price-tag">$${product.price}</p>
            </div>
        </div>
    `).join('');
}

function updatePagination(meta, links) {
    // Update pagination based on API response
    console.log('Current page:', meta.current_page);
    console.log('Total pages:', Math.ceil(meta.to / meta.per_page));
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts(1);
});
