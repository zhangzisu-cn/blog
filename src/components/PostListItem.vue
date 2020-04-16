<template>
  <v-card :to="'/post/' + post.slug" hover @mouseenter="mouseenter" @mouseleave="mouseleave">
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-text>{{ post.summary }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BPost } from '@/plugins/butter'

@Component
export default class PostListItem extends Vue {
  @Prop({ required: true })
  post!: BPost

  bgcur = false

  mouseenter () {
    if (this.post.featured_image && !this.bgcur) {
      this.$store.commit('bg:push', this.post.featured_image)
      this.bgcur = true
    }
  }

  mouseleave () {
    if (this.bgcur) {
      this.$store.commit('bg:pop')
      this.bgcur = false
    }
  }

  beforeDestroy () {
    if (this.bgcur) {
      this.$store.commit('bg:pop')
      this.bgcur = false
    }
  }
}
</script>
