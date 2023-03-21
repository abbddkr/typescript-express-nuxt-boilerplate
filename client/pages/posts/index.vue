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
      <div class="column">
        <div class="buttons has-addons is-right">
          <b-button
            tag="router-link"
            :to="{ path: 'posts/create' }"
            type="is-primary"
            icon-left="plus"
          />
        </div>
        <b-table
          :data="postData"
          detailed
          detail-key="id"
          :checked-rows.sync="checkedRows"
          checkable
          checkbox-position="left"
          checkbox-type="is-danger"
        >
          <template #detail="props">
            Preview Content:
            <p>{{ props.row.content.substring(0, 50) }}</p>
            <br />
            Created At:
            <p>{{ new Date(props.row.created_at).toLocaleString() }}</p>
          </template>

          <b-table-column field="id" label="ID" width="40" numeric>
            <template v-slot:header="{ column }">
              <b-tooltip :label="column.label">
                {{ column.label }}
              </b-tooltip>
            </template>
            <template v-slot="props">
              {{ props.row.id }}
            </template>
          </b-table-column>

          <b-table-column field="title" label="Post Title">
            <template v-slot:header="{ column }">
              <b-tooltip :label="column.label">
                {{ column.label }}
              </b-tooltip>
            </template>
            <template v-slot="props">
              {{ props.row.title }}
            </template>
          </b-table-column>

          <b-table-column field="actions" label="Actions">
            <template v-slot:header="{ column }">
              <b-tooltip :label="column.label">
                {{ column.label }}
              </b-tooltip>
            </template>
            <template v-slot="props">
              <b-button
                outlined
                type="is-danger"
                icon-right="delete"
                @click="deletePost(props.row.id)"
              />
              <b-button
                outlined
                type="is-secondary"
                tag="router-link"
                :to="{ path: `/posts/edit/${props.row.id}` }"
                icon-right="pen"
              />
              <b-button
                outlined
                type="is-success"
                tag="router-link"
                :to="{ path: `/posts/${props.row.id}` }"
                icon-right="magnify"
              />
            </template>
          </b-table-column>

          <template #bottom-left>
            <b>Total checked</b>: {{ checkedRows.length }}
          </template>
        </b-table>
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
      pageTitle: 'Posts',
      checkedRows: [],
      postData: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true,
        },
        {
          field: 'title',
          label: 'Post Title',
        },
        {
          field: 'actions',
          label: 'Actions',
        },
      ],
    }
  },
  methods: {
    async fetchPosts() {
      try {
        const posts = await this.$axios.$get('posts')
        if (posts) {
          this.postData = posts.posts
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deletePost(id) {
      try {
        const del = await this.$axios.$delete('posts/' + id)
        if (del) {
          this.fetchPosts()
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Deleted successfully',
            position: 'is-bottom',
            type: 'is-success',
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.fetchPosts()
  },
}
</script>

<style></style>
