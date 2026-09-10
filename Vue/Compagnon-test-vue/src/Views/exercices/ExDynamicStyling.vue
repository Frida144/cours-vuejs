 <template>
    <h1 class="text-2xl font-bold text-center">Exercice Dynamic Styling Mode : Composition</h1>
    <div class="flex flex-row gap-10 items-center justify-center py-2">
         <div>
            <button :style="dynamicStyle1" class="btn btn-primary" @click="changeColor1">Carte 1 via style</button>
        </div>
         <div>
             <button :style="dynamicStyle2" class="btn btn-primary" @click="changeColor2">Carte 2 via style</button>
         </div>
    </div>
     <div class="flex flex-row gap-10 items-center justify-center py-2">
      <button :class="{'btn-success': isActive, 'btn-secondary': !isActive}" class="btn btn-primary" @click="toggleStatus">Changer le statut via class : Actif</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const dynamicStyle1 = ref({
    color: 'white',
    backgroundColor: 'black',
  });
  
  const dynamicStyle2 = ref({
    color: 'white',
    backgroundColor: 'pink',
  });
  
  function changeColor1() {
    dynamicStyle1.value.color = dynamicStyle1.value.color === 'white' ? 'red' : 'white';
    dynamicStyle1.value.backgroundColor = dynamicStyle1.value.backgroundColor === 'black' ? 'white' : 'black';
  }

  function changeColor2() {
    dynamicStyle2.value.color = dynamicStyle2.value.color === 'white' ? 'black' : 'white';
    dynamicStyle2.value.backgroundColor = dynamicStyle2.value.backgroundColor === 'pink' ? 'yellow' : 'pink';
  }


  const isActive = ref(true);
  
  function toggleStatus() {
    isActive.value = !isActive.value;
  }
  </script>