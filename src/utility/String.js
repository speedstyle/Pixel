class String {
  boldify(string) {
    return '**' + string.replace(/(\*|~|`|_)+/g, '') + '**';
  }

  isNullOrWhiteSpace(input) {
    return typeof input !== 'string' || input.trim().length === 0;
  }

  upperFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  list(array, beginning = '', end = '') {
    let string = '';

    for (let i = 0; i < array.length; i++) {
      string += beginning + array[i] + end + ', ';
    }
    string = string.substring(0, string.length - 2);

    return string;
  }
}

module.exports = new String();