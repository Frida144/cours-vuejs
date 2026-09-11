<template>
    <div class="min-h-screen flex items-center justify-center p-6">

        <div
            v-if="profile"
            class="card w-full max-w-lg bg-base-300 shadow-xl"
        >
            <div class="card-body items-center text-center">

                <!-- Avatar -->
                <div class="avatar mb-4">
                    <div class="w-32 rounded-full">
                        <img
                            :src="profile.avatar"
                            :alt="profile.name"
                        />
                    </div>
                </div>

                <!-- Nom -->
                <h1 class="text-3xl font-bold">
                    {{ profile.name }}
                </h1>

                <!-- Rôle -->
                <div class="badge badge-secondary mt-2">
                    {{ profile.role }}
                </div>

                <!-- Informations -->
                <div class="w-full mt-6 text-left space-y-4">

                    <!-- Email -->
                    <div>
                        <p class="font-bold text-lg">
                            Adresse email
                        </p>

                        <p class="text-base-content/70">
                            {{ profile.email }}
                        </p>
                    </div>

                    <!-- Rôle -->
                    <div>
                        <p class="font-bold text-lg">
                            Rôle
                        </p>

                        <p class="text-base-content/70">
                            {{ profile.role }}
                        </p>
                    </div>

                    <!-- Biographie -->
                    <div>
                        <p class="font-bold text-lg">
                            Biographie
                        </p>

                        <p class="text-base-content/70">
                            {{ profile.bio }}
                        </p>
                    </div>

                </div>

                <!-- Retour -->
                <div class="card-actions mt-6">
                    <RouterLink
                        to="/profiles"
                        class="btn btn-primary"
                    >
                        Retour à la liste
                    </RouterLink>
                </div>

            </div>
        </div>

        <!-- Profil introuvable -->
        <div
            v-else
            class="alert alert-error max-w-lg"
        >
            <div>
                <h2 class="font-bold">
                    Profil introuvable
                </h2>

                <p>
                    Aucun profil ne correspond à l'identifiant
                    {{ userId }}.
                </p>
            </div>

            <RouterLink
                to="/profiles"
                class="btn btn-sm"
            >
                Retour
            </RouterLink>
        </div>

    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'


// Récupération de la route
const route = useRoute()

// Récupération de l'id présent dans l'URL
const userId = route.params.id


// Tableau des profils
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
    {
        id: 4,
        name: 'David Bernard',
        role: 'Backend Developer',
        avatar: 'https://i.pravatar.cc/150?img=11',
        email: 'david.bernard@email.com',
        bio: 'David développe des applications backend robustes et des API performantes.'
    }
])


// Profil sélectionné
const profile = ref<typeof profiles.value[0] | undefined>()


// Recherche du profil lorsque le composant est monté
onMounted(() => {
    profile.value = profiles.value.find(
        (profile) => profile.id === Number(userId)
    )
})
</script>
