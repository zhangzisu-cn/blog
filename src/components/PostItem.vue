<template>
  <v-card>
    <v-card-title v-text="post.title"/>
    <v-divider/>
    <v-card-text v-html="post.body" style="overflow: hidden;"/>
    <v-divider/>
    <v-card-actions>
      <v-chip pill color="primary"><v-avatar left><v-img :src="post.author.profile_image"/></v-avatar>{{post.author.first_name}} {{post.author.last_name}}</v-chip>
      <v-chip color="secondary"><v-icon left>mdi-clock-outline</v-icon>{{ new Date(post.published).toLocaleString() }}</v-chip>
      <v-chip v-for="(tag, i) in post.tags" :key="'t' + i"><v-icon left>mdi-label</v-icon>{{tag.name}}</v-chip>
      <v-chip v-for="(cat, i) in post.categories" :key="'c' + i"><v-icon left>mdi-file-tree</v-icon>{{cat.name}}</v-chip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { BPost } from '@/plugins/butter'

@Component
export default class PostItem extends Vue {
  @Prop({ required: true })
  post!: BPost

  bgcur = false

  @Watch('post.slug', { immediate: true })
  _wslug () {
    this.bgPop()
    this.bgPush()
  }

  beforeDestroy () {
    this.bgPop()
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
