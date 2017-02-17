"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var OPTION_ALWAYS = 'always';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new ArrayBracketSpacingWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        noBeginningSpace: 'There should be no space after "["',
        noEndingSpace: 'There should be no space before "]"',
        requiredBeginningSpace: 'A space is required after "["',
        requiredEndingSpace: 'A space is required before "]"'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ArrayBracketSpacingWalker = (function (_super) {
    __extends(ArrayBracketSpacingWalker, _super);
    function ArrayBracketSpacingWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.singleValueException = false;
        this.objectsInArraysException = false;
        this.arraysInArraysException = false;
        var ruleOptions = this.getOptions();
        this.spaced = this.hasOption(OPTION_ALWAYS) || (ruleOptions && ruleOptions.length === 0);
        if (ruleOptions[1]) {
            this.singleValueException = typeof ruleOptions[1].singleValue !== 'undefined' && ruleOptions[1].singleValue !== this.spaced;
            this.objectsInArraysException = typeof ruleOptions[1].objectsInArrays !== 'undefined' && ruleOptions[1].objectsInArrays !== this.spaced;
            this.arraysInArraysException = typeof ruleOptions[1].arraysInArrays !== 'undefined' && ruleOptions[1].arraysInArrays !== this.spaced;
        }
    }
    ArrayBracketSpacingWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ArrayBindingPattern) {
            this.validateSquareBrackets(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ArrayBracketSpacingWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.validateSquareBrackets(node);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    ArrayBracketSpacingWalker.prototype.validateSquareBrackets = function (node) {
        var children = node.getChildren();
        var isSpaceAfterOpeningBracket = this.isSpaceBetween(children[0], children[1]);
        var isBreakAfterOpeningBracket = this.isLineBreakBetween(children[0], children[1]);
        var isSpaceBeforeClosingBracket = this.isSpaceBetween(children[children.length - 2], children[children.length - 1]);
        var isBreakBeforeClosingBracket = this.isLineBreakBetween(children[children.length - 2], children[children.length - 1]);
        var syntaxList = node.getChildren()[1];
        var itemsInArrayPattern = syntaxList.getChildren().filter(function (child) {
            return child.kind !== ts.SyntaxKind.CommaToken;
        });
        if (this.spaced && itemsInArrayPattern.length === 0) {
            return;
        }
        var openingBracketMustBeSpaced = (this.singleValueException && itemsInArrayPattern.length === 1) ||
            (this.arraysInArraysException && itemsInArrayPattern[0] && itemsInArrayPattern[0].kind === ts.SyntaxKind.ArrayLiteralExpression) ||
            (this.objectsInArraysException && itemsInArrayPattern[0] && itemsInArrayPattern[0].kind === ts.SyntaxKind.ObjectLiteralExpression)
            ? !this.spaced : this.spaced;
        var closingBracketMustBeSpaced = (this.singleValueException
            && itemsInArrayPattern.length === 1) ||
            (this.arraysInArraysException &&
                itemsInArrayPattern[itemsInArrayPattern.length - 1] &&
                itemsInArrayPattern[itemsInArrayPattern.length - 1].kind === ts.SyntaxKind.ArrayLiteralExpression) ||
            (this.objectsInArraysException
                && itemsInArrayPattern[itemsInArrayPattern.length - 1]
                && itemsInArrayPattern[itemsInArrayPattern.length - 1].kind === ts.SyntaxKind.ObjectLiteralExpression)
            ? !this.spaced : this.spaced;
        if (!isBreakAfterOpeningBracket) {
            if (openingBracketMustBeSpaced && !isSpaceAfterOpeningBracket) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.requiredBeginningSpace));
            }
            if (!openingBracketMustBeSpaced && isSpaceAfterOpeningBracket) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.noBeginningSpace));
            }
        }
        if (!isBreakBeforeClosingBracket) {
            if (closingBracketMustBeSpaced && !isSpaceBeforeClosingBracket) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.requiredEndingSpace));
            }
            if (!closingBracketMustBeSpaced && isSpaceBeforeClosingBracket) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.noEndingSpace));
            }
        }
    };
    ArrayBracketSpacingWalker.prototype.isSpaceBetween = function (node, nextNode) {
        return nextNode.getStart() - node.getEnd() > 0;
    };
    ArrayBracketSpacingWalker.prototype.isLineBreakBetween = function (node, nextNode) {
        return this.getEndPosition(node).line !== this.getStartPosition(nextNode).line;
    };
    ArrayBracketSpacingWalker.prototype.getStartPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    };
    ArrayBracketSpacingWalker.prototype.getEndPosition = function (node) {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    };
    return ArrayBracketSpacingWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2FycmF5QnJhY2tldFNwYWNpbmdSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ2pDLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFFeEMsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDO0FBRS9CO0lBQTBCLHdCQUF1QjtJQUFqRDtRQUEwQiw4QkFBdUI7SUFZakQsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLHlCQUF5QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBVmEsbUJBQWMsR0FBRztRQUM3QixnQkFBZ0IsRUFBRSxvQ0FBb0M7UUFDdEQsYUFBYSxFQUFFLHFDQUFxQztRQUNwRCxzQkFBc0IsRUFBRSwrQkFBK0I7UUFDdkQsbUJBQW1CLEVBQUUsZ0NBQWdDO0tBQ3RELENBQUM7SUFNSixXQUFDO0FBQUQsQ0FaQSxBQVlDLENBWnlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQVloRDtBQVpZLFlBQUksT0FZaEIsQ0FBQTtBQUVEO0lBQXdDLDZDQUFlO0lBTXJELG1DQUFZLFVBQXlCLEVBQUUsT0FBc0I7UUFDM0Qsa0JBQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBTHJCLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQUN0Qyw2QkFBd0IsR0FBWSxLQUFLLENBQUM7UUFDMUMsNEJBQXVCLEdBQVksS0FBSyxDQUFDO1FBSS9DLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFX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LElBQWEsRUFBRSxRQUFpQjtRQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLHNEQUFrQixHQUExQixVQUEyQixJQUFhLEVBQUUsUUFBaUI7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakYsQ0FBQztJQUVPLG9EQUFnQixHQUF4QixVQUF5QixJQUFhO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVPLGtEQUFjLEdBQXRCLFVBQXVCLElBQWE7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQWxHQSxBQWtHQyxDQWxHdUMsSUFBSSxDQUFDLFVBQVUsR0FrR3REIiwiZmlsZSI6InJ1bGVzL2FycmF5QnJhY2tldFNwYWNpbmdSdWxlLmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
