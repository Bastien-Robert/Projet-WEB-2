<template>
    <div id ="login">
        <form @submit.prevent="log">
            <input type="text" v-model="email" placeholder="Entrez votre e-mail"/>
            <input type="text" v-model="password" placeholder="Entrez votre mot de passe"/>
            <button type="submit">Envoyer</button>
            <a href="#/connexion">Creer votre compte</a>
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