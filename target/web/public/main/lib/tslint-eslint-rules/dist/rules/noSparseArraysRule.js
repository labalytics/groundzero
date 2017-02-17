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
        var walker = new NoSparseArraysWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unexpected comma in middle of array';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoSparseArraysWalker = (function (_super) {
    __extends(NoSparseArraysWalker, _super);
    function NoSparseArraysWalker() {
        _super.apply(this, arguments);
    }
    NoSparseArraysWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.validateNoSparseArray(node);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    NoSparseArraysWalker.prototype.validateNoSparseArray = function (node) {
        var hasEmptySlot = node.elements.some(function (el) { return el.kind === ts.SyntaxKind.OmittedExpression; });
        if (hasEmptySlot) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoSparseArraysWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vU3BhcnNlQXJyYXlzUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLEVBQUUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUNqQyxJQUFZLElBQUksV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRXhDO0lBQTBCLHdCQUF1QjtJQUFqRDtRQUEwQiw4QkFBdUI7SUFPakQsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTGEsbUJBQWMsR0FBRyxxQ0FBcUMsQ0FBQztJQU12RSxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQU9oRDtBQVBZLFlBQUksT0FPaEIsQ0FBQTtBQUVEO0lBQW1DLHdDQUFlO0lBQWxEO1FBQW1DLDhCQUFlO0lBYWxELENBQUM7SUFaVywwREFBMkIsR0FBckMsVUFBc0MsSUFBK0I7UUFDbkUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGdCQUFLLENBQUMsMkJBQTJCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLG9EQUFxQixHQUE3QixVQUE4QixJQUErQjtRQUMzRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDO1FBRTNGLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDN0YsQ0FBQztJQUNILENBQUM7SUFDSCwyQkFBQztBQUFELENBYkEsQUFhQyxDQWJrQyxJQUFJLENBQUMsVUFBVSxHQWFqRCIsImZpbGUiOiJydWxlcy9ub1NwYXJzZUFycmF5c1J1bGUuanMiLCJzb3VyY2VSb290IjoiZDpcXHByb2plY3RzXFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
