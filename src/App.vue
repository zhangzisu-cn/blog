<template>
  <v-app>
    <v-app-bar app dark>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.xs" @click="drawer = !drawer"/>
      <v-toolbar-title v-else>{{ $store.state.title }}</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <settings-menu/>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer app :mobile-break-point="$vuetify.breakpoint.thresholds.xs" :expand-on-hover="!$vuetify.breakpoint.xs" v-model="drawer">
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
        <v-list-item to="/search">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Search</v-list-item-title>
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
import { Vue, Component } from 'vue-property-decorator'
import Background from '@/components/Background.vue'
import AppFooter from '@/components/AppFooter.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'

@Component({ components: { Background, AppFooter, SettingsMenu } })
export default class App extends Vue {
  drawer = !this.$vuetify.breakpoint.xs

  created () {
    this.parseReferrer()
  }

  parseReferrer () {
    let ref = decodeURI(document.referrer)
    const prefix = /https?:\/\/zhangzisu.wordpress.com/
    if (prefix.test(ref)) {
      ref = ref.replace(prefix, '')
      let match = /^\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.+)/.exec(ref)
      if (match) {
        this.$router.push('/post/' + match[4])
      }
      match = /^\/tag\/(.+)/.exec(ref)
      if (match) {
        this.$router.push('/tag/' + match[1])
      }
      match = /^\/category\/(.+)/.exec(ref)
      if (match) {
        this.$router.push('/category/' + match[1])
      }
    }
  }
}
</script>

<style>
.theme--dark #logo .v-image__image {
  filter: invert(1);
}
</style>
