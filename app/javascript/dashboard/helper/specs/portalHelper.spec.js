import { buildPortalArticleURL, buildPortalURL } from '../portalHelper';

describe('PortalHelper', () => {
  describe('buildPortalURL', () => {
    it('returns the correct url', () => {
      window.sarvteamConfig = {
        hostURL: 'https://app.sarv.com',
        helpCenterURL: 'https://help.sarv.com',
      };
      expect(buildPortalURL('handbook')).toEqual(
        'https://help.sarv.com/hc/handbook'
      );
      window.sarvteamConfig = {};
    });
  });

  describe('buildPortalArticleURL', () => {
    it('returns the correct url', () => {
      window.sarvteamConfig = {
        hostURL: 'https://app.sarv.com',
        helpCenterURL: 'https://help.sarv.com',
      };
      expect(
        buildPortalArticleURL('handbook', 'culture', 'fr', 'article-slug')
      ).toEqual('https://help.sarv.com/hc/handbook/articles/article-slug');
      window.sarvteamConfig = {};
    });
  });
});
