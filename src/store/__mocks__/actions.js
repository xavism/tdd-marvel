import heroFixture from '../../../tests/unit/fixtures/hero';

export default {
  SEARCH_HERO: jest.fn().mockResolvedValue(heroFixture),
};
