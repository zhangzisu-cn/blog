<template>
  <v-card @mouseenter="mouseenter" @mouseleave="mouseleave">
    <v-card-title>
      <div>
        <a class="title" @click="click">{{ post.title }}</a>
        <div>
          <v-chip small class="pa-2" label color="transparent"><v-avatar left tile><v-img :src="post.author.profile_image"/></v-avatar>{{post.author.first_name}} {{post.author.last_name}}</v-chip>
          <v-chip small class="pa-2 ml-1" label color="transparent"><v-icon left>mdi-clock-outline</v-icon>{{ new Date(post.published).toLocaleString() }}</v-chip>
        </div>
      </div>
    </v-card-title>
    <v-card-text>{{ post.summary }}</v-card-text>
    <v-divider/>
    <div class="pl-1 pr-1">
      <tag-chip class="ma-1" v-for="(tag, i) in post.tags" :key="'t' + i" :tag="tag"/>
      <category-chip class="ma-1" v-for="(cat, i) in post.categories" :key="'c' + i" :category="cat"/>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BPost } from '@/plugins/butter'
import TagChip from '@/components/TagChip.vue'
import CategoryChip from '@/components/CategoryChip.vue'

@Component({ components: { TagChip, CategoryChip } })
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
