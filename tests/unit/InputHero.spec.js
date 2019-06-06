import { shallowMount, createLocalVue } from '@vue/test-utils';
import InputHero from '@/components/InputHero';

const localVue = createLocalVue();

describe('InputHero', () => {
  const build = () => {
    const options = { localVue };
    const wrapper = shallowMount(InputHero, options);

    return {
      wrapper,
      input: () => wrapper.find('input'),
      button: () => wrapper.find('button'),
    };
  };

  it('renders the component', () => {
    // arrange
    const { wrapper } = build();

    // assert
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders main child components', () => {
    // arrange
    const { input, button } = build();

    // assert
    expect(input().exists()).toBe(true);
    expect(button().exists()).toBe(true);
  });

  it('calls "submitted" event when submitting form', () => {
    // arrange
    const expectedHero = 'Thor';
    const { wrapper, button, input } = build();
    input().element.value = expectedHero;

    // act
    input().trigger('input');
    button().trigger('click');
    button().trigger('submit');

    // assert
    expect(wrapper.emitted().submitted[0]).toEqual([expectedHero]);
  });
});
