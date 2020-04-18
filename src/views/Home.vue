<template>
  <v-container>
    <v-row justify="space-around">
      <v-col xs="12" md="8" lg="6">
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
export default class Home extends Vue {
  @Prop() page?: string
  @Prop() tag?: string
  @Prop() cat?: string

  posts: BPost[] | null = null
  err: Error | null = null
  pageCount = 1
  postPerPage = 10
  curPage = 1

  generateParams () {
    // eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any
    const params: any = { page: this.curPage, page_size: this.postPerPage }
    // eslint-disable-next-line @typescript-eslint/camelcase
    if (this.tag)params.tag_slug = this.tag
    // eslint-disable-next-line @typescript-eslint/camelcase
    if (this.cat)params.category_slug = this.cat
    return params
  }

  async load () {
    try {
      this.posts = null
      this.err = null

      const res = await butter.post.list(this.generateParams())
      const { data, meta } = res.data
      this.posts = data
      this.pageCount = Math.ceil(meta.count / this.postPerPage)
      this.$store.commit('title:update', 'Posts')
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
    const next: RawLocation = {
      path: this.$route.path,
      query,
      params: this.$route.params
    }
    this.$router.push(next)
  }
}
</script>
