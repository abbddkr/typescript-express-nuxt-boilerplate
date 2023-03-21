<template>
  <div>
    <section class="main-content columns">
      <div class="container column is-6">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',

}
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
 body{
  font-family: 'Roboto', sans-serif;
 }
.main-content {
  background-color: #21D4FD;
  background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
}
</style>
