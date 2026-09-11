<template>
  <div class="flex flex-col items-center justify-center py-2">
    <h1 class="text-2xl font-bold">TP Réactivité: numéro gagnant</h1>

    <button @click="increment(1)" class="btn btn-primary bg-success">+1</button>
    <p :class="couleurNombre">Le nombre: {{ leNombre }}</p>
    <button @click="increment(5)" class="btn btn-primary bg-error">+5</button>
    <p>{{ message }}</p>
    <button @click="renitialiser()" class="btn btn-primary bg-warning">
      Réinitialiser
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const leNombre = ref(0);
// Computed pour déterminer la couleur du nombre en fonction de sa valeur
const couleurNombre = computed(() => {
  if (leNombre.value > 30) {
    return "text-error";
  }
  if (leNombre.value === 7) {
    return "text-success";
  }
  return "text-info";
});
// Computed pour afficher un message en fonction de la valeur de leNombre
const message = computed(() => {
  if (leNombre.value < 7) {
    return "ESSAIE ENCORE";
  }
  if (leNombre.value === 7) {
    return "7... BINGO!";
  }
  return "Tu as dépassé le nombre 7 !";
});
// Fonction pour incrémenter le nombre
const increment = (value: number) => {
  leNombre.value += value;
};
// Fonction pour réinitialiser le nombre à zéro

const renitialiser = () => {
  leNombre.value = 0;
};
// Watcher pour surveiller les changements de leNombre et afficher une alerte si le nombre dépasse 30
watch(leNombre, (nouveauNombre) => {
  if (nouveauNombre > 30) {
    alert("BCP BCP mais alors bcp TROP !");
    leNombre.value = 0;
    setTimeout(() => {
      return "On repart à zéro !";
    }, 3000);
  }
});
</script>
