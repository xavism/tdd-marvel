import { shallowMount } from '@vue/test-utils'
import HeroRatingView from '@/views/HeroRatingView'
import Rating from '@/components/Rating'
import Hero from '@/components/Hero'

describe('HeroRatingView', () => {
    const build = () => {
        const wrapper = shallowMount(HeroRatingView, {
            data: () => ({
                hero: {}
            })
        });
    
        return {
          wrapper,
          rating: () => wrapper.find(Rating),
          hero: () => wrapper.find(Hero),
        };
      };

    it('renders the component', () => {
        const { wrapper } = build();

        expect(wrapper.html()).toMatchSnapshot();
    });
    
    it('renders the childs', () => {
        const { rating, hero } = build();
    
        expect(rating().exists()).toBe(true);
        expect(hero().exists()).toBe(true);
    });

    it('passes a Hero to the component to show the info', () => {
        const { wrapper, hero } = build();  
        wrapper.setData({
          hero: {
            name: 'Thor',
          },
        });
    
        // assert
        expect(hero().vm.hero).toBe(wrapper.vm.hero);
    });
})