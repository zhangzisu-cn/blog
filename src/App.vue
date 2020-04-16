<template>
  <v-app>
    <v-app-bar app color="primary" dark>
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
            <v-img contain :src="require('@/assets/logo.png')"/>
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
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
}
</script>
