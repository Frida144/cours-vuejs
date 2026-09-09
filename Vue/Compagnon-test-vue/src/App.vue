<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <app-header />
  <!-- router-view est le composant qui va afficher la page correspondante à la route -->
  <router-view />
  <app-footer />

</template>


<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>