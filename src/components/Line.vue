<template>
    <div class="motux-line">
        <span v-for="n in length" :key="n" :class="colors(n-1)">
            {{ value[n-1] }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        length: {
            type: Number,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        hint: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        colors(i) {
            return {
                error: !!this.hint.length,
                warn: this.hint[i] === 1,
                valid: this.hint[i] === 2
            }
        }
    }
}
</script>

<style lang="scss">
.motux-line {
    display: flex;
    gap: .4rem;

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        width: 3rem;
        font-weight: bold;
        text-transform: uppercase;
        border: 2px solid #bbb;
        &.error {
            color: white;
            background: var(--motux-color-invalid, #888);
            border-color: var(--motux-color-invalid, #888);
        }
        &.warn {
            color: white;
            background: var(--motux-color-misplaced, orange);
            border-color: var(--motux-color-misplaced, orange);
        }
        &.valid {
            color: white;
            background: var(--motux-color-valid, green);
            border-color: var(--motux-color-valid, green);
        }
    }
}
</style>