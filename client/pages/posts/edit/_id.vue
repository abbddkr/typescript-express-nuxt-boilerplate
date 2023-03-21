<template>
  <section>
    <div class="columns">
      <div class="column">
        <h4 class="title is-4">Edit {{ editPost.title }}</h4>
        <hr />
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <b-field label="Post Title">
          <b-input
            placeholder="Intro. to Nuxt"
            v-model="editPost.title"
            required
            ref="editPostForm"
            minlength="10"
            maxlength="100"
            type="text"
          ></b-input>
        </b-field>
        <b-field label="Post Content">
          <b-input
            type="textarea"
            v-model="editPost.content"
            ref="editPostForm"
            required
            minlength="30"
            placeholder="Hello, in this article ..."
          >
          </b-input>
        </b-field>
        <hr />
        <div class="column is-12">
          <div class="buttons has-addons is-right">
            <b-button type="is-primary" outlined @click="updatePost"
              >Update</b-button
            >
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
  data() {
    return {
      editPost: {},
      user: {},
    }
  },
  methods: {
    async getPost() {
      try {
        const post = await this.$axios.$get('posts/' + this.$route.params.id)
        if (post) {
          this.editPost = post.post
          this.user = post.post.user
        }
      } catch (error) {
        console.log(error)
      }
    },
    async updatePost() {
      try {
        if (this.$refs.editPostForm.checkHtml5Validity() === true) {
          const updatePost = await this.$axios.$post(
            'posts/' + this.$route.params.id,
            this.editPost
          )
          if (updatePost) {
            this.$axios.showSuccess(
              'ID Post: ' + this.$route.params.id + 'has been updated!'
            )
            this.$router.push({ path: '/posts/' })
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.getPost()
  },
}
</script>
