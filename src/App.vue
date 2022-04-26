<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link :to="{ path: '/admin' }">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Admin
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ path: '/admin/products' }">
          <v-list-item-action>
            <v-icon>mdi-items</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Producten
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ path: '/clients' }">
          <v-list-item-action>
            <v-icon>mdi-items</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Klanten
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ path: '/orders' }">
          <v-list-item-action>
            <v-icon>mdi-items</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Bestellingen
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row align="start" justify="center">
          <v-col cols="12">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <new-content-available-toastr
      v-if="newContentAvailable"
      class="new-content-available-toastr"
      :refreshing-app="refreshingApp"
      @refresh="serviceWorkerSkipWaiting"
    ></new-content-available-toastr>
    <apple-add-to-home-screen-modal
      v-if="showAddToHomeScreenModalForApple"
      class="apple-add-to-home-screen-modal"
      @close="closeAddToHomeScreenModalForApple(false)"
    >
    </apple-add-to-home-screen-modal>
  </v-app>
</template>

<script>
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { NewContentAvailableToastr, AppleAddToHomeScreenModal },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp'])
  },
  methods: {
    ...mapActions('app', ['closeAddToHomeScreenModalForApple', 'serviceWorkerSkipWaiting'])
  }
}
</script>

<style lang="scss">
body {
  margin: 0;

  a {
    font-weight: 500;
    text-decoration: none;
  }

  #app {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    color: #2c3e50;

    .new-content-available-toastr {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .apple-add-to-home-screen-modal {
      position: absolute;
      bottom: 0;
      right: 0;
      top: 0;
      left: 0;
      height: fit-content;
      width: fit-content;
      margin: auto;
      z-index: 1000;
    }

    .main-wrapper {
      margin-top: 3.6rem;
      padding: 20px;

      .page-wrapper {
        width: 60%;
        margin: auto;

        @media screen and (max-width: 1000px) {
          width: 100%;
        }
      }
    }
  }
}
</style>
