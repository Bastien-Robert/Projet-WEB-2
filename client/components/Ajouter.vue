<template>
  <div>
      <p>Ajout</p>
      <form @submit.prevent="addComposant">
          <h2>Nouveau produit à ajouter</h2>
          <select type="text" v-model="newComposant.composant">
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
          <input type="text" v-model="newComposant.image" placeholder="Lien vers l'image">
          <button class="Add" type="submit">Ajouter</button>
      </form>
      <a href="#/register">Retirer un composant</a>
      <a href="#/register">Afficher les composants</a>
      
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <div class="entete" id="bas">
        <br /><br />
        <p class="crédit">
          "L'intérieur des PC" est un site créé par 3 étudiants de L2 à EFREI
          Paris à l'occasion d'un projet de programmation en 2020
        </p>
        <nav role="navigation" class="primary-navigation" id="bas">
          <ul>
            <li><a href="Quisommesnous.html">Qui sommes-nous</a></li>
          </ul>
        </nav>
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
            composant: "",
            marque: "",
            nom: "",
            prix: 0,
            image: ""
        }
      }
  },
  methods: {
    addComposant () {
      this.$emit('add-composants', this.newComposant)
    }
  }
}
</script>