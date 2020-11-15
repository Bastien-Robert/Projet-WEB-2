<template>
    <div id ="connexion">
        <form @submit.prevent="log">
            <div class="div-connexion">
                <input class="texte-connexion" type="text" v-model="email" placeholder="Entrez votre e-mail"/>
                <br/>
                <input class="texte-connexion" type="text" v-model="password" placeholder="Entrez votre mot de passe"/>
            </div>
            <br/>
            <div class="div-button">
                <button class="button-connexion" type="submit">Envoyer</button>
                <br/>
                <a class="button-connexion" href="#/register">Creer votre compte</a>
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