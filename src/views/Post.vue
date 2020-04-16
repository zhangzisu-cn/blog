<template>
  <v-row>
    <v-col>
      <post-item v-if="post" :post="post">
      </post-item>
      <div v-else>
        Loading...
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import PostItem from '@/components/PostItem.vue'
import { BPost, butter } from '../plugins/butter'

@Component({ components: { PostItem } })
export default class Post extends Vue {
  @Prop({ required: true })
  slug!: string

  post: BPost | null = null

  @Watch('slug', { immediate: true })
  async _wslug () {
    this.post = null
    const res = await butter.post.retrieve(this.slug)
    const { data } = res.data
    this.post = data
  }
}
</script>
