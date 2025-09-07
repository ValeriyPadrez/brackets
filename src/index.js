module.exports = function check(str, bracketsConfig) {
  const bracketsMap = {};
  const openBrackets = new Set();
  const sameBrackets = new Set();

  bracketsConfig.forEach(([open, close]) => {
    bracketsMap[close] = open;
    openBrackets.add(open);

    if (open === close) {
      sameBrackets.add(open);
    }
  });

  const result = str.split('').reduce(
    (acc, char) => {
      if (acc.error) {
        return acc;
      }

      if (sameBrackets.has(char)) {
        if (acc.stack.length > 0 && acc.stack[acc.stack.length - 1] === char) {
          acc.stack.pop();
        } else {
          acc.stack.push(char);
        }
      } else if (openBrackets.has(char)) {
        acc.stack.push(char);
      } else if (acc.stack.length === 0) {
        acc.error = true;
      } else {
        const last = acc.stack.pop();

        if (bracketsMap[char] !== last) {
          acc.error = true;
        }
      }

      return acc;
    },
    { stack: [], error: false }
  );

  return !result.error && result.stack.length === 0;
};
