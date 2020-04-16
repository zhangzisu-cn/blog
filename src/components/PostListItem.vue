<template>
  <v-card hover @mouseenter="mouseenter" @mouseleave="mouseleave" @click="click">
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-text>{{ post.summary }}</v-card-text>
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

  click () {
    this.bgcur = false
    this.$router.push('/post/' + this.post.slug)
  }

  beforeDestroy () {
    if (this.bgcur) {
      this.$store.commit('bg:pop')
      this.bgcur = false
    }
  }
}
</script>
