<template>
  <div
    v-if="!authUIFlags.isFetching"
    id="app"
    class="app-wrapper app-root"
    :class="{ 'app-rtl--wrapper': isRTLView }"
  >
    <update-banner :latest-sarvteam-version="latestSarvTeamVersion" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <add-account-modal
      :show="showAddAccountModal"
      :has-accounts="hasAccounts"
    />
    <woot-snackbar-box />
    <network-notification />
  </div>
  <loading-state v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import AddAccountModal from '../dashboard/components/layout/sidebarComponents/AddAccountModal';
import LoadingState from './components/widgets/LoadingState.vue';
import NetworkNotification from './components/NetworkNotification';
import UpdateBanner from './components/app/UpdateBanner.vue';
import vueActionCable from './helper/actionCable';
import WootSnackbarBox from './components/SnackbarContainer';
import rtlMixin from 'shared/mixins/rtlMixin';
import {
  registerSubscription,
  verifyServiceWorkerExistence,
} from './helper/pushHelper';

export default {
  name: 'App',

  components: {
    AddAccountModal,
    LoadingState,
    NetworkNotification,
    UpdateBanner,
    WootSnackbarBox,
  },

  mixins: [rtlMixin],

  data() {
    return {
      showAddAccountModal: false,
      latestSarvTeamVersion: null,
    };
  },

  computed: {
    ...mapGetters({
      getAccount: 'accounts/getAccount',
      currentUser: 'getCurrentUser',
      globalConfig: 'globalConfig/get',
      authUIFlags: 'getAuthUIFlags',
      currentAccountId: 'getCurrentAccountId',
    }),
    hasAccounts() {
      const { accounts = [] } = this.currentUser || {};
      return accounts.length > 0;
    },
  },

  watch: {
    currentUser() {
      if (!this.hasAccounts) {
        this.showAddAccountModal = true;
      }
    },
    currentAccountId() {
      if (this.currentAccountId) {
        this.initializeAccount();
      }
    },
  },
  mounted() {
    this.setLocale(window.sarvteamConfig.selectedLocale);
  },
  methods: {
    setLocale(locale) {
      this.$root.$i18n.locale = locale;
    },
    async initializeAccount() {
      await this.$store.dispatch('accounts/get');
      this.$store.dispatch('setActiveAccount', {
        accountId: this.currentAccountId,
      });
      const {
        locale,
        latest_sarvteam_version: latestSarvTeamVersion,
      } = this.getAccount(this.currentAccountId);
      const { pubsub_token: pubsubToken } = this.currentUser || {};
      this.setLocale(locale);
      this.updateRTLDirectionView(locale);
      this.latestSarvTeamVersion = latestSarvTeamVersion;
      vueActionCable.init(pubsubToken);

      verifyServiceWorkerExistence(registration =>
        registration.pushManager.getSubscription().then(subscription => {
          if (subscription) {
            registerSubscription();
          }
        })
      );
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/app';
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
