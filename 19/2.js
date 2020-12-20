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

ruleMap.set('8', '42 | 42 8');
ruleMap.set('11', '42 31 | 42 11 31');

const resolvedRuleTracker = [];
while (ruleMap.size > resolvedRuleTracker.length) {
  ruleMap.forEach((rule, label) => {
    if (rule.length > 10000 && label !== '0') {
      rule = rule.replace(/\d/g, 'z');
      ruleMap.set(label, rule);
    }

    if (!rule.match(/\d/)) {
      if (!resolvedRuleTracker.includes(label)) resolvedRuleTracker.push(label);
      return;
    }

    const resolvedRule = rule
      .split(' | ')
      .map(optionalRule => {
        const optionalRuleLabels = optionalRule.split(' ').map(optionalRuleLabel => {
          if (resolvedRuleTracker.includes(optionalRuleLabel)) {
            return `( ${ruleMap.get(optionalRuleLabel)} )`;
          }

          if (
            optionalRuleLabel === label &&
            rule.match(/\d+/)[0] === label
          ) {
            return ruleMap.get(optionalRuleLabel).match(/\d+$/) ? `( ${ruleMap.get(optionalRuleLabel)} )` : ruleMap.get(optionalRuleLabel);
          }

          return optionalRuleLabel;
        });

        return optionalRuleLabels.join(' ');
      })
      .join(' | ');

    ruleMap.set(label, (!resolvedRule.match(/\d+/)) ? `( ${resolvedRule} )` : resolvedRule);
  });
}

const ruleZero = new RegExp(`^(${ruleMap.get('0').split(' ').join('')})$`);

const messageMap = input[1]
  .split("\n")
  .filter(row => row);

console.log(messageMap.filter(message => message.match(ruleZero)).length);
