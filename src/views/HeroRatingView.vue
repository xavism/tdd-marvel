<template>
    <div>
        <Hero :hero="hero"/>
        <Rating/>
    </div>
</template>

<script>
import Hero from '@/components/Hero'
import Rating from '@/components/Rating'

export default {
    name: 'HeroRatingView',
    components: {
        Hero,
        Rating
    },
    data() {
        return {
            hero: {
                name: ''
            }
        }
    }
}
</script>
