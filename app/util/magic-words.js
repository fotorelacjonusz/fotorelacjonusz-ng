export function interpolateMagicWords(string, magicWords, substitutions) {
  let rxPattern = magicWords.map((w) => `%${w}%`).join("|")
  let rex = new RegExp(rxPattern, "gu")
  return string.replace(rex, (match) => {
    let magicWord = match.slice(1, -1)
    return substitutions[magicWord]
  })
}
