import AnalyticsHelper from './AnalyticsHelper';
import LogRocket from 'logrocket';
import DashboardAudioNotificationHelper from './AudioAlerts/DashboardAudioNotificationHelper';

export const SARVTEAM_SET_USER = 'SARVTEAM_SET_USER';
export const SARVTEAM_RESET = 'SARVTEAM_RESET';

export const ANALYTICS_IDENTITY = 'ANALYTICS_IDENTITY';
export const ANALYTICS_RESET = 'ANALYTICS_RESET';

export const initializeAnalyticsEvents = () => {
  window.bus.$on(ANALYTICS_IDENTITY, ({ user }) => {
    AnalyticsHelper.identify(user);
    if (window.logRocketProjectId) {
      LogRocket.identify(user.id, {
        email: user.email,
        name: user.name,
      });
    }
  });
};

const initializeAudioAlerts = user => {
  const { ui_settings: uiSettings } = user || {};
  const {
    always_play_audio_alert: alwaysPlayAudioAlert,
    enable_audio_alerts: audioAlertType,
    alert_if_unread_assigned_conversation_exist: alertIfUnreadConversationExist,
    notification_tone: audioAlertTone,
    // UI Settings can be undefined initally as we don't send the
    // entire payload for the user during the signup process.
  } = uiSettings || {};

  DashboardAudioNotificationHelper.setInstanceValues({
    currentUserId: user.id,
    audioAlertType: audioAlertType || 'none',
    audioAlertTone: audioAlertTone || 'ding',
    alwaysPlayAudioAlert: alwaysPlayAudioAlert || false,
    alertIfUnreadConversationExist: alertIfUnreadConversationExist || false,
  });
};

export const initializeSarvTeamEvents = () => {
  window.bus.$on(SARVTEAM_RESET, () => {
    if (window.$sarvteam) {
      window.$sarvteam.reset();
    }
  });
  window.bus.$on(SARVTEAM_SET_USER, ({ user }) => {
    if (window.$sarvteam) {
      window.$sarvteam.setUser(user.email, {
        avatar_url: user.avatar_url,
        email: user.email,
        identifier_hash: user.hmac_identifier,
        name: user.name,
      });
      window.$sarvteam.setCustomAttributes({
        signedUpAt: user.created_at,
        cloudCustomer: 'true',
        account_id: user.account_id,
      });
    }

    initializeAudioAlerts(user);
  });
};
