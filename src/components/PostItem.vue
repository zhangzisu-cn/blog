<template>
  <v-card>
    <v-card-title>
      <div>
        <div class="title" v-html="post.title.rendered"/>
        <div>
          <v-chip class="pa-1" small label color="transparent">
            <v-icon left>mdi-clock-outline</v-icon>
            {{ new Date(post.date_gmt).toLocaleString() }}
          </v-chip>
          <v-chip class="ml-1" small label color="#0073aa" dark :href="post.link" target="_blank">
            <v-icon left>mdi-wordpress</v-icon>
            View on WordPress
          </v-chip>
        </div>
      </div>
    </v-card-title>
    <v-divider/>
    <v-card-text>
      <article class="markdown-body line-numbers" v-html="post.content.rendered" ref="content"/>
    </v-card-text>
    <v-divider/>
    <div class="pl-1 pr-1">
      <tag-chip class="ma-1" v-for="(tag, i) in post._embedded['wp:term'][1]" :key="'t' + i" :tag="tag"/>
      <category-chip class="ma-1" v-for="(cat, i) in post._embedded['wp:term'][0]" :key="'c' + i" :category="cat"/>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Prism from '@/plugins/prism'
import TagChip from '@/components/TagChip.vue'
import CategoryChip from '@/components/CategoryChip.vue'
import { PostSchema } from '@/plugins/wordpress'

@Component({ components: { TagChip, CategoryChip } })
export default class PostItem extends Vue {
  @Prop({ required: true }) readonly post!: PostSchema

  bgcur = false

  @Watch('post.slug')
  _wslug () {
    this.highlight()
    this.bgPop()
    this.bgPush()
  }

  mounted () {
    this.highlight()

    const stack = this.$store.state.bg
    const back = stack[stack.length - 1]
    const fimg = this.post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url
    if (fimg === back) {
      this.bgcur = true
    } else if (fimg) {
      this.$store.commit('bg:push', fimg)
      this.bgcur = true
    }
  }

  beforeDestroy () {
    this.bgPop()
  }

  highlight () {
    Prism.highlightAllUnder(this.$refs.content as Element)
  }

  bgPush () {
    const fimg = this.post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url
    if (fimg) {
      this.$store.commit('bg:push', fimg)
      this.bgcur = true
    }
  }

  bgPop () {
    if (this.bgcur) {
      this.$store.commit('bg:pop')
      this.bgcur = false
    }
  }
}
</script>
