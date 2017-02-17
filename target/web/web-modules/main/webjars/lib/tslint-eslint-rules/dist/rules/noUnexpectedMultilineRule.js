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
        var walker = new NoUnexpectedMultilineWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        func: 'unexpected newline between function and ( of function call',
        prop: 'unexpected newline between object and [ of property access',
        template: 'unexpected newline between template tag and template literal'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoUnexpectedMultilineWalker = (function (_super) {
    __extends(NoUnexpectedMultilineWalker, _super);
    function NoUnexpectedMultilineWalker() {
        _super.apply(this, arguments);
    }
    NoUnexpectedMultilineWalker.prototype.visitCallExpression = function (node) {
        var firstLeftParen = node.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenParenToken; })[0];
        if (this.isBreakBefore(firstLeftParen)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.visitElementAccessExpression = function (node) {
        var firstLeftSquareBracket = node.getChildren().filter(function (ch) { return ch.kind === ts.SyntaxKind.OpenBracketToken; })[0];
        if (this.isBreakBefore(firstLeftSquareBracket)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
        }
        _super.prototype.visitElementAccessExpression.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
            var children = node.getChildren();
            var tag = children.filter(function (ch) { return ch.kind === ts.SyntaxKind.Identifier; })[0];
            var tagIndex = children.indexOf(tag);
            if (tag && children[tagIndex + 1]) {
                var template = children[tagIndex + 1];
                if (this.isBreakBefore(template)) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.getMessage(node)));
                }
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoUnexpectedMultilineWalker.prototype.isBreakBefore = function (node) {
        if (node.parent) {
            var children = node.parent.getChildren();
            var nodeIndex = children.indexOf(node);
            if (nodeIndex > 0) {
                var nodeLine = this.getStartPosition(node).line;
                var previousNodeLine = this.getEndPosition(children[nodeIndex - 1]).line;
                if (nodeLine !== previousNodeLine) {
                    return true;
                }
            }
        }
        return false;
    };
    NoUnexpectedMultilineWalker.prototype.getMessage = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.CallExpression:
                return Rule.FAILURE_STRING.func;
            case ts.SyntaxKind.ElementAccessExpression:
                return Rule.FAILURE_STRING.prop;
            case ts.SyntaxKind.TaggedTemplateExpression:
                return Rule.FAILURE_STRING.template;
            default:
                throw 'Unexpected node type: ' + ts.SyntaxKind[node.kind];
        }
    };
    NoUnexpectedMultilineWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    NoUnexpectedMultilineWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return NoUnexpectedMultilineWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vVW5leHBlY3RlZE11bHRpbGluZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDakMsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUV4QztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBV2pELENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDOUUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQVRhLG1CQUFjLEdBQUc7UUFDN0IsSUFBSSxFQUFFLDREQUE0RDtRQUNsRSxJQUFJLEVBQUUsNERBQTREO1FBQ2xFLFFBQVEsRUFBRSw4REFBOEQ7S0FDekUsQ0FBQztJQU1KLFdBQUM7QUFBRCxDQVhBLEFBV0MsQ0FYeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBV2hEO0FBWFksWUFBSSxPQVdoQixDQUFBO0FBRUQ7SUFBMEMsK0NBQWU7SUFBekQ7UUFBMEMsOEJBQWU7SUE2RXpELENBQUM7SUE1RVcseURBQW1CLEdBQTdCLFVBQThCLElBQXVCO1FBQ25ELElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUF4QyxDQUF3QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFB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
