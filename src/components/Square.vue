<template>
    <div class="motux-square">
        {{ value }}
    </div>
</template>

<script>
export default {
    props: {
        value: String
    }
}
</script>

<style lang="scss">
.motux-square {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    font-weight: bold;
    text-transform: uppercase;
    border: 2px solid #bbb;
    &.ko {
        color: white;
        background: var(--motux-color-invalid, #888);
        border-color: var(--motux-color-invalid, #888);
    }
    &.mp {
        color: white;
        background: var(--motux-color-misplaced, orange);
        border-color: var(--motux-color-misplaced, orange);
    }
    &.ok {
        color: white;
        background: var(--motux-color-valid, green);
        border-color: var(--motux-color-valid, green);
    }
}
</style>