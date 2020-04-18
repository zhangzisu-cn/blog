<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="9" md="8" lg="6">
        <v-row justify="center">
          <v-col cols="12">
            <v-card>
              <v-card-actions>
                <v-text-field v-model.trim.lazy="queryInput" label="Criteria" placeholder="Type your query here"
                  :hint="postCount ? `Showing ${(curPage - 1) * postPerPage + 1}-${Math.min(curPage * postPerPage, postCount)} of ${postCount} posts` : 'No posts found'"
                  persistent-hint append-icon="mdi-magnify" @click:append="query = queryInput" clearable @keydown.enter="query = queryInput"/>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <template v-if="posts">
          <post-list :posts="posts"/>
          <v-row justify="center">
            <v-col cols="auto">
              <v-pagination :length="pageCount" v-model="curPage"/>
            </v-col>
          </v-row>
        </template>
        <template v-else-if="err">
          <v-row justify="center">
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
        </template>
        <template v-else>
          <v-row justify="center">
            <v-col cols="auto">
              <loading/>
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { butter, BPost } from '@/plugins/butter'
import PostList from '@/components/PostList.vue'
import Loading from '@/components/Loading.vue'
import { RawLocation } from 'vue-router'

@Component({ components: { PostList, Loading } })
export default class Search extends Vue {
  @Prop() readonly page?: string
  @Prop() readonly q?: string

  posts: BPost[] | null = null
  err: Error | null = null
  queryInput = ''
  query = ''
  postCount = 1
  pageCount = 1
  postPerPage = 1
  curPage = 1

  created () {
    this.$store.commit('title:update', 'Search')
  }

  generateParams () {
    const params = {
      page: this.curPage,
      // eslint-disable-next-line @typescript-eslint/camelcase
      page_size: this.postPerPage
    }
    return params
  }

  async load () {
    try {
      this.posts = this.err = null

      const res = await butter.post.search(this.query, this.generateParams())
      const { data, meta } = res.data
      this.posts = data
      this.postCount = meta.count
      this.pageCount = Math.ceil(this.postCount / this.postPerPage)
    } catch (e) {
      this.err = e
    }
  }

  @Watch('page', { immediate: true })
  _wPage () {
    this.curPage = parseInt(this.page || '1')
    this.load()
  }

  @Watch('curPage')
  _wCurPage () {
    if (this.curPage === parseInt(this.page || '1')) {
      return
    }
    const query = { ...this.$route.query }
    if (this.curPage === 1) {
      delete query.page
    } else {
      query.page = this.curPage.toString()
    }
    this.go(query)
  }

  @Watch('q', { immediate: true })
  _wQ () {
    this.query = this.q || ''
    this.load()
  }

  @Watch('query')
  _wQuery () {
    this.queryInput = this.query
    if (this.query === (this.q || '')) {
      return
    }
    const query = { ...this.$route.query }
    if (this.query) {
      query.q = this.query
    } else {
      delete query.q
    }
    this.go(query)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  go (query: any) {
    const next: RawLocation = {
      path: this.$route.path,
      query,
      params: this.$route.params
    }
    this.$router.push(next)
  }
}
</script>
