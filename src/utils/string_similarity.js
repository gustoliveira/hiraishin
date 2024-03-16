function compareValues(first, second) {
  first = first.replace(/\s+/g, '');
  second = second.replace(/\s+/g, '');

  if (first === second) return 1;
  if (first.length < 2 || second.length < 2) return 0;

  let firstBigrams = {};
  for (let index = 0; index < first.length - 1; index++) {
    const bigram = first.substring(index, index + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
    firstBigrams.set(bigram, count);
  }

  let intersectionSize = 0;
  for (let index = 0; index < second.length - 1; index++) {
    const bigram = second.substring(index, index + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

function bestMatch(mainString, targetStrings) {
  const ratings = [];
  let bestMatchIndex = 0;

  for (let index = 0; index < targetStrings.length; index++) {
    const currentTargetString = targetStrings[index];
    const currentRating = compareValues(mainString, currentTargetString);
    ratings.push({ target: currentTargetString, rating: currentRating });

    if (currentRating > ratings[bestMatchIndex].rating) {
      bestMatchIndex = index;
    }
  }

  return { ratings: ratings, bestMatch: ratings[bestMatchIndex], bestMatchIndex: bestMatchIndex };
}

module.exports = {
  compareValues: compareValues,
  bestMatch: bestMatch,
};
