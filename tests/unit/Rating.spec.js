import { shallowMount } from '@vue/test-utils';
import Rating from '@/components/Rating';
import heroFixture from './fixtures/hero';


describe('Rating', () => {
  let props;

  const build = () => {
    const options = { propsData: props };
    const wrapper = shallowMount(Rating, options);

    return {
      wrapper,
      starRating: () => wrapper.find('.star-rating'),
      radios: () => wrapper.findAll('input[type="radio"]'),
    };
  };

  beforeEach(() => {
    props = {
      rating: heroFixture.rating,
    };
  });

  it('renders the component', () => {
    // arrange
    const { wrapper } = build();

    // assert
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders main child components', () => {
    // arrange
    const { starRating, radios } = build();

    // assert
    expect(starRating().exists()).toBe(true);
    expect(radios().length).toBe(5);
    expect(radios().filter(r => r.element.checked === true).length).toBe(1);
    expect(radios().filter(r => r.element.checked === false).length).toBe(4);
  });

  it('renders with no stars', () => {
    // arrange
    const { wrapper, radios, starRating } = build();
    // wrapper.prop.rating = 0;
    wrapper.setProps({
      rating: 0,
    });

    // assert
    expect(starRating().exists()).toBe(true);
    expect(radios().length).toBe(5);
    expect(radios().filter(r => r.element.checked === true).length).toBe(0);
    expect(radios().filter(r => r.element.checked === false).length).toBe(5);
  });

  it('calls "starsChanges" event when changing rating', () => {
    // arrange
    const expectedRating = heroFixture.rating + 1;
    const { wrapper, radios } = build();
    wrapper.setProps({
      rating: heroFixture.rating + 1,
    });
    const radio = radios().filter(r => r.element.checked).at(0);
    // act
    radio.trigger('click');
    // assert
    expect(wrapper.emitted().starsChanges).toBeTruthy();
    expect(wrapper.emitted().starsChanges[0]).toEqual([expectedRating]);
  });
});
