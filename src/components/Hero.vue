<template>
    <h1>Hero</h1>
</template>

<script>
export default {
    name: 'Hero',
    props: {
        hero: {
            type: Object,
            required: true,
            default: () => ({})
        }
    }
}
</script>
