"use strict";
var es6_promise_1 = require('es6-promise');
var https = require('https');
var rules_1 = require('./rules');
function camelCaseToDash(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function arrayDiff(source, target) {
    return source.filter(function (item) { return target.indexOf(item) === -1; });
}
function requestFromGithub(path, callback) {
    var options = {
        path: path,
        host: 'api.github.com',
        headers: {
            'User-Agent': 'tslint-eslint-rules'
        }
    };
    https.get(options, function (resp) {
        resp.setEncoding('utf8');
        var buffer = [];
        resp.on('data', function (chunk) {
            buffer.push(chunk);
        });
        resp.on('end', function () {
            var data = JSON.parse(buffer.join(''));
            callback(data);
        });
    }).on('error', function (e) {
        console.error(e);
    });
}
function compareToESLint() {
    return new es6_promise_1.Promise(function (fulfill, reject) {
        requestFromGithub('/repos/eslint/eslint/contents/lib/rules', function (data) {
            var rules = data
                .filter(function (obj) { return obj.name.endsWith('.js'); })
                .map(function (obj) { return obj.name.substring(0, obj.name.length - 3); });
            var esRules = Object.keys(rules_1.ruleESMap);
            var missing = arrayDiff(rules.map(function (x) { return rules_1.toCamelCase(x); }), esRules);
            var deprecated = arrayDiff(esRules, rules.map(function (x) { return rules_1.toCamelCase(x); }));
            var buffer = [];
            if (missing.length) {
                buffer.push('Missing ESLint rules (http://eslint.org/docs/rules):');
                missing.forEach(function (rule) {
                    var name = camelCaseToDash(rule);
                    buffer.push("- " + name);
                });
            }
            if (deprecated.length) {
                buffer.push('Deprecated ESLint rules:');
                deprecated.forEach(function (rule) {
                    var name = camelCaseToDash(rule);
                    buffer.push("- " + name);
                });
            }
            if (missing.length + deprecated.length === 0) {
                buffer.push('ESLint rules are in sync!');
            }
            console.log(buffer.join('\n'), '\n');
            fulfill();
        });
    });
}
exports.compareToESLint = compareToESLint;
function compareToTSLint() {
    return new es6_promise_1.Promise(function (fulfill, reject) {
        requestFromGithub('/repos/palantir/tslint/contents/src/rules', function (data) {
            var rules = data
                .filter(function (obj) { return obj.name.endsWith('.ts'); })
                .map(function (obj) { return obj.name.substring(0, obj.name.length - 7); });
            var notInUse = require('../../src/readme/unusedTSLintRules.json');
            notInUse.forEach(function (name) {
                var camel = rules_1.toCamelCase(name);
                var index = rules.indexOf(camel);
                if (index > -1) {
                    rules.splice(index, 1);
                }
            });
            var tsRules = Object.keys(rules_1.ruleTSMap);
            var missing = arrayDiff(rules, tsRules);
            var buffer = [];
            if (missing.length) {
                buffer.push('Missing TSLint rules (http://palantir.github.io/tslint/rules):');
                missing.forEach(function (rule) {
                    var name = camelCaseToDash(rule);
                    buffer.push("- " + name);
                });
            }
            else {
                buffer.push('TSLint rules are in sync!');
            }
            console.log(buffer.join('\n'), '\n');
            fulfill();
        });
    });
}
exports.compareToTSLint = compareToTSLint;

//# sourceMappingURL=data:application/json;base64,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RyxJQUFJO2lCQUNmLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUF3QixDQUFDO2lCQUN2QyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQTFDLENBQTBDLENBQUMsQ0FBQztZQUUxRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMseUNBQXlDLENBQUMsQ0FBQztZQUNwRSxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtnQkFDcEIsSUFBTSxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDZixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDekIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUyxDQUFDLENBQUM7WUFDdkMsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMxQyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztnQkFDOUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7b0JBQ25CLElBQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFLLElBQU0sQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyQyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBSUMsdUJBQWUsbUJBSmhCO0FBS0MiLCJmaWxlIjoicmVhZG1lL2ZldGNoLmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
