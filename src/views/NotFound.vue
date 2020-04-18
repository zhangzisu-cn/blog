<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-card class="text-center" flat>
          <v-icon size="96px">mdi-alert-circle-outline</v-icon>
          <v-card-text>
            <code>Not found</code>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-btn color="primary" outlined block to="/">Go Home</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class NotFound extends Vue {}
</script>
