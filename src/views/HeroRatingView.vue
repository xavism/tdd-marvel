<template>
    <div>
        <InputHero @submitted="searchHero"/>
        <Hero :hero="hero"/>
        <Rating/>
    </div>
</template>

<script>
import Hero from '@/components/Hero'
import Rating from '@/components/Rating'
import InputHero from '@/components/InputHero'
import { mapState } from 'vuex';

export default {
    name: 'HeroRatingView',
    components: {
        InputHero,
        Hero,
        Rating
    },
    computed: {
        ...mapState({
            hero: 'hero'
        })
    },
    methods: {
        searchHero(name) {
            this.$store.dispatch('SEARCH_HERO', { name });
        }
    }
}
</script>
