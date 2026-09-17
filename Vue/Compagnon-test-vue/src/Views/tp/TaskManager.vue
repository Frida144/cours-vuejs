<template>
    <h1 class="text-2xl font-bold center">Gestionnaire de tâches</h1>
  <TaskForm @add-task="addTask"></TaskForm>
  <div
    role="alert"
    class="alert alert-success alert-dash"
    v-if="tasks.length > 0"
  >
    <span>Voici la liste des tâches :</span>
  </div>
  <div v-else class="alert alert-warning alert-dash">
    <span>Aucune tâche disponible pour le moment</span>
  </div>
  <TaskItem
    v-for="task in tasks"
    :key="task.id"
    :task="task"
    @toggle-complete="toggleTask"
    @delete-task="deleteTask"
  ></TaskItem>

</template>

<script setup lang="ts">
import { ref } from "vue";
import TaskForm from "../../components/TaskForm.vue";
import TaskItem from "../../components/TaskItem.vue";
import type { Task } from "../../types/Task";

const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Préparer le cours Vue 3",
    category: "Travail",
    isCompleted: true,
  },
  {
    id: 2,
    title: "Acheter du café",
    category: "Personnel",
    isCompleted: false,
  },
]);

const addTask = (task: Pick<Task, "title" | "category">) => {
  tasks.value.push({
    ...task,
    id: Date.now(),
    isCompleted: false,
  });
};

const toggleTask = (id: Task["id"]) => {
  const task = tasks.value.find((item) => item.id === id);
  if (task) task.isCompleted = !task.isCompleted;
};

const deleteTask = (id: Task["id"]) => {
  tasks.value = tasks.value.filter((task) => task.id !== id);
};
</script>

<style scoped lang="css"></style>
