<template>
    <div class="p-6 my-3 max-w-md mx-auto bg-base-100 border border-base-300 rounded-xl shadow-lg space-y-4">
        <h2 class="text-xl font-bold flex items-center gap-2">
            Géolocalisation Navigateur API + VueUse
        </h2>

        <!-- 1. En cours de chargement -->
        <div v-if="!isSupported" class="alert alert-warning text-sm">
            La géolocalisation n'est pas supportée par votre navigateur.
        </div>

        <!-- 2. Gestion des erreurs (ex: accès refusé par l'utilisateur) -->
        <div v-else-if="error" class="alert alert-error text-sm">
            Erreur : {{ error.message || 'Impossible de récupérer votre position.' }}
        </div>

        <!-- 3. Recherche en cours -->
        <div v-else-if="coords.latitude === Infinity" class="flex items-center gap-2 text-gray-500">
            <span class="loading loading-spinner loading-sm"></span>
            Recherche de votre position...
        </div>

        <!-- 4. Coordonnées récupérées avec succès -->
        <div v-else class="space-y-3">
            <div class="grid grid-cols-2 gap-2 text-sm font-mono bg-base-200 p-3 rounded-lg">
                <div>
                    <span class="text-gray-500 block text-xs">LATITUDE</span>
                    <span class="font-bold">{{ coords.latitude.toFixed(5) }}</span>
                </div>
                <div>
                    <span class="text-gray-500 block text-xs">LONGITUDE</span>
                    <span class="font-bold">{{ coords.longitude.toFixed(5) }}</span>
                </div>
                <div class="col-span-2 pt-1 border-t border-base-300 text-xs text-gray-400">
                    Précision : ~{{ Math.round(coords.accuracy) }} mètres
                </div>
            </div>

            <!-- Lien dynamique vers Google Maps -->
            <a :href="googleMapsUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block gap-2">
                Voir sur Google Maps 🗺️
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGeolocation } from '@vueuse/core';

// 1. Initialise le composable de géolocalisation
const { coords, isSupported, error } = useGeolocation({
    immediate: true, // Lance la demande dès le montage du composant
    enableHighAccuracy: true, // Demande une précision maximale (ex: GPS sur mobile)
});

// 2. Computed qui génère le lien Google Maps réactif à partir des coordonnées
const googleMapsUrl = computed<string>(() => {
    // Ici coords.value le composable useGeolocation renvoie un objet dasn lequel coords est lui même une ref
    return `https://www.google.com/maps?q=${coords.value.latitude},${coords.value.longitude}`;
});
</script>