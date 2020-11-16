<template>
  <div>
        <form @submit.prevent="addComposant">
          <h2 class="titre-composants">Nouveau produit à ajouter</h2>
          <select class="texte-boutique" type="text" v-model="newComposant.type">
              <option value="">Type de composant</option>
              <option value="CPU">CPU</option>
              <option value="GPU">GPU</option>
              <option value="RAM">RAM</option>
              <option value="Carte-mère">Carte-mère</option>
              <option value="Refroidissement">Refroidissement</option>
              <option value="Stockage">Stockage</option>
              <option value="Alimentation">Alimentation</option>
              <option value="Boîtier">Boîtier</option>
          </select>
          <input class="texte-boutique" type="text" v-model="newComposant.marque" placeholder="Marque du composant" required>
          <input class="texte-boutique" type="text" v-model="newComposant.nom" placeholder="Nom du composant" required>
          <input class="texte-boutique" type="number" v-model="newComposant.prix" placeholder="Prix" required>
          <input class="texte-boutique" type="text" v-model="newComposant.image" placeholder="Lien vers l'image" required>
          <button class="button-boutique" type="submit">Ajouter</button>
      </form>

      <form>
        <h2 class="titre-composants">Filtre</h2>
        <select class="texte-boutique" type="text" v-model="of_type">
          <option value="">Tout</option>
          <option value="CPU">CPU</option>
          <option value="GPU">GPU</option>
          <option value="RAM">RAM</option>
          <option value="Carte-mère">Carte-mère</option>
          <option value="Refroidissement">Refroidissement</option>
          <option value="Stockage">Stockage</option>
          <option value="Alimentation">Alimentation</option>
          <option value="Boîtier">Boîtier</option>
        </select>
      </form>
      <div class="container_composants">
        <div class="composant" v-for="composant in composants" :key="composant.id">
          <div v-if="IsTypeOf(of_type, composant.type)">
          <h1 class="texte-composant">{{composant.type}}</h1>
          <p class="delete" @click="deleteComposant(composant.id)">X</p>
          <p class="texte-composant">{{composant.marque}} · {{composant.nom}} · {{composant.prix}}</p>
          <img :src="composant.image" alt="composant">
          </div>
        </div>
      </div>  
  </div>
</template>

<script>
module.exports = {
  props: {
    composants: { type: Array, default: [] }
  },
  data () {
      return {
        newComposant: {
            type: "",
            marque: "",
            nom: "",
            prix: 0,
            image: ""
        },
        of_type:"",
      }
  },
  methods: {
    addComposant () {
      this.$emit('add-composant', this.newComposant)
    },
    deleteComposant(composantid) {
      this.$emit('delete-composant', composantid)
    },
    IsTypeOf(of_type, composantType){
      if ((of_type==composantType)||(of_type=="")){
        return true;
      }
      else{
        return false;
      }

    }
  }
}
</script>
