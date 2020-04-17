<template>
  <v-footer inset dark>
    <v-row justify="end" no-gutters>
      <v-col cols="auto">
        <v-btn text disabled class="text-none" >
          &copy; {{ new Date().getFullYear() }} ZhangZisu
        </v-btn>
        <v-btn text href="https://buttercms.com" target="_blank" class="pa-0">
          <img src="https://cdn.buttercms.com/RyJ7UhcVTCRqrCFXwgCo" height="36px">
        </v-btn>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon href="https://github.com/zhangzisu-cn/blog/blob/master/LICENSE" target="_blank" v-on="on">
              <v-icon>mdi-certificate</v-icon>
            </v-btn>
          </template>
          <span>Apache-2.0</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon href="https://creativecommons.org/licenses/by-sa/" target="_blank" v-on="on">
              <v-icon>mdi-creative-commons</v-icon>
            </v-btn>
          </template>
          <span>BY-SA</span>
        </v-tooltip>
        <v-menu open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-rss</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item href="/api/rss.xml" target="_blank">
              <v-list-item-content>
                <v-list-item-title>RSS</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class AppFooter extends Vue {}
</script>
