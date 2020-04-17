<template>
  <v-footer inset dark>
    <v-row justify="end" no-gutters>
      <v-col cols="auto">
        <v-btn text href="https://github.com/zhangzisu-cn/blog/blob/master/LICENSE" target="_blank">
          <v-icon left>mdi-certificate</v-icon>
          Apache-2.0
        </v-btn>
        <v-btn text href="https://creativecommons.org/licenses/by-sa/" target="_blank">
          <v-icon left>mdi-creative-commons</v-icon>
          BY-SA
        </v-btn>
        <v-btn text href="https://buttercms.com" target="_blank">
          <img src="https://cdn.buttercms.com/RyJ7UhcVTCRqrCFXwgCo" height="36px">
        </v-btn>
        <footer-settings/>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FooterSettings from '@/components/FooterSettings.vue'

@Component({ components: { FooterSettings } })
export default class AppFooter extends Vue {}
</script>
