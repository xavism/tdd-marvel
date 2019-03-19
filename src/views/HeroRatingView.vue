<template>
    <div>
        <Hero/>
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
    }
}
</script>
