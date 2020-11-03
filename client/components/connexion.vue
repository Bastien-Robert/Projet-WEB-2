<template>
    <div id ="connexion">
        <form @submit.prevent="log">
            <input type="text" v-model="email" placeholder="Entrez votre e-mail"/>
            <input type="text" v-model="password" placeholder="Entrez votre mot de passe"/>
            <button type="submit">Envoyer</button>
            <a href="#/register">Creer votre compte</a>
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