<template>

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
      log(){
          this.$emit("log-user", this.email, this.password);
      },
  },
};

</script>