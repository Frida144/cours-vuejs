<template>
    <div class="card w-full max-w-md bg-violet-200 shadow-xl my-4">
        <h2 class="card-title mx-2">{{ unAmiName }}</h2>
        <!-- <h2 class="card-title">Composant OneFriend.vue</h2> -->
        <div class="card-body">
            <h3 class="card-title text-primary text-sm">
                👤 {{ unAmiName }} - ami : {{ premiumData ? 'En Or ..🏆' : 'En Plomb' }}
                <div class="badge" :class="premiumData ? 'badge-success' : 'badge-ghost'">
                    {{ premiumData ? 'Premium' : 'Standard' }}
                </div>
            </h3>
            <div class="btn-group" role="group" aria-label="Basic example">
                <!-- <button @click="modifPremium" type="button" class="btn btn-xs btn-primary">Modif Props Premium</button> -->
                <button @click="updatePremium" type="button" class="btn btn-xs btn-secondary ">Update Premium</button>
                <button @click="afficherDetails" type="button" class="btn btn-xs btn-info mx-2">{{ detailsVisibles ? 'Masquer' : 'Afficher' }} Details</button>
                <button @click="emit('delete-friend',unAmiId)" type="button" class="btn btn-xs btn-error">🗑 Supprimer</button>
            </div>

            <div v-if="detailsVisibles" id="details-friend" class="space-y-2 text-base-content">
                <p class="flex items-center gap-2">
                    <span class="badge badge-outline badge-primary">ID</span>
                    {{ unAmiId }}
                </p>

                <p class="flex items-center gap-2">
                    <span class="badge badge-outline badge-secondary">📞</span>
                    {{ unAmiPhone }}
                </p>

                <p class="flex items-center gap-2">
                    <span class="badge badge-outline badge-accent">📧</span>
                    {{ unAmiMail }}
                </p>
            </div>
        </div>
    </div>
</template>


<script setup lang="js">
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
    unAmiId: {
        type: String,
        required: true,
    },
    unAmiName: {
        type: String,
        required: true,
    },
    unAmiPhone: {
        type: String,
        required: true,
    },
    unAmiMail: {
        type: String,
        required: true,
    },
    unAmiPremium: {
        type: Boolean,
        required: false,
        default: true,
    },
})

// const emit = defineEmits(['mon-event-premium-update','deleteFriend'])
const emit = defineEmits({
    'mon-event-premium-update': (id) => {
    if (id) {
      return true;
    } else {
      console.warn('Alerte Maximale : C\'est la catastrophe !!!!!!');
      console.error('ON A PAS DE ID Dans le event mon-event-premium-update');
      return false;
    }
  },
    'delete-friend': (id) => {
    if (id) {
      return true;
    } else {
      console.warn('C\'est la catastrophe !!!!!!');
      console.error('ON A PAS DE ID Dans le event deleteFriend');
      return false;
    }
  }
})

//Attention INTERDIT de modifier une props directement
// On utilise une ref pour stocker la props
// Et ensuite on pourra faire des modif sur la ref qui contient la props
const premiumData = ref(props.unAmiPremium)
const detailsVisibles = ref(false);

// const modifPremium = () => {
//     premiumData.value = !premiumData.value
// }

function afficherDetails() {
  detailsVisibles.value = !detailsVisibles.value;
}

function updatePremium() {
  premiumData.value = !premiumData.value;
  // emit('mon-event-premium');
  emit('mon-event-premium-update',props.unAmiId);
//   emit('mon-event-premium-update');
}
</script>
