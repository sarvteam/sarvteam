import { shallowMount } from '@vue/test-utils';
import messageFormatterMixin from '../messageFormatterMixin';

describe('messageFormatterMixin', () => {
  it('returns correct plain text', () => {
    const Component = {
      render() {},
      mixins: [messageFormatterMixin],
    };
    const wrapper = shallowMount(Component);
    const message =
      '<b>SarvTeam is an opensource tool. https://www.sarv.com</b>';
    expect(wrapper.vm.getPlainText(message)).toMatch(
      'SarvTeam is an opensource tool. https://www.sarv.com'
    );
  });
});
