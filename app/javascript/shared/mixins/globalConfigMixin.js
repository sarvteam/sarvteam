export default {
  methods: {
    useInstallationName(str = '', installationName) {
      return str.replace(/SarvTeam/g, installationName);
    },
  },
};
