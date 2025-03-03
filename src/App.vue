<template>
  <div class="container">
    <div class="navbar">Pharmacie 12 - Gestion des Médicaments</div>
    <AjoutMedicament @medicamentAjoute="getMedicament" />
    <AffichMedicament ref="affichageMedicament" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AffichMedicament from "./components/AffichMedicament.vue";
import AjoutMedicament from "./components/AjoutMedicament.vue";

const affichageMedicament = ref(null);

// Récupère la liste des médicaments après un ajout
function getMedicament() {
  affichageMedicament.value?.getMedicament();
}
</script>
