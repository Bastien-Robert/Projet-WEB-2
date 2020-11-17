<template>
    <div id ="connexion">
        <form @submit.prevent="log">
            <div class="div-connexion">
                <p class="titre">Connectez-vous :</p>
                <input class="texte-connexion" type="text" v-model="email" placeholder="Entrez votre e-mail"/>
                <br/>
                <input class="texte-connexion" type="text" v-model="password" placeholder="Entrez votre mot de passe"/>
            </div>
            <br/>
            <div class="div-button">
                <button class="button-connexion" type="submit">Envoyer</button>
                <br/>
                <p class="texte-connexion">Cliquez ici pour <a class="button-connexion" href="#/Register">creer votre compte</a></p>
            </div>
        </form>
    </div>
</template>

<script>
module.exports = {
  props: {
  },
  data() {
      return {
          email: "",
          password: "",
      };
  },
  methods: {
      log(){
          this.$emit("log-user", this.email, this.password);
      },
  },
};

</script>