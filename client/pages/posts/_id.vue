<template>
  <section>
    <div class="columns">
      <div class="column">
        <h4 class="title is-4">Posts / {{ post.title }}</h4>
        <hr />
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        {{ post.content }}
      </div>
    </div>
    <hr />
    <div class="columns">
      <div class="column">
        Auhtor: <small>{{ user?.username }}</small>
      </div>
      <div class="column">
        Created At:
        <small>{{ new Date(post.created_at).toLocaleString() }}</small>
      </div>
      <div class="column">
        Updated At:
        <small>{{
          post.updated_at ? new Date(post.updated_at).toLocaleString() : 'N/A'
        }}</small>
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
      post: {},
      user: {},
    }
  },
  methods: {
    async getPost() {
      try {
        const post = await this.$axios.$get('posts/' + this.$route.params.id)
        if (post) {
          this.post = post.post
          this.user = post.post.user
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
