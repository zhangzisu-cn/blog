<template>
  <v-card :to="'/post/' + post.slug" hover>
    <v-img v-if="post.featured_image" :src="post.featured_image" height="128px">
    </v-img>
    <v-card-title>{{ post.title }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BPost } from '@/plugins/butter'

@Component
export default class PostMetaItem extends Vue {
  @Prop({ required: true })
  post!: BPost
}
</script>
