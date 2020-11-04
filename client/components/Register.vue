<template>
    <div id ="login">
        <form @submit.prevent="save">
            <input type="text" v-model="email" placeholder="Entrez votre e-mail"/>
            <input type="text" v-model="password" placeholder="Entrez votre mot de passe"/>
            <button type="submit">Envoyer</button>
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