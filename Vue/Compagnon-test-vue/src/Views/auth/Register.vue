<template>
    <div class="container mx-auto p-4 md:p-8 max-w-xl">
        <div class="card bg-base-100 shadow-xl p-6 border border-base-300">
            <h2 class="card-title text-2xl font-bold mb-6 text-primary">Créer un compte</h2>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                
                <!-- Nom d'utilisateur (avec Anti-XSS) -->
                <div class="form-control">
                    <label class="label" for="username">
                        <span class="label-text font-semibold">Nom d'utilisateur</span>
                    </label>
                    <input 
                        id="username"
                        v-model="username"
                        type="text" 
                        placeholder="Ex: jdupont"
                        class="input input-bordered w-full"
                        :class="{ 'input-error': username && !isUsernameValid, 'input-success': isUsernameValid }"
                    />
                    <label class="label" v-if="username && !isUsernameValid">
                        <span class="label-text-alt text-error">3 caractères minimum (les balises HTML sont nettoyées)</span>
                    </label>
                </div>

                <!-- Email avec Regex -->
                <div class="form-control">
                    <label class="label" for="email">
                        <span class="label-text font-semibold">Adresse Email</span>
                    </label>
                    <input 
                        id="email"
                        v-model="email"
                        type="email" 
                        placeholder="john@example.com"
                        class="input input-bordered w-full"
                        :class="{ 'input-error': email && !isEmailValid, 'input-success': isEmailValid }"
                    />
                    <label class="label" v-if="email && !isEmailValid">
                        <span class="label-text-alt text-error">Veuillez entrer un email valide</span>
                    </label>
                </div>

                <!-- Mot de passe CNIL -->
                <div class="form-control">
                    <label class="label" for="password">
                        <span class="label-text font-semibold">Mot de passe</span>
                    </label>
                    <input 
                        id="password"
                        v-model="password"
                        type="password" 
                        placeholder="••••••••••••"
                        class="input input-bordered w-full"
                        :class="{ 'input-success': isPasswordValid }"
                    />
                    
                    <!-- Feedback visuel CNIL -->
                    <div class="mt-2 space-y-1">
                        <div class="flex justify-between text-xs">
                            <span>Force du mot de passe (Recommandation CNIL)</span>
                            <span class="font-bold">{{ passwordScore }}/5</span>
                        </div>
                        <progress 
                            class="progress w-full transition-all duration-300" 
                            :class="passwordProgressColor" 
                            :value="passwordScore" 
                            max="5"
                        ></progress>
                        <ul class="text-xs space-y-1 mt-2 text-base-content opacity-70">
                            <li :class="{ 'text-success font-bold': passwordCriteria.minLength }">✓ Au moins 12 caractères</li>
                            <li :class="{ 'text-success font-bold': passwordCriteria.hasUpper }">✓ Au moins une majuscule</li>
                            <li :class="{ 'text-success font-bold': passwordCriteria.hasLower }">✓ Au moins une minuscule</li>
                            <li :class="{ 'text-success font-bold': passwordCriteria.hasNumber }">✓ Au moins un chiffre</li>
                            <li :class="{ 'text-success font-bold': passwordCriteria.hasSpecial }">✓ Au moins un caractère spécial (!@#$%...)</li>
                        </ul>
                    </div>
                </div>

                <!-- Confirmation Mot de passe -->
                <div class="form-control">
                    <label class="label" for="confirmPassword">
                        <span class="label-text font-semibold">Confirmer le mot de passe</span>
                    </label>
                    <input 
                        id="confirmPassword"
                        v-model="confirmPassword"
                        type="password" 
                        placeholder="••••••••••••"
                        class="input input-bordered w-full"
                        :class="{ 'input-error': confirmPassword && !isPasswordMatch, 'input-success': isPasswordMatch && confirmPassword }"
                    />
                    <label class="label" v-if="confirmPassword && !isPasswordMatch">
                        <span class="label-text-alt text-error">Les mots de passe ne correspondent pas</span>
                    </label>
                </div>

                <!-- Conditions -->
                <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input type="checkbox" v-model="acceptTerms" class="checkbox checkbox-primary" />
                        <span class="label-text">J'accepte les conditions générales</span>
                    </label>
                </div>

                <!-- Toast Alerte Sécurité (Watcher) -->
                <div v-if="securityAlert" class="alert alert-warning shadow-lg text-sm">
                    <span>⚠️ Attention : Le mot-clé "{{ securityAlert }}" est réservé par le système.</span>
                </div>

                <!-- Bouton Valider -->
                <button 
                    type="submit" 
                    class="btn btn-primary w-full mt-4" 
                    :disabled="!isFormValid"
                >
                    S'inscrire
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// --- États réactifs du formulaire ---
const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const acceptTerms = ref<boolean>(false);
const securityAlert = ref<string | null>(null);

// --- expressions régulières (RegEx) ---
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

// --- Sanitisation Anti-XSS sur le pseudo ---
// Remplace les caractères dangereux par leurs entités HTML
const sanitizeInput = (input: string): string => {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

// --- Computed Properties pour validations simples ---
const isUsernameValid = computed<boolean>(() => {
    return username.value.trim().length >= 3;
});

const isEmailValid = computed<boolean>(() => {
    return EMAIL_REGEX.test(email.value);
});

// --- Computed Property pour la conformité CNIL du mot de passe ---
const passwordCriteria = computed(() => {
    const val = password.value;
    return {
        minLength: val.length >= 12,
        hasUpper: /[A-Z]/.test(val),
        hasLower: /[a-z]/.test(val),
        hasNumber: /[0-9]/.test(val),
        hasSpecial: SPECIAL_CHAR_REGEX.test(val)
    };
});

const passwordScore = computed<number>(() => {
    const c = passwordCriteria.value;
    return [c.minLength, c.hasUpper, c.hasLower, c.hasNumber, c.hasSpecial].filter(Boolean).length;
});

const isPasswordValid = computed<boolean>(() => {
    return passwordScore.value === 5;
});

const passwordProgressColor = computed<string>(() => {
    if (passwordScore.value <= 2) return 'progress-error';
    if (passwordScore.value <= 4) return 'progress-warning';
    return 'progress-success';
});

const isPasswordMatch = computed<boolean>(() => {
    return password.value.length > 0 && password.value === confirmPassword.value;
});

// Validation globale du formulaire
const isFormValid = computed<boolean>(() => {
    return (
        isUsernameValid.value &&
        isEmailValid.value &&
        isPasswordValid.value &&
        isPasswordMatch.value &&
        acceptTerms.value
    );
});

// --- Watchers ---

// 1. Sanitisation en temps réel du nom d'utilisateur
watch(username, (newVal) => {
    const sanitized = sanitizeInput(newVal);
    if (sanitized !== newVal) {
        username.value = sanitized;
    }
});

// 2. Surveillance du mot-clé réservé "admin"
watch([username, email], ([newUsername, newEmail]) => {
    if (newUsername.toLowerCase().includes('admin') || newEmail.toLowerCase().includes('admin')) {
        securityAlert.value = 'admin';
    } else {
        securityAlert.value = null;
    }
});

// --- Méthodes ---
function handleSubmit(): void {
    if (!isFormValid.value) return;

    alert(`Inscription réussie pour ${username.value} (${email.value}) !`);
    
    // Réinitialisation
    username.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    acceptTerms.value = false;
}
</script>