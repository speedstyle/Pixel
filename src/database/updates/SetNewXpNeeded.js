class SetNewXpNeeded {
  constructor(property, currentXpNeeded) {
    this.$set = {
      [property]: Math.round(currentXpNeeded * 1.55)
    };
  }
}

module.exports = SetNewXpNeeded;
