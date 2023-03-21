<template>
  <section>
    <div class="columns">
      <div class="column">
        <h4 class="title is-4">
          {{ pageTitle }}
        </h4>
        <hr />
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <b-field label="Post Title">
          <b-input
            placeholder="Intro. to Nuxt"
            v-model="post.title"
            required
            ref="postForm"
            icon="pen"
            minlength="10"
            maxlength="100"
          ></b-input>
        </b-field>
        <b-field label="Post Content">
          <b-input
            type="textarea"
            v-model="post.content"
            ref="postForm"
            required
            minlength="30"
            placeholder="Hello, in this article ..."
          >
          </b-input>
        </b-field>

        <hr />
        <div class="column is-12">
          <div class="buttons has-addons is-right">
            <b-button type="is-secondary" @click="resetForm" outlined>Reset</b-button>
            <b-button type="is-primary" outlined @click="save">Save</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'admin',
  head() {
    return {
      title: this.pageTitle,
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: 'posts content',
        },
      ],
    }
  },
  data() {
    return {
      pageTitle: 'Create New Post',
      post: {},
      dropFiles: [],
    }
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    resetForm(){
      this.post = {}
    },
    async save(){
      try {
        if (this.$refs.postForm.checkHtml5Validity()) {
          const post = await this.$axios.$post('posts', this.post);
          if(post){
            this.$axios.showSuccess('A new post has been created');
            this.$router.push({path: '/posts'});
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>

<style>
</style>
