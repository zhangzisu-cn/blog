<template>
  <v-card>
    <v-img v-if="post.featured_image" :src="post.featured_image" :alt="post.featured_image_alt" max-height="128px">
    </v-img>
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
}
</script>
