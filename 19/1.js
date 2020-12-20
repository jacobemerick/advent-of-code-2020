const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n\n");

const ruleMap = new Map(
  input[0]
    .split("\n")
    .filter(row => row)
    .map(row => row.split(': '))
    .map(row => {
      if (row[1].match(/^"\w"$/)) row[1] = row[1].substr(1, 1);
      return row;
    })
);

const resolvedRuleTracker = [];
while (ruleMap.size > resolvedRuleTracker.length) {
  ruleMap.forEach((rule, label) => {
    if (rule.match(/^[^\d]+$/)) {
      if (!resolvedRuleTracker.includes(label)) resolvedRuleTracker.push(label);
      return;
    }

    const resolvedRule = rule
      .split(' | ')
      .map(optionalRule => {
        const optionalRuleLabels = optionalRule.split(' ');
        if (optionalRuleLabels.every(optionalRuleLabel => resolvedRuleTracker.includes(optionalRuleLabel))) {
          return optionalRuleLabels.reduce((acc, val) => acc + ruleMap.get(val), '');
        }
        return optionalRule;
      })
      .join(' | ');

    ruleMap.set(label, (resolvedRule.match(/^[^\d]+$/)) ? `(${resolvedRule})` : resolvedRule);
  });
}

const ruleZero = new RegExp(`^${ruleMap.get('0').split(' ').join('')}$`);

const messageMap = input[1]
  .split("\n")
  .filter(row => row);

console.log(messageMap.filter(message => message.match(ruleZero)).length);
