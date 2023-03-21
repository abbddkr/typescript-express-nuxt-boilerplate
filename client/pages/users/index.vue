<template>
    <div class="columns ">
      <div class="column">
        <h4 class="title is-4">
          {{ pageTitle }}
        </h4>
        <hr>
      </div>
    </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'admin',
  head(){
    return {
      title: this.pageTitle,
      meta: [
        { charset: 'utf-8'},
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name:'description',
          content: 'users content'
        }
      ]
    }
  },
  data(){
    return {
      pageTitle: "users Index",
    }
  }
};
</script>

<style >
.p-1 {
padding: 1em;
}
</style>
