jest.mock('@/store/actions')
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HeroRatingView from '@/views/HeroRatingView'
import Rating from '@/components/Rating'
import Hero from '@/components/Hero'
import InputHero from '@/components/InputHero'
import defaultState from '@/store/state'
import actions from '@/store/actions'
import heroFixture from './fixtures/hero'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('HeroRatingView', () => {
    let state

    const build = () => {
        const wrapper = shallowMount(HeroRatingView, {
            localVue,
            store: new Vuex.Store({ 
                state,
                actions
            })
        });
    
        return {
          wrapper,
          rating: () => wrapper.find(Rating),
          hero: () => wrapper.find(Hero),
          inputHero: () => wrapper.find(InputHero)
        };
      };

    beforeEach(() => {
        jest.resetAllMocks()
        state = {...defaultState}
    })

    it('renders the component', () => {
        const { wrapper } = build();

        expect(wrapper.html()).toMatchSnapshot();
    });
    
    it('renders the childs', () => {
        const { rating, hero, inputHero} = build();
    
        expect(rating().exists()).toBe(true);
        expect(hero().exists()).toBe(true);
        expect(inputHero().exists()).toBe(true);
    });

    it('passes a Hero to the component to show the info via store', () => {
        state.hero = heroFixture;
        const { hero } = build();  
    
        expect(hero().vm.hero).toBe(state.hero);
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
})