<template>
    <div class="flex flex-col items-center justify-center py-2">
    <h1>Exercice Event Binding Mode : Composition</h1>

<button @click="increment(100)" class="btn btn-primary bg-success">+</button>
<p>Le nombre: {{count}}</p>
<button @click.right="decrement(55)" class="btn btn-primary bg-error">-</button>
        <p>{{ afficherNameUsername() }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const username = ref('');
const count = ref(0);
const increment = (value: number) => {
    count.value += value;
};
const decrement = (value: number) => {
  count.value -= value;
};
function afficherNameUsername() {
    console.log(username.value);
    if (username.value =='') {
        return "test";

    }else {
        return "autre test";
    }
}

</script>
