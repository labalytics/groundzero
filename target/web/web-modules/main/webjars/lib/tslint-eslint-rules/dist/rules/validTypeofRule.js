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
        var walker = new ValidTypeofWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'invalid typeof comparison value';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ValidTypeofWalker = (function (_super) {
    __extends(ValidTypeofWalker, _super);
    function ValidTypeofWalker() {
        _super.apply(this, arguments);
        this.VALID_TYPES = ['symbol', 'undefined', 'object', 'boolean', 'number', 'string', 'function'];
        this.OPERATORS = [ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken];
    }
    ValidTypeofWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.TypeOfExpression) {
            this.validateTypeOf(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ValidTypeofWalker.prototype.validateTypeOf = function (node) {
        if (node.parent.kind === ts.SyntaxKind.BinaryExpression) {
            var parent_1 = node.parent;
            if (this.OPERATORS.indexOf(parent_1.operatorToken.kind) !== -1) {
                var sibling = parent_1.left === node ? parent_1.right : parent_1.left;
                if (sibling.kind === ts.SyntaxKind.StringLiteral && this.VALID_TYPES.indexOf(sibling.text) === -1) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
            }
        }
    };
    return ValidTypeofWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3ZhbGlkVHlwZW9mUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLEVBQUUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUNqQyxJQUFZLElBQUksV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRXhDO0lBQTBCLHdCQUF1QjtJQUFqRDtRQUEwQiw4QkFBdUI7SUFPakQsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTGEsbUJBQWMsR0FBRyxpQ0FBaUMsQ0FBQztJQU1uRSxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQU9oRDtBQVBZLFlBQUksT0FPaEIsQ0FBQTtBQUVEO0lBQWdDLHFDQUFlO0lBQS9DO1FBQWdDLDhCQUFlO1FBQ3JDLGdCQUFXLEdBQUcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMzRixjQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFxQmpMLENBQUM7SUFuQlcscUNBQVMsR0FBbkIsVUFBb0IsSUFBYTtRQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBMkIsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCxnQkFBSyxDQUFDLFNBQVMsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRU8sMENBQWMsR0FBdEIsVUFBdUIsSUFBeUI7UUFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBTSxRQUFNLEdBQUksSUFBSSxDQUFDLE1BQThCLENBQUM7WUFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELElBQU0sT0FBTyxHQUFHLFFBQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHLFFBQU0sQ0FBQyxLQUFLLEdBQUcsUUFBTSxDQUFDLElBQUksQ0FBQztnQkFFbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBRSxPQUE0QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDSCx3QkFBQztBQUFELENBdkJBLEFBdUJDLENBdkIrQixJQUFJLENBQUMsVUFBVSxHQXVCOUMiLCJmaWxlIjoicnVsZXMvdmFsaWRUeXBlb2ZSdWxlLmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
