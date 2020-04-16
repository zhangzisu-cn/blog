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
    <template v-else>
      <v-row justify="center">
        <v-col cols="auto">
          <v-progress-circular indeterminate size="64"/>
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

@Component({ components: { PostItem, PostMetaItem } })
export default class Post extends Vue {
  @Prop({ required: true })
  slug!: string

  post: BPost | null = null
  prev: BPost | null = null
  next: BPost | null = null

  @Watch('slug', { immediate: true })
  async _wslug () {
    this.post = null
    const res = await butter.post.retrieve(this.slug)
    const { data, meta } = res.data
    this.post = data
    this.prev = meta.previous_post
    this.next = meta.next_post
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.$store.commit('updateTitle', this.post!.title)
  }
}
</script>
