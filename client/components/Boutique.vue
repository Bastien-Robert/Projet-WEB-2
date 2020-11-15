<template>
  <div>
    <form @submit.prevent="addComposant">
          <h2>Nouveau produit à ajouter</h2>
          <select type="text" v-model="newComposant.type">
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
          <input type="text" v-model="newComposant.marque" placeholder="Marque du composant" required>
          <input type="text" v-model="newComposant.nom" placeholder="Nom du composant" required>
          <input type="number" v-model="newComposant.prix" placeholder="Prix" required>
          <input type="text" v-model="newComposant.image" placeholder="Lien vers l'image" required>
          <button class="add" type="submit">Ajouter</button>
      </form>

      <form>
        <h2>Filtre</h2>
        <select type="text" v-model="of_type">
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
        <button class="add" type="submit">Filtrer</button>
      </form>
      <div id="container_composants">
        <div class="composant" v-for="composant in composants" :key="composant.id">
          <div v-if="IsTypeOf(of_type, composant.type)">
          <h1>{{composant.type}}</h1>
          <p class="delete" @click="deleteComposant(composant.id)">X</p>
          <p>{{composant.marque}} · {{composant.nom}} · {{composant.prix}}</p>
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

<style scoped>
#container_composants {
  display: flex;
  flex-wrap: wrap;
}

.composant{
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 3px 3px 5px black;
  border-radius: 7px;
  position: relative;
  background: rgb(69,68,94);
  background: linear-gradient(0deg, rgba(69,68,94,1) 0%, rgba(237,237,239,1) 35%, rgba(255,255,255,1) 72%);
}

.composant img {
  width: 250px;
}

.delete {
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
  margin: 0;
}
</style>