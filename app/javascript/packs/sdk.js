import Cookies from 'js-cookie';
import { IFrameHelper } from '../sdk/IFrameHelper';
import {
  getBubbleView,
  getDarkMode,
  getWidgetStyle,
} from '../sdk/settingsHelper';
import {
  computeHashForUserData,
  getUserCookieName,
  hasUserKeys,
} from '../sdk/cookieHelpers';
import { addClasses, removeClasses } from '../sdk/DOMHelpers';
import { setCookieWithDomain } from '../sdk/cookieHelpers';
import { SDK_SET_BUBBLE_VISIBILITY } from 'shared/constants/sharedFrameEvents';
const runSDK = ({ baseUrl, websiteToken }) => {
  if (window.$sarvteam) {
    return;
  }

  const sarvteamSettings = window.sarvteamSettings || {};
  let locale = sarvteamSettings.locale;
  let baseDomain = sarvteamSettings.baseDomain;

  if (sarvteamSettings.useBrowserLanguage) {
    locale = window.navigator.language.replace('-', '_');
  }

  window.$sarvteam = {
    baseUrl,
    baseDomain,
    hasLoaded: false,
    hideMessageBubble: sarvteamSettings.hideMessageBubble || false,
    isOpen: false,
    position: sarvteamSettings.position === 'left' ? 'left' : 'right',
    websiteToken,
    locale,
    useBrowserLanguage: sarvteamSettings.useBrowserLanguage || false,
    type: getBubbleView(sarvteamSettings.type),
    launcherTitle: sarvteamSettings.launcherTitle || '',
    showPopoutButton: sarvteamSettings.showPopoutButton || false,
    widgetStyle: getWidgetStyle(sarvteamSettings.widgetStyle) || 'standard',
    resetTriggered: false,
    darkMode: getDarkMode(sarvteamSettings.darkMode),

    toggle(state) {
      IFrameHelper.events.toggleBubble(state);
    },

    toggleBubbleVisibility(visibility) {
      let widgetElm = document.querySelector('.woot--bubble-holder');
      let widgetHolder = document.querySelector('.woot-widget-holder');
      if (visibility === 'hide') {
        addClasses(widgetHolder, 'woot-widget--without-bubble');
        addClasses(widgetElm, 'woot-hidden');
        window.$sarvteam.hideMessageBubble = true;
      } else if (visibility === 'show') {
        removeClasses(widgetElm, 'woot-hidden');
        removeClasses(widgetHolder, 'woot-widget--without-bubble');
        window.$sarvteam.hideMessageBubble = false;
      }
      IFrameHelper.sendMessage(SDK_SET_BUBBLE_VISIBILITY, {
        hideMessageBubble: window.$sarvteam.hideMessageBubble,
      });
    },

    popoutChatWindow() {
      IFrameHelper.events.popoutChatWindow({
        baseUrl: window.$sarvteam.baseUrl,
        websiteToken: window.$sarvteam.websiteToken,
        locale,
      });
    },

    setUser(identifier, user) {
      if (typeof identifier !== 'string' && typeof identifier !== 'number') {
        throw new Error('Identifier should be a string or a number');
      }

      if (!hasUserKeys(user)) {
        throw new Error(
          'User object should have one of the keys [avatar_url, email, name]'
        );
      }

      const userCookieName = getUserCookieName();
      const existingCookieValue = Cookies.get(userCookieName);
      const hashToBeStored = computeHashForUserData({ identifier, user });
      if (hashToBeStored === existingCookieValue) {
        return;
      }

      window.$sarvteam.identifier = identifier;
      window.$sarvteam.user = user;
      IFrameHelper.sendMessage('set-user', { identifier, user });

      setCookieWithDomain(userCookieName, hashToBeStored, {
        baseDomain,
      });
    },

    setCustomAttributes(customAttributes = {}) {
      if (!customAttributes || !Object.keys(customAttributes).length) {
        throw new Error('Custom attributes should have atleast one key');
      } else {
        IFrameHelper.sendMessage('set-custom-attributes', { customAttributes });
      }
    },

    deleteCustomAttribute(customAttribute = '') {
      if (!customAttribute) {
        throw new Error('Custom attribute is required');
      } else {
        IFrameHelper.sendMessage('delete-custom-attribute', {
          customAttribute,
        });
      }
    },

    setConversationCustomAttributes(customAttributes = {}) {
      if (!customAttributes || !Object.keys(customAttributes).length) {
        throw new Error('Custom attributes should have atleast one key');
      } else {
        IFrameHelper.sendMessage('set-conversation-custom-attributes', {
          customAttributes,
        });
      }
    },

    deleteConversationCustomAttribute(customAttribute = '') {
      if (!customAttribute) {
        throw new Error('Custom attribute is required');
      } else {
        IFrameHelper.sendMessage('delete-conversation-custom-attribute', {
          customAttribute,
        });
      }
    },

    setLabel(label = '') {
      IFrameHelper.sendMessage('set-label', { label });
    },

    removeLabel(label = '') {
      IFrameHelper.sendMessage('remove-label', { label });
    },

    setLocale(localeToBeUsed = 'en') {
      IFrameHelper.sendMessage('set-locale', { locale: localeToBeUsed });
    },

    setColorScheme(darkMode = 'light') {
      IFrameHelper.sendMessage('set-color-scheme', {
        darkMode: getDarkMode(darkMode),
      });
    },

    reset() {
      if (window.$sarvteam.isOpen) {
        IFrameHelper.events.toggleBubble();
      }

      Cookies.remove('cw_conversation');
      Cookies.remove(getUserCookieName());

      const iframe = IFrameHelper.getAppFrame();
      iframe.src = IFrameHelper.getUrl({
        baseUrl: window.$sarvteam.baseUrl,
        websiteToken: window.$sarvteam.websiteToken,
      });

      window.$sarvteam.resetTriggered = true;
    },
  };

  IFrameHelper.createFrame({
    baseUrl,
    websiteToken,
  });
};

window.sarvteamSDK = {
  run: runSDK,
};
