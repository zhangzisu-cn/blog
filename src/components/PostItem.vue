<template>
  <v-card>
    <v-card-title v-text="post.title"/>
    <v-divider/>
    <v-card-text>
      <article class="markdown-body line-numbers" v-html="post.body" ref="content"/>
    </v-card-text>
    <v-divider/>
    <div class="pl-1 pr-1">
      <v-chip class="ma-1" label pill color="primary"><v-avatar left tile><v-img :src="post.author.profile_image"/></v-avatar>{{post.author.first_name}} {{post.author.last_name}}</v-chip>
      <v-chip class="ma-1" label color="secondary"><v-icon left>mdi-clock-outline</v-icon>{{ new Date(post.published).toLocaleString() }}</v-chip>
      <v-chip class="ma-1" label v-for="(tag, i) in post.tags" :key="'t' + i"><v-icon left>mdi-label</v-icon>{{tag.name}}</v-chip>
      <v-chip class="ma-1" label v-for="(cat, i) in post.categories" :key="'c' + i"><v-icon left>mdi-file-tree</v-icon>{{cat.name}}</v-chip>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { BPost } from '@/plugins/butter'
import Prism from '@/plugins/prism'

@Component
export default class PostItem extends Vue {
  @Prop({ required: true })
  post!: BPost

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
    if (this.post.featured_image === back) {
      this.bgcur = true
    } else if (this.post.featured_image) {
      this.$store.commit('bg:push', this.post.featured_image)
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
    if (this.post.featured_image) {
      this.$store.commit('bg:push', this.post.featured_image)
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
