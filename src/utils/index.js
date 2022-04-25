export async function fetchJSON(url, fallback) {
    try {
        const raw = await fetch(url)
        return await raw.json()
    }
    catch(err) {
        console.error(err)
        return fallback
    }
}

export function getTodayKey() {
    const now = new Date()
    return `${now.getFullYear()}${now.getMonth()+1}${now.getDate()}`
}

export function getRandomItem(key, n, items) {
    const index = (parseInt(key) * 137 * n) % items.length
    return items[index]
}

export function normalize(str) {
    return str.toLowerCase() // todo: translate accents and special chars
}

export function compare(word, input) {

    const wordChars = normalize(word).split('')
    const inputChars = normalize(input).split('')
    const hint = []
    let valid = true

    // first : right placed chars
    for(let i = 0; i < inputChars.length; i++) {
        if(inputChars[i] === wordChars[i]) {
            hint[i] = 2
            wordChars[i] = null
        }
    }

    // then : misplaced chars and invalid chars
    for(let i = 0; i < inputChars.length; i++) {
        const inputChar = inputChars[i]
        if(wordChars[i]) {
            if(wordChars.includes(inputChar)) {
                hint[i] = 1
                const j = wordChars.indexOf(inputChar)
                wordChars[j] = null
                valid = false
            }
            else {
                hint[i] = 0
                valid = false
            }
        }
    }

    return [valid, hint]
}