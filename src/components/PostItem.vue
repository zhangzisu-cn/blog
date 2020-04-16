<template>
  <v-card>
    <v-img v-if="post.featured_image" :src="post.featured_image" :alt="post.featured_image_alt" max-height="128px">
    </v-img>
    <v-card-title v-text="post.title"/>
    <v-card-text v-html="post.body" style="overflow: hidden;"/>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BPost } from '@/plugins/butter'

@Component
export default class PostItem extends Vue {
  @Prop({ required: true })
  post!: BPost
}
</script>
