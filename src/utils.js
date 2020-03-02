const RatingLevel = {
  BAD: 0,
  NORMAL: 3,
  GOOD: 5,
  VERY_GOOD: 8,
  AWESOME: 10
};

const getRatingLevel = (ratingScore) => {
  if (ratingScore >= RatingLevel.BAD && ratingScore < RatingLevel.NORMAL) {
    return `Bad`;
  } else if (ratingScore >= RatingLevel.NORMAL && ratingScore < RatingLevel.GOOD) {
    return `Normal`;
  } else if (ratingScore >= RatingLevel.GOOD && ratingScore < RatingLevel.VERY_GOOD) {
    return `Good`;
  } else if (ratingScore >= RatingLevel.VERY_GOOD && ratingScore < RatingLevel.AWESOME) {
    return `Very good`;
  } else if (ratingScore >= RatingLevel.AWESOME) {
    return `Awesome`;
  }
  return ``;
};

const formatTime = (time) => [60, 60, 24].map((n) => {
  const result = time % n;
  time = (time - result) / n;
  return (`0` + result).slice(-2);
}).reverse().join(`:`);

export {getRatingLevel, formatTime};
