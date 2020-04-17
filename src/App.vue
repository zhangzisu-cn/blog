<template>
  <v-app>
    <v-app-bar app dark>
      <div class="title">{{ $store.state.title }}</div>
      <v-spacer></v-spacer>
      <v-btn text href="https://buttercms.com" target="_blank">
        <img src="https://cdn.buttercms.com/RyJ7UhcVTCRqrCFXwgCo" height="36px">
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app expand-on-hover disable-resize-watcher disable-route-watcher permanent :value="true">
      <v-list nav>
        <v-list-item href="https://zhangzisu.cn/" target="_blank">
          <v-list-item-avatar tile size="24">
            <v-img id="logo" contain :src="require('@/assets/logo.png')"/>
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
    <div id="background">
      <v-img :src="bg" height="100%" transition="fade-transition"/>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  get bg () {
    const stack = this.$store.state.bg
    return stack[stack.length - 1] || ''
  }

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
#background {
  z-index: -1;
  position: fixed;
  width: 100%;
  height: 100%;
}
#background .v-image__image {
  transition: .3s;
}
.theme--dark #logo .v-image__image {
  filter: invert(1);
}
</style>
