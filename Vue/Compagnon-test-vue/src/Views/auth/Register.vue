<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-6">
    <div class="card w-full max-w-lg bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-2xl mb-4">
          Créer un compte
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">

          <!-- Username -->
          <div class="form-control">
            <label class="label" for="username">
              <span class="label-text">Nom d'utilisateur</span>
            </label>

            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Votre nom d'utilisateur"
              class="input input-bordered w-full"
              :class="{ 'input-error': username.length > 0 && !usernameValid }"
              autocomplete="username"
            />

            <label class="label">
              <span
                v-if="username.length > 0 && !usernameValid"
                class="label-text-alt text-error"
              >
                Le nom d'utilisateur doit comporter au moins 3 caractères.
              </span>
            </label>

            <div v-if="adminWarning" class="alert alert-warning mt-2">
              <span>
                ⚠️ Le mot-clé « admin » est réservé et déconseillé.
              </span>
            </div>
          </div>

          <!-- Email -->
          <div class="form-control">
            <label class="label" for="email">
              <span class="label-text">Adresse email</span>
            </label>

            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="exemple@email.com"
              class="input input-bordered w-full"
              :class="{ 'input-error': email.length > 0 && !emailValid }"
              autocomplete="email"
            />

            <label class="label">
              <span
                v-if="email.length > 0 && !emailValid"
                class="label-text-alt text-error"
              >
                Veuillez saisir une adresse email valide.
              </span>
            </label>

            <div v-if="adminWarning" class="alert alert-warning mt-2">
              <span>
                ⚠️ L'adresse email contient le mot-clé réservé « admin ».
              </span>
            </div>
          </div>

          <!-- Password -->
          <div class="form-control">
            <label class="label" for="password">
              <span class="label-text">Mot de passe</span>
              <span class="label-text-alt">
                {{ passwordScore }}/5
              </span>
            </label>

            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Votre mot de passe"
              class="input input-bordered w-full"
              :class="{
                'input-error': password.length > 0 && passwordScore < 5,
                'input-success': passwordScore === 5
              }"
              autocomplete="new-password"
            />

            <!-- Barre de progression DaisyUI -->
            <progress
              class="progress w-full mt-3"
              :class="passwordProgressClass"
              :value="passwordScore"
              max="5"
            ></progress>

            <!-- Critères -->
            <div class="mt-3 space-y-1 text-sm">
              <p :class="passwordCriteria.length ? 'text-success' : 'text-error'">
                {{ passwordCriteria.length ? '✓' : '✗' }}
                Au moins 12 caractères
              </p>

              <p :class="passwordCriteria.uppercase ? 'text-success' : 'text-error'">
                {{ passwordCriteria.uppercase ? '✓' : '✗' }}
                Une lettre majuscule
              </p>

              <p :class="passwordCriteria.lowercase ? 'text-success' : 'text-error'">
                {{ passwordCriteria.lowercase ? '✓' : '✗' }}
                Une lettre minuscule
              </p>

              <p :class="passwordCriteria.number ? 'text-success' : 'text-error'">
                {{ passwordCriteria.number ? '✓' : '✗' }}
                Un chiffre
              </p>

              <p :class="passwordCriteria.special ? 'text-success' : 'text-error'">
                {{ passwordCriteria.special ? '✓' : '✗' }}
                Un caractère spécial
              </p>
            </div>
          </div>

          <!-- Confirm password -->
          <div class="form-control">
            <label class="label" for="confirmPassword">
              <span class="label-text">Confirmer le mot de passe</span>
            </label>

            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="Répétez votre mot de passe"
              class="input input-bordered w-full"
              :class="{
                'input-error':
                  confirmPassword.length > 0 && !passwordsMatch,
                'input-success':
                  confirmPassword.length > 0 && passwordsMatch
              }"
              autocomplete="new-password"
            />

            <label class="label">
              <span
                v-if="confirmPassword.length > 0 && !passwordsMatch"
                class="label-text-alt text-error"
              >
                Les mots de passe ne correspondent pas.
              </span>

              <span
                v-else-if="passwordsMatch"
                class="label-text-alt text-success"
              >
                Les mots de passe correspondent.
              </span>
            </label>
          </div>

          <!-- Terms -->
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-3">
              <input
                v-model="termsAccepted"
                type="checkbox"
                class="checkbox checkbox-primary"
              />

              <span class="label-text">
                J'accepte les conditions d'utilisation.
              </span>
            </label>
          </div>

          <!-- Global error -->
          <div
            v-if="submitted && !formValid"
            class="alert alert-error"
          >
            <span>
              Veuillez corriger les erreurs avant de continuer.
            </span>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="!formValid"
          >
            Créer mon compte
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const termsAccepted = ref(false)

const submitted = ref(false)
const adminWarning = ref(false)

// Anti-XSS username

function sanitizeInput(value) {
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

watch(username, (newValue) => {
  const sanitized = sanitizeInput(newValue)

  if (newValue !== sanitized) {
    username.value = sanitized
  }
})

// Validation username

const usernameValid = computed(() => {
  return username.value.trim().length >= 3
})

// Validation email

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emailValid = computed(() => {
  return emailRegex.test(email.value)
})

// Critères mot de passe

const passwordCriteria = computed(() => ({
  length: password.value.length >= 12,
  uppercase: /[A-Z]/.test(password.value),
  lowercase: /[a-z]/.test(password.value),
  number: /[0-9]/.test(password.value),
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password.value)
}))

// Score password : 0 à 5

const passwordScore = computed(() => {
  return Object.values(passwordCriteria.value)
    .filter(Boolean)
    .length
})

// Couleur progress DaisyUI

const passwordProgressClass = computed(() => {
  if (passwordScore.value <= 2) {
    return 'progress-error'
  }

  if (passwordScore.value <= 4) {
    return 'progress-warning'
  }

  return 'progress-success'
})

// Confirmation password

const passwordsMatch = computed(() => {
  return (
    password.value.length > 0 &&
    password.value === confirmPassword.value
  )
})

// Surveillance de sécurité

watch(
  [username, email],
  ([newUsername, newEmail]) => {
    const usernameContainsAdmin =
      newUsername.toLowerCase().includes('admin')

    const emailContainsAdmin =
      newEmail.toLowerCase().includes('admin')

    adminWarning.value =
      usernameContainsAdmin || emailContainsAdmin
  }
)

// Validation globale

const formValid = computed(() => {
  return (
    usernameValid.value &&
    emailValid.value &&
    passwordScore.value === 5 &&
    passwordsMatch.value &&
    termsAccepted.value
  )
})

// Soumission

function handleSubmit() {
  submitted.value = true

  if (!formValid.value) {
    return
  }

  // Ici : appel API / création du compte
  console.log('Formulaire valide', {
    username: username.value,
    email: email.value,
    password: password.value
  })
}
</script>
