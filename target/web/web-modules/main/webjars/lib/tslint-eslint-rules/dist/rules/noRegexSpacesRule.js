"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoRegexSpacesWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoRegexSpacesWalker = (function (_super) {
    __extends(NoRegexSpacesWalker, _super);
    function NoRegexSpacesWalker() {
        _super.apply(this, arguments);
    }
    NoRegexSpacesWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateMultipleSpaces(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoRegexSpacesWalker.prototype.validateMultipleSpaces = function (node) {
        var res = /( {2,})+?/.exec(node.text);
        if (res) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), "spaces are hard to count - use {" + res[0].length + "}"));
        }
    };
    return NoRegexSpacesWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vUmVnZXhTcGFjZXNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFFeEM7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQUtqRCxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FMQSxBQUtDLENBTHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUtoRDtBQUxZLFlBQUksT0FLaEIsQ0FBQTtBQUVEO0lBQWtDLHVDQUFlO0lBQWpEO1FBQWtDLDhCQUFlO0lBWWpELENBQUM7SUFYVywyREFBNkIsR0FBdkMsVUFBd0MsSUFBMEI7UUFDaEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLGdCQUFLLENBQUMsNkJBQTZCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVPLG9EQUFzQixHQUE5QixVQUErQixJQUEwQjtRQUN2RCxJQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUscUNBQW1DLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLE1BQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0gsQ0FBQztJQUNILENBQUM7SUFDSCwwQkFBQztBQUFELENBWkEsQUFZQyxDQVppQyxJQUFJLENBQUMsVUFBVSxHQVloRCIsImZpbGUiOiJydWxlcy9ub1JlZ2V4U3BhY2VzUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJkOlxccHJvamVjdHNcXHRzbGludC1lc2xpbnQtcnVsZXNcXHNyYyJ9
