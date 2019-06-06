<template>
    <form @submit.prevent="$emit('submitted', name)">
        <input type="text" v-model="name">
        <button></button>
    </form>
</template>

<script>
export default {
  name: 'InputHero',
  data() {
    return {
      name: '',
    };
  },
};
</script>
