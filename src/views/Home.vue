<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="10" style="padding-top: 0;">
        <post-list v-if="posts" :posts="posts">
        </post-list>
        <v-row v-else justify="center">
          <v-col cols="auto">
            <v-progress-circular indeterminate size="64"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { butter, BPost } from '@/plugins/butter'
import PostList from '@/components/PostList.vue'

@Component({ components: { PostList } })
export default class Home extends Vue {
  posts: BPost[] | null = null

  async created () {
    const res = await butter.post.list()
    this.posts = res.data.data
    this.$store.commit('updateTitle', 'Posts')
  }
}
</script>
