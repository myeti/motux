<template>
    <h1>MOTUX</h1>
    <Motux :words="words" :lines="10" :validator="checkWord" @complete="onComplete" />
</template>

<script>
import Motux from './components/Motux'
import { getTodayKey } from '@/utils'
import { getWords, checkWord } from '@/utils/api/datamuse'

export default {
    components: {
        Motux
    },
    data: () => ({
        words: []
    }),
    methods: {
        checkWord,
        onComplete(success, results) {
            setTimeout(() => alert(success ? 'Success !' : 'Failure...'), 25)
        }
    },
    async created() {
        const key = getTodayKey()
        this.words = await getWords(key, 5, 6)
    }
}
</script>

<style lang="scss">
body {
    font-family: Avenir, Helvetica, sans-serif;
    font-size: 20px;
    color: #444;
}

h1 {
    margin-top: 100px;
    margin-bottom: 60px;
    text-align: center;
}
</style>
