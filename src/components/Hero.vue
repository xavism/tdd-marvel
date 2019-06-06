<template>
    <div>
        <img :src="imagePath" alt="hero Image" class="image-avatar">
        <h1 class="hero-name">{{hero.name}}</h1>
        <Rating :rating="hero.rating"/>
    </div>
</template>

<script>
import Rating from '@/components/Rating';

export default {
  name: 'Hero',
  components: {
    Rating,
  },
  props: {
    hero: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imagePath() {
      return `${this.hero.thumbnail.path}.${this.hero.thumbnail.extension}`;
    },
  },
};
</script>
