<template>
  <v-card @mouseenter="mouseenter" @mouseleave="mouseleave">
    <v-card-title>
      <div>
        <a class="title" @click="click" v-html="post.title.rendered"/>
        <div>
          <v-chip class="pa-1" small label color="transparent">
            <v-icon left>mdi-clock-outline</v-icon>
            {{ new Date(post.date_gmt + 'z').toLocaleString() }}
          </v-chip>
          <v-chip class="ml-1" small label color="#0073aa" dark :href="post.link" target="_blank">
            <v-icon left>mdi-wordpress</v-icon>
            View on WordPress
          </v-chip>
        </div>
      </div>
    </v-card-title>
    <v-card-text v-html="post.excerpt.rendered"/>
    <v-divider/>
    <div class="pl-1 pr-1">
      <tag-chip class="ma-1" v-for="(tag, i) in post._embedded['wp:term'][1]" :key="'t' + i" :tag="tag"/>
      <category-chip class="ma-1" v-for="(cat, i) in post._embedded['wp:term'][0]" :key="'c' + i" :category="cat"/>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { PostSchema } from '@/plugins/wordpress'
import TagChip from '@/components/TagChip.vue'
import CategoryChip from '@/components/CategoryChip.vue'

@Component({ components: { TagChip, CategoryChip } })
export default class PostListItem extends Vue {
  @Prop({ required: true }) readonly post!: PostSchema

  bgcur = false
  timeout: number | null = null

  mouseenter () {
    this.timeout = setTimeout(() => {
      const fimg = this.post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url
      if (fimg && !this.bgcur) {
        this.$store.commit('bg:push', fimg)
        this.bgcur = true
      }
    }, 200)
  }

  mouseleave () {
    this.timeout && clearTimeout(this.timeout)
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
    this.timeout && clearTimeout(this.timeout)
    if (this.bgcur) {
      this.$store.commit('bg:pop')
      this.bgcur = false
    }
  }
}
</script>
