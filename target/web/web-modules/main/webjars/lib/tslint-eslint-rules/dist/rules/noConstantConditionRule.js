"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var token_1 = require('../support/token');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoConstantConditionWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unexpected constant condition';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoConstantConditionWalker = (function (_super) {
    __extends(NoConstantConditionWalker, _super);
    function NoConstantConditionWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.checkLoops = true;
        this.isInConditional = false;
        var opts = this.getOptions();
        if (opts.length && opts[0].checkLoops === false) {
            this.checkLoops = false;
        }
    }
    NoConstantConditionWalker.prototype.visitIfStatement = function (node) {
        this.validateCondition(node.expression);
        _super.prototype.visitIfStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitWhileStatement = function (node) {
        if (this.checkLoops) {
            this.validateCondition(node.expression);
        }
        _super.prototype.visitWhileStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitDoStatement = function (node) {
        if (this.checkLoops) {
            this.validateCondition(node.expression);
        }
        _super.prototype.visitDoStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitForStatement = function (node) {
        if (this.checkLoops && node.condition) {
            this.validateCondition(node.condition);
        }
        _super.prototype.visitForStatement.call(this, node);
    };
    NoConstantConditionWalker.prototype.visitConditionalExpression = function (node) {
        this.validateCondition(node.condition);
        _super.prototype.visitConditionalExpression.call(this, node);
    };
    NoConstantConditionWalker.prototype.validateCondition = function (expression) {
        this.isInConditional = true;
        if (this.isConstant(expression)) {
            this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING));
        }
        this.walkChildren(expression);
        this.isInConditional = false;
    };
    NoConstantConditionWalker.prototype.isConstant = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.ArrayLiteralExpression:
                return true;
            case ts.SyntaxKind.PostfixUnaryExpression:
                return this.isConstant(node.operand);
            case ts.SyntaxKind.BinaryExpression:
                if (token_1.isAssignmentToken(node.operatorToken)) {
                    return this.isConstant(node.right);
                }
                return this.isConstant(node.left) && this.isConstant(node.right);
            case ts.SyntaxKind.ConditionalExpression:
                return this.isConstant(node.condition);
            case ts.SyntaxKind.PrefixUnaryExpression:
                if (node.getFirstToken().kind === ts.SyntaxKind.ExclamationToken) {
                    return this.isConstant(node.operand);
                }
                return true;
            case ts.SyntaxKind.ParenthesizedExpression:
                return this.isConstant(node.expression);
        }
        return false;
    };
    return NoConstantConditionWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vQ29uc3RhbnRDb25kaXRpb25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ2pDLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDeEMsc0JBQWtDLGtCQUFrQixDQUFDLENBQUE7QUFFckQ7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQU9qRCxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUkseUJBQXlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFMYSxtQkFBYyxHQUFHLCtCQUErQixDQUFDO0lBTWpFLFdBQUM7QUFBRCxDQVBBLEFBT0MsQ0FQeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBT2hEO0FBUFksWUFBSSxPQU9oQixDQUFBO0FBRUQ7SUFBd0MsNkNBQWU7SUFDckQsbUNBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUMzRCxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFTckIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQVI5QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQztJQUNILENBQUM7SUFLUyxvREFBZ0IsR0FBMUIsVUFBMkIsSUFBb0I7UUFDN0MsSUFBSSxDQUFD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QkFBaUIsQ0FBRSxJQUE0QixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNySCxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMscUJBQXFCO2dCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFpQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZFLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUI7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7b0JBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFFLElBQWlDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JFLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUI7Z0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFFLElBQW1DLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQTlGQSxBQThGQyxDQTlGdUMsSUFBSSxDQUFDLFVBQVUsR0E4RnREIiwiZmlsZSI6InJ1bGVzL25vQ29uc3RhbnRDb25kaXRpb25SdWxlLmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
