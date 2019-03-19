import { shallowMount } from '@vue/test-utils'
import HeroRatingView from '@/views/HeroRatingView'
import Rating from '@/components/Rating'
import Hero from '@/components/Hero'

describe('HeroRatingView', () => {
    const build = () => {
        const wrapper = shallowMount(HeroRatingView);
    
        return {
          wrapper,
          rating: () => wrapper.find(Rating),
          hero: () => wrapper.find(Hero),
        };
      };

    it('renders the component', () => {
        // arrange
        const { wrapper } = build();
        // assert
        expect(wrapper.html()).toMatchSnapshot();
    });
    
    it('renders the childs', () => {
        // arrange
        const { rating, hero } = build();
    
        // assert
        expect(rating().exists()).toBe(true);
        expect(hero().exists()).toBe(true);
    });
})