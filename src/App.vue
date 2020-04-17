<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <settings-menu/>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer app expand-on-hover disable-resize-watcher disable-route-watcher v-model="drawer" :mobileBreakPoint="0">
      <v-list nav>
        <v-list-item href="https://zhangzisu.cn/" target="_blank">
          <v-list-item-avatar tile size="24">
            <v-img id="logo" contain :src="require('@/assets/logo.svg')"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>ZhangZisu.CN</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Posts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/link">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-link</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Links</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <app-footer/>
    <background/>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Background from '@/components/Background.vue'
import AppFooter from '@/components/AppFooter.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'

@Component({ components: { Background, AppFooter, SettingsMenu } })
export default class App extends Vue {
  drawer = true

  mounted () {
    if (this.$vuetify.breakpoint.xs) {
      setTimeout(() => {
        this.drawer = false
      }, 500)
    }
  }

  @Watch('$vuetify.breakpoint.xs')
  _wBreakpoint (cur: boolean, old: boolean) {
    if (old !== this.drawer) {
      this.drawer = !cur
    }
  }
}
</script>

<style>
.theme--dark #logo .v-image__image {
  filter: invert(1);
}
</style>
