import { shallowMount } from '@vue/test-utils';
import Hero from '@/components/Hero';
import Rating from '@/components/Rating';
import heroFixture from './fixtures/hero';

describe('Hero', () => {
  let props;

  const build = () => {
    const options = { propsData: props };
    const wrapper = shallowMount(Hero, options);
    return {
      wrapper,
      avatar: () => wrapper.find('.image-avatar'),
      name: () => wrapper.find('.hero-name'),
      rating: () => wrapper.find(Rating),
    };
  };

  beforeEach(() => {
    props = {
      hero: heroFixture,
    };
  });

  it('renders the component', () => {
    // arrange
    const { wrapper } = build();
    // assert
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders main components correctly', () => {
    // arrange
    const { avatar, name, rating } = build();
    // assert
    expect(avatar().exists()).toBe(true);
    const thumbnail = `${props.hero.thumbnail.path}.${props.hero.thumbnail.extension}`;
    expect(avatar().attributes().src).toBe(thumbnail);
    expect(rating().exists()).toBe(true);
    expect(name().exists()).toBe(true);
    expect(name().text()).toBe(props.hero.name);
  });
});
