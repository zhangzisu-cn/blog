<template>
  <v-row>
    <v-col cols="12">
      <tags-card/>
    </v-col>
    <v-col cols="12">
      <categories-card/>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TagsCard from '@/components/TagsCard.vue'
import CategoriesCard from '@/components/CategoriesCard.vue'

@Component({ components: { TagsCard, CategoriesCard } })
export default class Sidebar extends Vue {}
</script>
