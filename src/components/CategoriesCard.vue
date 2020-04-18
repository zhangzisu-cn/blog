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
import { butter, BCategory } from '@/plugins/butter'
import CategoryChip from '@/components/CategoryChip.vue'

@Component({ components: { CategoryChip } })
export default class CategoriesCard extends Vue {
  categories: BCategory[] | null = null
  err: Error | null = null

  created () {
    this.load()
  }

  async load () {
    this.categories = this.err = null

    try {
      const res = await butter.category.list()
      this.categories = res.data.data
    } catch (e) {
      this.err = e
    }
  }
}
</script>
