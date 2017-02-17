"use strict";
var es6_promise_1 = require('es6-promise');
var fs = require('fs');
var path = require('path');
var rules_1 = require('./rules');
function formatUsage(usage) {
    return usage.replace(/~~~/g, '```').replace(/(^[ \t]*\n)/gm, '\n').replace(/^    /mg, '');
}
exports.formatUsage = formatUsage;
function createRuleTable() {
    var buffer = [];
    var category = null;
    rules_1.rules.forEach(function (rule) {
        if (category !== rule.category) {
            category = rule.category;
            buffer.push("\n### " + category + "\n\n");
            buffer.push(rules_1.categories[category] + "\n\n");
            buffer.push('| :grey_question: | ESLint | TSLint | Description |\n');
            buffer.push('| :---            | :---:  | :---:  | :---        |\n');
        }
        var available;
        if (rule.available) {
            available = rule.provider === 'native' ? ':ballot_box_with_check:' : ':white_check_mark:';
        }
        else {
            available = rule.tslintRule === 'Not applicable' ? ':no_entry_sign:' : ':x:';
        }
        var tsRuleName = rule.tslintUrl ? "[" + rule.tslintRule + "](" + rule.tslintUrl + ")" : rule.tslintRule;
        var tsRule = rule.tslintRule === 'Not applicable' ? 'Not applicable' : tsRuleName;
        buffer.push('|');
        buffer.push(available + "|");
        buffer.push("[" + rule.eslintRule + "](" + rule.eslintUrl + ")|");
        buffer.push(tsRule + "|");
        buffer.push(rule.description + "|");
        buffer.push('\n');
    });
    return buffer.join('');
}
function updateReadme(cb) {
    fs.readFile('README.md', 'utf8', function (readErr, data) {
        if (readErr) {
            return console.error(readErr);
        }
        var content = data.replace(/^<!-- Start:AutoTable((.*?(\n))+.*?)End:AutoTable -->$/gm, '<!-- Start:AutoTable:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->\n' +
            createRuleTable() +
            '<!-- End:AutoTable -->');
        fs.writeFile('README.md', content, 'utf8', function (writeErr) {
            if (writeErr) {
                return console.error(writeErr);
            }
            console.log('[DONE] updating README.md ...');
            cb();
        });
    });
}
exports.updateReadme = updateReadme;
function createRuleContent(rule) {
    var usage = rule.usage ? "\n\n### Usage\n\n" + formatUsage(rule.usage) : '';
    var note = rule.note ? "\n\n### Note\n\n" + rule.note + "\n" : '';
    return "## " + rule.tslintRule + " (ESLint: [" + rule.eslintRule + "](" + rule.eslintUrl + "))\n\n" + rule.description + usage + note + "\n";
}
function updateRuleFile(name, rule) {
    var baseUrl = 'https://github.com/buzinas/tslint-eslint-rules/blob/master';
    var docFileName = "src/docs/rules/" + name + "Rule.md";
    return new es6_promise_1.Promise(function (fulfill, reject) {
        fs.readFile(docFileName, 'utf8', function (readErr, data) {
            rule.tslintUrl = rule.tslintUrl || baseUrl + "/" + docFileName;
            var content = readErr || !data ? '<!-- Start:AutoDoc\n End:AutoDoc -->' : data;
            content = content.replace(/^<!-- Start:AutoDoc((.*?(\n))+.*?)End:AutoDoc -->$/gm, [
                '<!-- Start:AutoDoc:: Modify `src/readme/rules.ts` and run `gulp readme` to update block -->\n',
                createRuleContent(rule),
                '\n<!-- End:AutoDoc -->' + (readErr ? '\n' : '')
            ].join(''));
            fs.writeFile(docFileName, content, 'utf8', function (writeErr) {
                if (writeErr) {
                    return reject(writeErr);
                }
                console.log(" - " + name);
                fulfill();
            });
        });
    });
}
function updateRuleFiles(cb) {
    var ruleDir = 'src/rules/';
    var allFiles = fs.readdirSync(ruleDir).filter(function (file) { return fs.lstatSync(path.join(ruleDir, file)).isFile(); });
    var ruleNames = allFiles
        .filter(function (name) { return /\.ts$/.test(name); })
        .map(function (name) { return name.substr(0, name.length - 7); });
    var allPromises = [];
    ruleNames.forEach(function (name) {
        allPromises.push(updateRuleFile(name, rules_1.ruleTSMap[name]));
    });
    es6_promise_1.Promise.all(allPromises).then(function () {
        console.log('[DONE] processing rule files ...');
        cb();
    });
}
exports.updateRuleFiles = updateRuleFiles;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlYWRtZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLElBQVksRUFBRSxXQUFNLElBQUksQ0FBQyxDQUFBO0FBQ3pCLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBQzdCLHNCQUFvRCxTQUFTLENBQUMsQ0FBQTtBQUU5RCxxQkFBcUIsS0FBSztJQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzVGLENBQUM7QUE0R0MsbUJBQVcsZUE1R1o7QUFFRDtJQUNFLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDcEIsYUFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7UUFDakIsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBUyxRQUFRLFNBQU0sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUksa0JBQVUsQ0FBQyxRQUFRLENBQUMsU0FBTSxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxJQUFJLENBQUMsdURBQXVELENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQsSUFBSSxTQUFTLENBQUM7UUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQixTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEdBQUcseUJBQXlCLEdBQUcsb0JBQW9CLENBQUM7UUFDNUYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEtBQUssZ0JBQWdCLEdBQUcsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9FLENBQUM7UUFDRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQUksSUFBSSxDQUFDLFVBQVUsVUFBSyxJQUFJLENBQUMsU0FBUyxNQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoRyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxLQUFLLGdCQUFnQixHQUFHLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztRQUNwRixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUksU0FBUyxNQUFHLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUksSUFBSSxDQUFDLFVBQVUsVUFBSyxJQUFJLENBQUMsU0FBUyxPQUFJLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFJLE1BQU0sTUFBRyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBSSxJQUFJLENBQUMsV0FBVyxNQUFHLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELHNCQUFzQixFQUFZO0lBQ2hDLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxVQUFDLE9BQU8sRUFBRSxJQUFJO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDeEIsMERBQTBELEVBQzFELGlHQUFpRztZQUNqRyxlQUFlLEVBQUU7WUFDakIsd0JBQXdCLENBQ3pCLENBQUM7UUFDRixFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQUMsUUFBUTtZQUNsRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDN0MsRUFBRSxFQUFFLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTBEQyxvQkFBWSxnQkExRGI7QUFFRCwyQkFBMkIsSUFBVztJQUNwQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFvQixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRyxHQUFHLEVBQUUsQ0FBQztJQUM5RSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLHFCQUFtQixJQUFJLENBQUMsSUFBSSxPQUFJLEdBQUcsRUFBRSxDQUFDO0lBQy9ELE1BQU0sQ0FBQyxRQUFNLElBQUksQ0FBQyxVQUFVLG1CQUFjLElBQUksQ0FBQyxVQUFVLFVBQUssSUFBSSxDQUFDLFNBQVMsY0FFNUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsSUFBSSxPQUNoQyxDQUFDO0FBQ0YsQ0FBQztBQUVELHdCQUF3QixJQUFZLEVBQUUsSUFBVztJQUMvQyxJQUFNLE9BQU8sR0FBRyw0REFBNEQsQ0FBQztJQUM3RSxJQUFNLFdBQVcsR0FBRyxvQkFBa0IsSUFBSSxZQUFTLENBQUM7SUFDcEQsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2pDLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxVQUFDLE9BQU8sRUFBRSxJQUFJO1lBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBTyxPQUFPLFNBQUksV0FBYSxDQUFDO1lBQy9ELElBQUksT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxzQ0FBc0MsR0FBRyxJQUFJLENBQUM7WUFDL0UsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQ3ZCLHNEQUFzRCxFQUN0RDtnQkFDRSwrRkFBK0Y7Z0JBQy9GLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDdkIsd0JBQXdCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzthQUNqRCxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDWCxDQUFDO1lBQ0YsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFDLFFBQVE7Z0JBQ2xELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUIsQ0FBQztnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQU0sSUFBTSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELHlCQUF5QixFQUFZO0lBQ25DLElBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQztJQUM3QixJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FDN0MsVUFBQSxJQUFJLElBQUksT0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQS9DLENBQStDLENBQ3hELENBQUM7SUFDRixJQUFNLFNBQVMsR0FBRyxRQUFRO1NBQ3ZCLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQWxCLENBQWtCLENBQUM7U0FDbEMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQ2hELElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN2QixTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtRQUNyQixXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsaUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxxQkFBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELEVBQUUsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBS0MsdUJBQWUsbUJBTGhCO0FBTUMiLCJmaWxlIjoicmVhZG1lL2luZGV4LmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
