<template>
    <div class="w-full px-6 py-10">
    <!-- Titre -->
    <h1 class="text-2xl font-bold text-center mb-8">
        Annuaire de l'équipe
    </h1>

    <!-- Grille des cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

        <div
            v-for="profile in profiles"
            :key="profile.id"
            class="card w-80 bg-base-300 shadow-xl"
        >

            <div class="card-body items-center text-center">

                <!-- Avatar -->
                <div class="avatar mb-2">
                    <div class="w-20 rounded-full">
                        <img
                            :src="profile.avatar"
                            :alt="profile.name"
                        />
                    </div>
                </div>

                <!-- Nom -->
                <h2 class="font-bold text-base">
                    {{ profile.name }}
                </h2>

                <!-- Rôle -->
                <div class="badge badge-secondary">
                    {{ profile.role }}
                </div>

                <!-- Bouton -->
                <div class="card-actions mt-2">
                   <RouterLink :to="{ name: 'profile-detail', params: { id: profile.id } }" class="btn btn-primary btn-sm">
                         Voir la fiche
                    </RouterLink>
                </div>

            </div>
        </div>

    </div>
</div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Profile {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

const profiles = ref([
    {
        id: 1,
        name: 'Alice Martin',
        role: 'Developpeuse Frontend',
        avatar: 'https://i.pravatar.cc/150?img=47',
        email: 'alice.martin@email.com',
        bio: 'Alice est développeuse frontend spécialisée dans Vue.js et les interfaces modernes.'
    },
    {
        id: 2,
        name: 'Bob Dupont',
        role: 'UX Designer',
        avatar: 'https://i.pravatar.cc/150?img=12',
        email: 'bob.dupont@email.com',
        bio: 'Bob est UX Designer. Il travaille sur l’expérience utilisateur et la conception d’interfaces intuitives.'
    },
    {
        id: 3,
        name: 'Charlie Cassagne',
        role: 'DevOps',
        avatar: 'https://i.pravatar.cc/150?img=13',
        email: 'charlie.cassagne@email.com',
        bio: 'Charlie est ingénieur DevOps et s’occupe de l’automatisation, du déploiement et de l’infrastructure.'
    },
])

onMounted(() => {
        profiles.value = profiles.value;
   
});
</script>