<template>
    <div>
        <!-- Indicateur fixe en haut de l'écran avec la progression du scroll -->
        <div
            class=" bg-base-100/80 backdrop-blur-md border border-base-300 shadow-md px-3 py-1.5 rounded-full text-xs font-mono z-50">
            Scroll Y : <span class="text-primary font-bold">{{ Math.round(y) }}px</span>
        </div>

        <!-- Bouton "Retour en haut" animé (apparaît seulement si y > 300px) -->
        <Transition name="fade">
            <button v-if="y > 300" @click="scrollToTop"
                class="fixed bottom-6 right-6 btn btn-circle btn-primary shadow-xl z-50" aria-label="Retour en haut">
                ⬆️ 
            </button>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';

// 1. Récupère la position réactive du défilement de la fenêtre
const { y } = useWindowScroll({ behavior: 'smooth' });

// 2. Fonction pour réinitialiser le défilement tout en douceur
function scrollToTop(): void {
    y.value = 0;
}
</script>

<style scoped>
/* Animation d'apparition/disparition fluide */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>