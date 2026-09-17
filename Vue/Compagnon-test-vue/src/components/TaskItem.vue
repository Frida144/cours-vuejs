<template>
  <div class="card card-border bg-base-100 shadow-sm">
    <div class="card-body flex-row items-center gap-4 p-4">
    <input @change="emit('toggle-complete', task.id)" type="checkbox" class="checkbox checkbox-primary" :checked="task.isCompleted" />
    <span
      class="grow text-base"
      :class="{ 'line-through opacity-60': task.isCompleted }"
    >
      {{ task.title }}
    </span>
    <span class="badge badge-outline">{{ task.category }}</span>
    <button @click="emit('delete-task', task.id)" class="btn btn-error btn-sm" type="button" >
      Supprimer
    </button>
  </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../types/Task'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (event: 'toggle-complete', id: Task['id']): void;
  (event: 'delete-task', id: Task['id']): void;
}>();
</script>

<style scoped lang="css">
</style>