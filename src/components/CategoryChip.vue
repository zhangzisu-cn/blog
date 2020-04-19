<template>
  <v-chip label :to="'/category/' + category.slug" outlined><v-icon left>mdi-file-tree</v-icon>{{category.name}}</v-chip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CategorySchema } from '@/plugins/wordpress'

@Component
export default class CategoryChip extends Vue {
  @Prop({ required: true }) readonly category!: CategorySchema
}
</script>
