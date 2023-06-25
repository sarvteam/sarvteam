export default {
  computed: {
    hostURL() {
      return window.sarvteamConfig.hostURL;
    },
    vapidPublicKey() {
      return window.sarvteamConfig.vapidPublicKey;
    },
    enabledLanguages() {
      return window.sarvteamConfig.enabledLanguages;
    },
    isEnterprise() {
      return window.sarvteamConfig.isEnterprise === 'true';
    },
  },
};
