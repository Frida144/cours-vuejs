<template>
  <header class="header bg-base-200 lg:mb-48 shadow-sm w-full rounded-md">
    <input id="navbar-1-toggle" class="peer hidden" type="checkbox" />
    <label
      for="navbar-1-toggle"
      class="fixed inset-0 hidden max-lg:peer-checked:block"
    ></label>
    <div class="collapse-title navbar">
      <div class="navbar-start">
        <label for="navbar-1-toggle" class="btn btn-ghost lg:hidden">
          <svg
            aria-label="Menu"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <button class="btn btn-ghost text-xl">Frida.vue</button>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <router-link to="/lessonIntroduction" class="btn btn-ghost justify-start">Accueil</router-link>
           <li>
            <details>
             <summary>Leçons</summary>
                <ul class="card w-fit bg-base-100 shadow-xl">
                <li><router-link to="/lessonSetup" class="btn btn-ghost justify-start">Configuration</router-link></li>
                <li><router-link to="/lessonSyntax" class="btn btn-ghost justify-start">Syntaxe</router-link></li>
                <li><router-link to="/lessonTextInterpolation" class="btn btn-ghost justify-start">Interpolation de texte</router-link></li>
                <li><router-link to="/lessonAttributeBinding" class="btn btn-ghost justify-start">Liaison d'attributs</router-link></li>
                <li><router-link to="/lessonEventBinding" class="btn btn-ghost justify-start">Liaison d'événements</router-link></li>
                </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Tp</summary>
              <ul class="card w-fit bg-base-100 shadow-xl">
                <li><router-link to="/about" class="btn btn-ghost justify-start">À propos</router-link></li>
                <li><router-link to="/dataBinding" class="btn btn-ghost justify-start">Liaison de données</router-link></li>

              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Exercices</summary>
              <ul class="card w-fit bg-base-100 shadow-xl">
                <li><router-link to="/exInterpolation" class="btn btn-ghost justify-start">Interpolation</router-link></li>
                <li><router-link to="/exEventBinding" class="btn btn-ghost justify-start">Liaison d'événements</router-link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <input type="text" placeholder="Search" class="input w-64 lg:w-auto" />
      </div>
    </div>

  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="css"></style>
