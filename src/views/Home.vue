<template>
  <v-container>
    <v-row justify="space-around">
      <v-col xs="12" md="8" lg="6">
        <post-list v-if="posts" :posts="posts">
        </post-list>
        <v-row v-else-if="err" justify="center">
          <v-col cols="auto">
            <v-card class="text-center" flat>
              <v-icon size="96px">mdi-alert-circle-outline</v-icon>
              <v-card-title>An error occurred</v-card-title>
              <v-card-text>
                <code>{{ err.message }}</code>
              </v-card-text>
              <v-divider/>
              <v-card-actions>
                <v-btn color="primary" outlined block @click="load">Reload</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else justify="center">
          <v-col cols="auto">
            <loading/>
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
import Loading from '@/components/Loading.vue'

@Component({ components: { PostList, Loading } })
export default class Home extends Vue {
  posts: BPost[] | null = null
  err: Error | null = null

  created () {
    this.load()
  }

  async load () {
    try {
      this.posts = null
      this.err = null

      const res = await butter.post.list()
      this.posts = res.data.data
      this.$store.commit('title:update', 'Posts')
    } catch (e) {
      this.err = e
    }
  }
}
</script>
