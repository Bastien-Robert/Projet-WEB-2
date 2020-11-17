<template>
    <div id ="login">
        <form @submit.prevent="save">
            <div class="div-connexion">
                <p class="titre">Créé votre compte :</p>
                <input class="texte-connexion" type="text" v-model="email" placeholder="Entrez votre e-mail"/>
                <br/>
                <input class="texte-connexion" type="text" v-model="password" placeholder="Entrez votre mot de passe"/>
            </div>
            <br/>
            <div class="div-button">   
                <button class="button-connexion" type="submit">Envoyer</button>
                <br/>
                <p class="texte-connexion">Cliquez ici pour vous <a class="button-connexion" href="#/Connexion">connecter</a></p>
            </div>
        </form>
    </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data() {
      return {
          email: "",
          password: "",
      };
  },
  methods: {
      save(){
          this.$emit("save-user", this.email, this.password);
      },
  },
};

</script>