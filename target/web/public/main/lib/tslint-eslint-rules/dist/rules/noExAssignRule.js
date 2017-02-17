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
        var walker = new NoExAssignWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'do not assign to the exception parameter';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoExAssignWalker = (function (_super) {
    __extends(NoExAssignWalker, _super);
    function NoExAssignWalker() {
        _super.apply(this, arguments);
        this.isInCatchClause = false;
        this.variableNode = null;
    }
    NoExAssignWalker.prototype.visitCatchClause = function (node) {
        this.variableNode = node.variableDeclaration;
        this.isInCatchClause = true;
        _super.prototype.visitCatchClause.call(this, node);
        this.isInCatchClause = false;
        this.variableNode = null;
    };
    NoExAssignWalker.prototype.visitBinaryExpression = function (node) {
        var _this = this;
        if (this.isInCatchClause) {
            if (!token_1.isAssignmentToken(node.operatorToken)) {
                return;
            }
            if (node.left.kind === ts.SyntaxKind.Identifier && this.variableNode.name.getText() === node.left.getText()) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
            else if (node.left.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                var els = node.left.elements;
                if (els.some(function (el) { return el.getText() === _this.variableNode.getText(); })) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
            }
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    return NoExAssignWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRXhBc3NpZ25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ2pDLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDeEMsc0JBQWtDLGtCQUFrQixDQUFDLENBQUE7QUFFckQ7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQU9qRCxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFMYSxtQkFBYyxHQUFHLDBDQUEwQyxDQUFDO0lBTTVFLFdBQUM7QUFBRCxDQVBBLEFBT0MsQ0FQeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBT2hEO0FBUFksWUFBSSxPQU9oQixDQUFBO0FBRUQ7SUFBK0Isb0NBQWU7SUFBOUM7UUFBK0IsOEJBQWU7UUFDcEMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsaUJBQVksR0FBMkIsSUFBSSxDQUFDO0lBNEJ0RCxDQUFDO0lBMUJXLDJDQUFnQixHQUExQixVQUEyQixJQUFvQjtRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixnQkFBSyxDQUFDLGdCQUFnQixZQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFUyxnREFBcUIsR0FBL0IsVUFBZ0MsSUFBeUI7UUFBekQsaUJBaUJDO1FBaEJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMseUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1RyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM3RixDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxJQUFNLEdBQUcsR0FBSSxJQUFJLENBQUMsSUFBa0MsQ0FBQyxRQUFRLENBQUM7Z0JBQzlELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELGdCQUFLLENBQUMscUJBQXFCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0E5QkEsQUE4QkMsQ0E5QjhCLElBQUksQ0FBQyxVQUFVLEdBOEI3QyIsImZpbGUiOiJydWxlcy9ub0V4QXNzaWduUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJkOlxccHJvamVjdHNcXHRzbGludC1lc2xpbnQtcnVsZXNcXHNyYyJ9
