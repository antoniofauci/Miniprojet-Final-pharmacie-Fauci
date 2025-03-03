<template>
  <div v-if="medicament" class="modal">
    <div class="modal-content">
      <h2>Modifier le médicament</h2>
      <form @submit.prevent="modifierMedicament">
        <label>Nom :</label>
        <input v-model="medicamentModifie.denomination" required />

        <label>Forme pharmaceutique :</label>
        <input v-model="medicamentModifie.formepharmaceutique" required />

        <label>Quantité :</label>
        <input type="number" v-model="medicamentModifie.qte" min="1" required />

        <label>Photo :</label>
        <input type="file" @change="handleFileUpload" accept="image/*" />

        <button type="submit">Sauvegarder</button>
        <button type="button" @click="$emit('fermer')">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps(["medicament"]);
const emit = defineEmits(["fermer", "miseAJour"]);

const medicamentModifie = ref({ ...props.medicament });

// Met à jour les données lorsque le médicament sélectionné change
watch(() => props.medicament, (nouveauMedicament) => {
  if (nouveauMedicament) medicamentModifie.value = { ...nouveauMedicament };
});

async function modifierMedicament() {
  try {
    const response = await fetch(`https://apipharmacie.pecatte.fr/api/12/medicaments`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medicamentModifie.value),
    });

    const data = await response.json();
    if (data.status === 1) {
      emit("miseAJour"); // Rafraîchit la liste des médicaments après modification
      emit("fermer"); // Ferme la fenêtre modale
    }
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
  }
}

// Gère l'encodage de la photo en Base64 avant l'envoi
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    medicamentModifie.value.photo = reader.result;
  };
  reader.readAsDataURL(file);
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

button {
  margin: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
