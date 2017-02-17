"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoControlRegexWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unexpected control character in regular expression';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoControlRegexWalker = (function (_super) {
    __extends(NoControlRegexWalker, _super);
    function NoControlRegexWalker() {
        _super.apply(this, arguments);
    }
    NoControlRegexWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateControlRegex(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoControlRegexWalker.prototype.visitNewExpression = function (node) {
        if (node.expression.getText() === 'RegExp') {
            this.visitRegularExpressionFunction(node);
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoControlRegexWalker.prototype.visitCallExpression = function (node) {
        if (node.expression.getText() === 'RegExp') {
            this.visitRegularExpressionFunction(node);
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoControlRegexWalker.prototype.visitRegularExpressionFunction = function (node) {
        if (node.arguments && node.arguments.length > 0 && node.arguments[0].kind === ts.SyntaxKind.StringLiteral) {
            this.validateControlRegex(node.arguments[0]);
        }
    };
    NoControlRegexWalker.prototype.validateControlRegex = function (node) {
        if (/[\x00-\x1f]/.test(node.text)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoControlRegexWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vQ29udHJvbFJlZ2V4UnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLEVBQUUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUNqQyxJQUFZLElBQUksV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRXhDO0lBQTBCLHdCQUF1QjtJQUFqRDtRQUEwQiw4QkFBdUI7SUFPakQsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTGEsbUJBQWMsR0FBRyxvREFBb0QsQ0FBQztJQU10RixXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQU9oRDtBQVBZLFlBQUksT0FPaEIsQ0FBQTtBQUVEO0lBQW1DLHdDQUFlO0lBQWxEO1FBQW1DLDhCQUFlO0lBK0JsRCxDQUFDO0lBOUJXLDREQUE2QixHQUF2QyxVQUF3QyxJQUEwQjtRQUNoRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsZ0JBQUssQ0FBQyw2QkFBNkIsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRVMsaURBQWtCLEdBQTVCLFVBQTZCLElBQXNCO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELGdCQUFLLENBQUMsa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVTLGtEQUFtQixHQUE3QixVQUE4QixJQUF1QjtRQUNuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxnQkFBSyxDQUFDLG1CQUFtQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyw2REFBOEIsR0FBdEMsVUFBdUMsSUFBdUI7UUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBcUIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7SUFDSCxDQUFDO0lBRU8sbURBQW9CLEdBQTVCLFVBQTZCLElBQTBCO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUM3RixDQUFDO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0EvQkEsQUErQkMsQ0EvQmtDLElBQUksQ0FBQyxVQUFVLEdBK0JqRCIsImZpbGUiOiJydWxlcy9ub0NvbnRyb2xSZWdleFJ1bGUuanMiLCJzb3VyY2VSb290IjoiZDpcXHByb2plY3RzXFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
