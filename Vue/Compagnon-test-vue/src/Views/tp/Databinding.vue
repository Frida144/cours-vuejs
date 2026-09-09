<template>
    <div>
        <img :src="imageUser" alt="Image">
        <input type="text" v-model="userInput" placeholder="Dr Mario">
        age{{userAge}}
        age[+10]{{ userAge + 10 }}
        nbreFetiche{{ nbreFetiche }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const imageUser :string = 'https://www.google.com/imgres?q=mario&imgurl=https%3A%2F%2Fmario.nintendo.com%2Fstatic%2F0f10f738d1f9aa8292fa7d93c35f2a07%2F02be2%2Fmario.png&imgrefurl=https%3A%2F%2Fmario.nintendo.com%2Ffr%2Fcharacters%2F&docid=ZVrJbkfcvYdXbM&tbnid=pWDoXee5VGb_4M&vet=12ahUKEwit6ZjpyuGWAxXi5AIHHQ_AI_YQnPAOegQINBAA..i&w=382&h=853&hcb=2&ved=2ahUKEwit6ZjpyuGWAxXi5AIHHQ_AI_YQnPAOegQINBAA';
const userInput = ref('');
const userAge = ref(30);
const nbreFetiche = ref(7);

</script>