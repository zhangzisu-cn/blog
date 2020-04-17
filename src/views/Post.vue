<template>
  <v-container>
    <template v-if="post">
      <v-row justify="center" no-gutters>
        <v-col cols="8">
          <v-row>
            <v-col cols="12">
              <post-item :post="post">
              </post-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <div class="title">Prev</div>
              <post-meta-item v-if="prev" :post="prev"/>
              <v-card v-else outlined>
                <v-card-text>This is the first post</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <div class="title">Next</div>
              <post-meta-item v-if="next" :post="next"/>
              <v-card v-else outlined>
                <v-card-text>This is the last post</v-card-text>
              </v-card>
            </v-col>
          </v-row>
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
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { BPost, butter } from '@/plugins/butter'
import PostItem from '@/components/PostItem.vue'
import PostMetaItem from '@/components/PostMetaItem.vue'
import Loading from '@/components/Loading.vue'

@Component({ components: { PostItem, PostMetaItem, Loading } })
export default class Post extends Vue {
  @Prop({ required: true })
  slug!: string

  err: Error | null = null

  post: BPost | null = null
  prev: BPost | null = null
  next: BPost | null = null

  @Watch('slug', { immediate: true })
  async _wslug () {
    this.load()
  }

  async load () {
    try {
      this.post = null
      this.err = null

      const res = await butter.post.retrieve(this.slug)
      const { data, meta } = res.data
      this.post = data
      this.prev = meta.previous_post
      this.next = meta.next_post
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$store.commit('title:update', this.post!.title)
    } catch (e) {
      this.err = e
    }
  }
}
</script>
