<template>
    <h1 class="text-2xl font-bold">Catalogue de produits</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <fieldset class="fieldset">
        <legend class="fieldset-legend">Recherche</legend>
        <input type="text" class="input" v-model="searchQuery" placeholder="Rechercher un produit" />
        </fieldset>

         <fieldset class="fieldset">
        <legend class="fieldset-legend">Catégorie</legend>
        <select type="text" class="input" v-model="selectedCategory">
            <option value="">Toutes</option>
            <option value="Électronique">Électronique</option>
            <option value="Vêtements">Vêtements</option>
            <option value="Accessoires">Accessoires</option>
        </select>
        </fieldset>
        <fieldset class="fieldset">
        <legend class="fieldset-legend">Filtres</legend>
        <input type="checkbox" v-model="onlyInStock" id="inStockCheckbox" />
        <label for="inStockCheckbox">En stock uniquement</label>
        </fieldset>
    </div>
    <div>Résultats: {{ finalFilteredProducts.length }} produits trouvés</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <div
            v-for="product in finalFilteredProducts"
            :key="product.id"
            class="card bg-base-100 shadow-xl rounded-box"
        >
            <figure class="px-10 pt-10">
                <img
                    :src="product.image"
                    :alt="product.title"
                    class="rounded-xl"
                />
            </figure>
            <div class="card-body items-center text-center" >
                <h2 class="card-title">{{ product.title }}</h2>
                <p>Catégorie: {{ product.category }}</p>
                <p>Prix: {{ product.price }} €</p>
                <p v-if="product.inStock" class="text-success">En stock</p>
                <p v-else class="text-error">Rupture de stock</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    inStock: boolean;
    image: string;
}

// Données initiales
const products = ref<Product[]>([
   { id: 1, title: 'Casque Sans Fil Pro', category: 'Électronique', price: 199, inStock: true, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
   { id: 2, title: 'Clavier Mécanique RGB', category: 'Électronique', price: 129, inStock: false, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500' },
   { id: 3, title: 'Veste en Jean Vintage', category: 'Vêtements', price: 89, inStock: true, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500' },
   { id: 4, title: 'Chaussures de Running', category: 'Vêtements', price: 110, inStock: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
   { id: 5, title: 'Gourde Isotherme 1L', category: 'Accessoires', price: 25, inStock: true, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500' },
   { id: 6, title: 'Montre Connectée Sport', category: 'Électronique', price: 249, inStock: false, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' }
]);
const searchQuery = ref('');
const selectedCategory = ref('');
const onlyInStock = ref(false);
// Computed pour filtrer les produits en fonction de la catégorie et du stock
const filteredProducts = computed(() => {
    return products.value.filter(product => {
        if (selectedCategory.value && product.category !== selectedCategory.value) {
            return false;
        }
        if (onlyInStock.value && !product.inStock) {
            return false;
        }
        return true;
    });
});

// Computed pour filtrer les produits en fonction de la recherche
const finalFilteredProducts = computed(() => {
    if (searchQuery.value.trim().toLocaleLowerCase() === '') {
        return filteredProducts.value;
    } else {
        return filteredProducts.value.filter(product =>
            product.title.toLowerCase().includes(searchQuery.value.trim().toLocaleLowerCase())
            )
        }}
    )


</script>