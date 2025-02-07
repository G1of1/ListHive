import { create } from 'zustand';
// state management for the products 
export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
		// Takes the new product and send it using the API endpoint, then updates the state with the new product
	},
	getProducts: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.data });
		// Fetches the products from the API endpoint and updates the state with the products
	},
	deleteProduct: async (id) => {
		const res = await fetch(`/api/products/${id}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) {
			return { success: false, message: data.message };
		}
		set((state) => ({ products: state.products.filter((product) => product._id !== id) }));
		return { success: true, message: data.message };
		// Uses the id of the product to delete it from the API endpoint and updates the state by removing the product
	},
	updateProduct: async (id, updatedProduct) => {
		const res = await fetch(`/api/products/${id}`, {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(updatedProduct)
		})
		const data = await res.json();
		if(!data.success) {
			return { success: false, message: data.message};
		}
		set((state) => ({products: state.products.map((product) => product._id === id ? data.data : product)}))
		return {success: true, message: data.message}
		// Uses the id and the updated product to update the product in the API endpoint and updates the state with the updated product
	}
}
))