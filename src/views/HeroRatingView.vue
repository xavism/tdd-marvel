<template>
    <div>
        <InputHero @submitted="searchHero"/>
        <Hero v-for="hero in heroes ":hero="hero"/>
    </div>
</template>

<script>
import Hero from '@/components/Hero';
import InputHero from '@/components/InputHero';
import { mapState } from 'vuex';

export default {
  name: 'HeroRatingView',
  components: {
    InputHero,
    Hero,
  },
  computed: {
    ...mapState({
      heroes: 'heroes',
    }),
  },
  methods: {
    searchHero(name) {
      this.$store.dispatch('SEARCH_HERO', { name });
    },
  },
};
</script>
