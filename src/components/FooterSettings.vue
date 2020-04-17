<template>
  <v-menu offset-x :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>
    <v-list subheader>
      <v-subheader inset>Theme</v-subheader>
      <v-list-item @click="changeColor">
        <v-list-item-icon><v-icon>mdi-brightness-6</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title><code>Color</code></v-list-item-title>
          <v-list-item-subtitle>{{ this.$vuetify.theme.dark ? 'Dark' : 'Light' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="changeAcrylic">
        <v-list-item-icon><v-icon>mdi-blur</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title><code>Acrylic</code></v-list-item-title>
          <v-list-item-subtitle>{{ this.acrylic ? 'Enabled' : 'Disabled' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-subheader inset>About</v-subheader>
      <v-list-item :href="'https://github.com/zhangzisu-cn/blog/commit/' + gitHash" target="_blank">
        <v-list-item-icon><v-icon>mdi-git</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title><code>{{ gitHash.substr(0, 6) }}</code></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon><v-icon>mdi-clock</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ buildDate }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon><v-icon>mdi-server</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ buildMachine }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

/*  global GIT_HASH, GIT_BRANCH, BUILD_DATE, BUILD_MACHINE */

@Component
export default class FooterSettings extends Vue {
  gitHash = GIT_HASH
  gitBranch = GIT_BRANCH
  buildDate = BUILD_DATE
  buildMachine = BUILD_MACHINE

  acrylic!: boolean

  created () {
    window.addEventListener('storage', () => this.reload())
    this.reload()
  }

  changeColor () {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light')
  }

  changeAcrylic () {
    this.acrylic = !this.acrylic
    document.body.classList.toggle('acrylic')
    localStorage.setItem('acrylic', this.acrylic ? '1' : '0')
  }

  reload () {
    this.$vuetify.theme.dark = localStorage.getItem('theme') === 'dark'
    this.acrylic = (localStorage.getItem('acrylic') || '1') !== '0'
    if (this.acrylic !== document.body.classList.contains('acrylic')) {
      document.body.classList.toggle('acrylic')
    }
  }
}
</script>
