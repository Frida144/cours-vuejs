<template>
  <div class="max-lg:collapse bg-base-200 lg:mb-48 shadow-sm w-full rounded-md">
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
          <router-link to="/" class="btn btn-ghost">Accueil</router-link>
           <li>
            <details>
              <summary>Leçons</summary>
              <ul class="p-2 bg-base-100 w-40 z-1">
                <li><router-link to="/lessonIntroduction" class="btn btn-ghost">Introduction</router-link></li>
                <li><router-link to="/lessonSetup" class="btn btn-ghost">Configuration</router-link></li>
                <li><router-link to="/lessonSyntax" class="btn btn-ghost">Syntaxe</router-link></li>
                <li><router-link to="/lessonTextInterpolation" class="btn btn-ghost">Interpolation de texte</router-link></li>
                <li><router-link to="/lessonAttributeBinding" class="btn btn-ghost">Liaison d'attributs</router-link></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Tp</summary>
              <ul class="p-2 bg-base-100 w-40 z-1">
                <li><router-link to="/about" class="btn btn-ghost">À propos</router-link></li>
                <li><router-link to="/services" class="btn btn-ghost">Services</router-link></li>
                <li><router-link to="/contact" class="btn btn-ghost">Contact</router-link></li>
                <li><router-link to="/Cookie" class="btn btn-ghost">Cookies</router-link></li>
                <li><router-link to="/Privacy" class="btn btn-ghost">Confidentialité</router-link></li>
                <li><router-link to="/dataBinding" class="btn btn-ghost">Liaison de données</router-link></li>

              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Exercices</summary>
              <ul class="p-2 bg-base-100 w-40 z-1">
                <router-link to="/exInterpolation" class="btn btn-ghost">Interpolation</router-link>
                <li><button>Submenu 2</button></li>
              </ul>
            </details>
          </li>
          
          <li><button>Item 3</button></li>
        </ul>
      </div>
      <div class="navbar-end">
        <input type="text" placeholder="Search" class="input w-64 lg:w-auto" />
      </div>
    </div>

    <div class="collapse-content lg:hidden z-1">
      <ul class="menu">
        <li><button>Item 1</button></li>
        <li>
          <button>Parent</button>
          <ul>
            <li><button>Submenu 1</button></li>
            <li><button>Submenu 2</button></li>
          </ul>
        </li>
        <li><button>Item 3</button></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="css"></style>
