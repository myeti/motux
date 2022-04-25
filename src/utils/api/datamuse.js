import { getRandomItem, fetchJSON } from '@/utils'

const CHARS = 'abcdefghijklmnopqrstuvwxyz'.split('')
const API_URL = 'https://api.datamuse.com/words'
const LIMIT = 1000
const MIN_FREQ = 1.2

export async function getWords(key, chars = 5, n = 1) {
    const words = []
    for(let i = n; i--;) {
        const query = getRandomItem(key, i, CHARS).padEnd(chars, '?')
        const results = await fetchJSON(`${API_URL}?sp=${query}&md=f&max=${LIMIT}&`)
        const list = results.filter(r => {
            const isValid = !r.word.includes(' ') && !r.word.includes('-')
            const hasHighFreq = parseFloat(r.tags[0].split(':')[1]) >= MIN_FREQ
            return isValid && hasHighFreq
        }).map(r => r.word)
        words.push(getRandomItem(key, i, list))
    }
    return words
}

export async function checkWord(word) {
    const results = await fetchJSON(`${API_URL}?sp=${word}&max=1`)
    return results.find(r => r.word === word)
}