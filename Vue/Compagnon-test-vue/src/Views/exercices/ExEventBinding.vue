<template>
    <div class="flex flex-col items-center justify-center py-2">
    <h1>Exercice Event Binding Mode : Composition</h1>

<button @click="increment(100)" class="btn btn-primary bg-success">+</button>
<p>Le nombre: {{count}}</p>
<button @click="decrement(55)" class="btn btn-primary bg-error">-</button>
        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const increment = (value: number) => {
    count.value += value;
};
const decrement = (value: number) => {
  count.value -= value;
};

</script>