<template>
  <div>
    <body>
      <p>Affichage</p>
        <ul id="example-1">
        <li v-for="article in articles" :key="article.nom">
            {{ article.nom }}
        </li>
        </ul>
      
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
    </body>
  </div>
</template>

<script>
module.exports = {
  data () {
      return {
        articles: {
            composant: "",
            marque: "",
            nom: "",
            prix: 0,
            image: ""
        }
      }
  },
}
</script>