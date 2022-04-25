<template>
    <div class="motux-grid">
        <template v-for="n in lines" :key="n">
            <Line v-if="n <= limit" :length="word.length" :value="attempts[n-1]" :hint="hints[n-1]" />
            <Line v-else-if="n === limit+1" :length="word.length" :value="success ? '' : input" />
            <Line v-else :length="word.length" />
        </template>
    </div>
</template>

<script>
import Line from './Line'
import { compare } from '@/utils'

export default {
    components: {
        Line
    },
    props: {
        word: {
            type: String,
            required: true
        },
        attempts: {
            type: Array,
            required: true
        },
        input: {
            type: String,
            required: true
        },
        lines: {
            type: Number,
            default: 6
        }
    },
    data: () => ({
        success: null
    }),
    computed: {
        limit() {
            return this.success || this.attempts.length
        },
        hints() {
            return this.attempts.map((attempt, i) => {
                const [valid, hint] = compare(this.word, attempt)
                if(valid && !this.success) {
                    this.success = i+1
                    this.$emit('success', this.success)
                }
                return hint
            })
        }
    }
}
</script>

<style lang="scss">
.motux-grid {
    display: flex;
    flex-direction: column;
    gap: .4rem;
}
</style>