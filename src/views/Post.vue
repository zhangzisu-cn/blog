<template>
  <v-container>
    <template v-if="post">
      <v-row justify="center" no-gutters>
        <v-col xs="12" md="8" lg="6">
          <v-row>
            <v-col cols="12">
              <post-item :post="post">
              </post-item>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
    <template v-else-if="err">
      <v-row justify="center">
        <v-col cols="auto">
          <v-card class="text-center" flat>
            <v-icon size="96px">mdi-alert-circle-outline</v-icon>
            <v-card-title>An error occurred</v-card-title>
            <v-card-text>
              <code>{{ err.message }}</code>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
              <v-btn color="primary" outlined block @click="load">Reload</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row justify="center">
        <v-col cols="auto">
          <loading/>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { PostSchema, wordpress } from '@/plugins/wordpress'
import { stripHtml } from '@/plugins/utils'
import PostItem from '@/components/PostItem.vue'
import Loading from '@/components/Loading.vue'

@Component({ components: { PostItem, Loading } })
export default class Post extends Vue {
  @Prop({ required: true }) readonly slug!: string

  err: Error | null = null

  post: PostSchema | null = null

  @Watch('slug', { immediate: true })
  async _wslug () {
    this.load()
  }

  async load () {
    try {
      this.post = this.err = null

      const { data } = await wordpress.post.fetchBySlug(this.slug)
      this.post = data
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$store.commit('title:update', stripHtml(this.post!.title.rendered))
    } catch (e) {
      this.err = e
    }
  }
}
</script>
