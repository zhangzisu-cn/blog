<template>
  <v-card>
    <v-card-title>Categories</v-card-title>
    <v-divider/>
    <template v-if="categories">
      <category-chip class="ma-1" v-for="(cat, i) in categories" :key="'c' + i" :category="cat"/>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CategoryChip from '@/components/CategoryChip.vue'
import { CategorySchema, wordpress } from '@/plugins/wordpress'

@Component({ components: { CategoryChip } })
export default class CategoriesCard extends Vue {
  categories: CategorySchema[] | null = null
  err: Error | null = null

  created () {
    this.load()
  }

  async load () {
    this.categories = this.err = null

    try {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { data } = await wordpress.category.list({ per_page: 100 })
      this.categories = data
    } catch (e) {
      this.err = e
    }
  }
}
</script>
