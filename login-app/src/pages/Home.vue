<script>
export default {
  name: "Home",
  beforeMount() {
    let isLogin = false;
    if (!isLogin) {
      this.$router.push("/home");
    }
  },
};
</script>

<template><h1>Xin chao</h1></template>

<style></style>
