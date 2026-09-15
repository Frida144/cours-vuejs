<template>
    <div class="card w-full max-w-md bg-blue-400 shadow-xl my-4 text-white mx-auto">
        <div class="card-body">
            <h2 class="card-title text-xl font-bold justify-between">
                👤 {{ friend.name }}
                <span class="badge" :class="friend.premium ? 'badge-warning' : 'badge-ghost'">
                    {{ friend.premium ? 'Premium' : 'Standard' }}
                </span>
            </h2>

            <button class="btn btn-sm btn-outline mt-2" @click="toggleDetails">
                {{ showDetails ? 'Cacher les détails' : 'Afficher les détails' }}
            </button>

            <div v-if="showDetails" class="space-y-2 mt-2">
                <p class="flex items-center gap-2">
                    <span class="badge badge-outline">ID</span>
                    {{ friend.id }}
                </p>

                <p class="flex items-center gap-2">
                    <span class="badge badge-outline">📞</span>
                    {{ friend.phone }}
                </p>

                <p class="flex items-center gap-2">
                    <span class="badge badge-outline">📧</span>
                    {{ friend.email }}
                </p>
            </div>

            <button class="btn btn-sm btn-primary mt-4" @click="updatePremium(friend.id)">
                Mettre à jour le statut Premium
            </button>
        </div>
    </div>
</template>

Explication

showDetails est une ref booléenne, initialisée à false : les détails sont cachés par défaut.
toggleDetails inverse sa valeur à chaque clic (!showDetails.value).
Le bouton appelle cette méthode via @click.
Le v-if="showDetails" sur le bloc contenant id/téléphone/email fait que ce bloc n'est même pas rendu dans le DOM tant que showDetails vaut false (contrairement à v-show qui le cacherait juste en CSS).

Une fois cette partie fonctionnelle, dis-moi quand tu veux passer à la Phase 2 (defineEmits + bouton Update Premium).

oui vas y

Moving into the next phase of the task.

Solution

vue
<script setup lang="ts">
import { ref } from 'vue';

export interface Friend {
    id: string;
    name: string;
    phone: string;
    email: string;
    premium: boolean;
}

defineProps<{
    friend: Friend;
}>();

const emit = defineEmits<{
    'mon-event-premium-update': [id: string];
}>();

const showDetails = ref(false);

function toggleDetails() {
    showDetails.value = !showDetails.value;
}

function updatePremium(id: string) {
    emit('mon-event-premium-update', id);
}
</script>