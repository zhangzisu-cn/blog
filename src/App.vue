<template>
  <v-app>
    <v-app-bar app dark>
      <div class="title">{{ $store.state.title }}</div>
    </v-app-bar>
    <v-navigation-drawer app expand-on-hover disable-resize-watcher disable-route-watcher permanent :value="true">
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
        <v-list-item @click="changeTheme">
          <v-list-item-avatar tile size="24">
            <v-icon>mdi-brightness-6</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ this.$vuetify.theme.dark ? 'Dark' : 'White' }} theme</v-list-item-title>
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

@Component({ components: { Background, AppFooter } })
export default class App extends Vue {
  created () {
    this.$vuetify.theme.dark = !!localStorage.getItem('theme-dark')
  }

  changeTheme () {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    localStorage.setItem('theme-dark', this.$vuetify.theme.dark ? '1' : '')
  }
}
</script>

<style>
.theme--dark #logo .v-image__image {
  filter: invert(1);
}
</style>
