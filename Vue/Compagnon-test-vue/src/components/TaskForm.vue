<template>
    <div>
        <form @submit.prevent="addTask">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Titre</span>
                </label>
                <input v-model="title" type="text" placeholder="Entrez le titre de la tâche"
                    class="input input-bordered w-full" required />
            </div>

            <div class="form-control mt-4">
                <label class="label">
                    <span class="label-text">Catégorie</span>
                </label>
                <select v-model="category" class="select select-bordered w-full" required>
                    <option value="" disabled selected>Choisissez une catégorie</option>
                    <option value="travail">Travail</option>
                    <option value="personnel">Personnel</option>
                    <option value="sante">Urgent</option>
                </select>
            </div>

            <div class="form-control mt-4">
                <button type="submit" class="btn btn-primary w-full" :disabled="!title.trim()">
                    Ajouter
                </button>
            </div>
        </form>
     </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';    
const title = ref('');
const category = ref('');


const emit = defineEmits<{
    'add-task': [task: { 
        title: string; 
        category: string 
    }];
}>();

const addTask = () => {
    const taskTitle = title.value.trim();
    if (!taskTitle) return;

    emit('add-task', {
        title: taskTitle,
        category: category.value,
    });

    title.value = '';
    category.value = '';
};

</script>

<style scoped lang="css">
</style>