<template>
  <v-card>
    <v-card-title>Tags</v-card-title>
    <v-divider/>
    <template v-if="tags">
      <tag-chip class="ma-1" v-for="(tag, i) in tags" :key="'t' + i" :tag="tag"/>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { TagSchema, wordpress } from '@/plugins/wordpress'
import TagChip from '@/components/TagChip.vue'

@Component({ components: { TagChip } })
export default class TagsCard extends Vue {
  tags: TagSchema[] | null = null
  err: Error | null = null

  created () {
    this.load()
  }

  async load () {
    this.tags = this.err = null

    try {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { data } = await wordpress.tag.list({ per_page: 100 })
      this.tags = data
    } catch (e) {
      this.err = e
    }
  }
}
</script>
