<template>
  <div>
    <h1>Articles Manager (Firebase Realtime Database)</h1>
<FirebaseAddArticle></FirebaseAddArticle>
<FirebaseListArticle></FirebaseListArticle>
  </div>
</template>

<script setup lang='js'>
import FirebaseListArticle from '../../components/FirebaseListArticle.vue';
import FirebaseAddArticle from '../../components/FirebaseAddArticle.vue';
</script>

<style scoped lang="css">
</style>