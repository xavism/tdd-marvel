import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HeroRatingView from '@/views/HeroRatingView';
import Hero from '@/components/Hero';
import InputHero from '@/components/InputHero';
import defaultState from '@/store/state';
import actions from '@/store/actions';
import heroFixture from './fixtures/hero';

jest.mock('@/store/actions');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HeroRatingView', () => {
  let state;

  const build = () => {
    const wrapper = shallowMount(HeroRatingView, {
      localVue,
      store: new Vuex.Store({
        state,
        actions,
      }),
    });

    return {
      wrapper,
      heroes: () => wrapper.findAll(Hero),
      inputHero: () => wrapper.find(InputHero),
    };
  };

  beforeEach(() => {
    jest.resetAllMocks();
    state = { ...defaultState };
  });

  it('renders the component', () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the childs', () => {
    const { heroes, inputHero } = build();

    expect(heroes().length).toBe(0);
    expect(inputHero().exists()).toBe(true);
  });

  it('renders the correct number of childs', () => {
    const { heroes, inputHero } = build();
    state.heroes.push(heroFixture);
    state.heroes.push(heroFixture);
    expect(heroes().length).toBe(2);
    expect(inputHero().exists()).toBe(true);
  });

  it('passes a Hero to the component to show the info via store', () => {
    state.heroes.push(heroFixture);
    const { heroes } = build();
    const currentHero = heroes().at(0);
    expect(currentHero.vm.hero).toBe(state.heroes[0]);
  });

  it('look for a hero when received "submitted"', () => {
    // arrange
    const expectedHero = 'Thor';
    const { inputHero } = build();

    // act
    inputHero().vm.$emit('submitted', expectedHero);

    // assert
    expect(actions.SEARCH_HERO).toHaveBeenCalled();
    expect(actions.SEARCH_HERO.mock.calls[0][1]).toEqual({ name: expectedHero });
  });
});
