<template>
    <div class="motux">
        <template v-for="(word, i) in words" :key="i">
            <Grid :word="word"
                :attempts="attempts"
                :input="input"
                :lines="lines"
                @success="score => onSuccess(i, score)" />
        </template>
    </div>
</template>

<script>
import Grid from './Grid'

export default {
    components: {
        Grid
    },
    props: {
        words: {
            type: Array,
            required: true
        },
        lines: {
            type: Number,
            default: 6
        },
        validator: Function
    },
    data : () => ({
        input: '',
        attempts: [],
        results: [],
        success: false,
        finished: false
    }),
    methods: {
        onType(e) {
            if(!this.finished) {
                if(e.keyCode >= 65 && e.keyCode <= 90) {
                    this.typeChar(e.key)
                }
                else if(e.keyCode === 8) {
                    this.removeLastChar()
                }
                else if(e.keyCode === 13) {
                    this.submit()
                }
            }
        },
        typeChar(char) {
            if(this.input.length < this.words[0].length) {
                this.input += char
            }
        },
        removeLastChar() {
            if(this.input.length > 0) {
                this.input = this.input.slice(0, -1)
                this.error = false
            }
        },
        async submit() {
            if(this.input.length === this.words[0].length) {
                let valid = true
                if(this.validator) {
                    valid = await this.validator(this.input)
                }
                if(valid) {
                    this.attempts.push(this.input)
                    this.input = ''
                    if(this.attempts.length === this.lines) {
                        this.finish(false)
                    }
                }
                else {
                    this.error = true
                }
            }
        },
        onSuccess(i, score) {
            this.results[i] = score
            this.$emit('success', i, score)
            const allSuccess = !this.words.filter((w, i) => !this.results[i]).length
            if(allSuccess) this.finish(true)
        },
        finish(success) {
            this.success = success
            this.finished = true
            this.$emit('complete', this.success, this.results)
        }
    },
    mounted() {
        addEventListener('keyup', this.onType)
    }
}
</script>

<style lang="scss">
.motux {
    display: flex;
    justify-content: center;
    gap: 4rem;
}
</style>