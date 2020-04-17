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
        <v-menu offset-x>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-icon>mdi-wrench</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item :href="'https://github.com/zhangzisu-cn/blog/commit/' + gitHash" target="_blank">
              <v-list-item-icon><v-icon>mdi-git</v-icon></v-list-item-icon>
              <v-list-item-title><code>{{ gitHash.substr(0, 6) }}</code></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon><v-icon>mdi-clock</v-icon></v-list-item-icon>
              <v-list-item-title>{{ buildDate }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon><v-icon>mdi-server</v-icon></v-list-item-icon>
              <v-list-item-title>{{ buildMachine }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

/*  global GIT_HASH, GIT_BRANCH, BUILD_DATE, BUILD_MACHINE */

@Component
export default class AppFooter extends Vue {
  gitHash = GIT_HASH
  gitBranch = GIT_BRANCH
  buildDate = BUILD_DATE
  buildMachine = BUILD_MACHINE
}
</script>
