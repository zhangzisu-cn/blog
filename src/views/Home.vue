<template>
  <v-row justify="space-around">
    <v-col cols="10" style="padding-top: 0;">
      <post-list :posts="posts">
      </post-list>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { butter, BPost } from '@/plugins/butter'
import PostList from '@/components/PostList.vue'

@Component({ components: { PostList } })
export default class Home extends Vue {
  posts: BPost[] = []

  async created () {
    const res = await butter.post.list()
    this.posts = res.data.data
    this.$store.commit('updateTitle', 'Blog Posts')
  }
}
</script>
