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
        var walker = new NoInvalidRegexpWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInvalidRegexpWalker = (function (_super) {
    __extends(NoInvalidRegexpWalker, _super);
    function NoInvalidRegexpWalker() {
        _super.apply(this, arguments);
    }
    NoInvalidRegexpWalker.prototype.visitNewExpression = function (node) {
        this.validateInvalidRegExp(node);
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoInvalidRegexpWalker.prototype.visitCallExpression = function (node) {
        this.validateInvalidRegExp(node);
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoInvalidRegexpWalker.prototype.validateInvalidRegExp = function (node) {
        if (node.expression.getText() === 'RegExp') {
            var args = node.arguments;
            if (args && args.length > 0 && args[0].kind === ts.SyntaxKind.StringLiteral) {
                var expr = args[0].text;
                var flags = args.length > 1 && args[1].kind === ts.SyntaxKind.StringLiteral ? args[1].text : undefined;
                var regex = void 0;
                try {
                    regex = new RegExp(expr, flags);
                }
                catch (e) {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), e.message));
                }
            }
        }
    };
    return NoInvalidRegexpWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vSW52YWxpZFJlZ2V4cFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDakMsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUV4QztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBS2pELENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUxBLEFBS0MsQ0FMeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBS2hEO0FBTFksWUFBSSxPQUtoQixDQUFBO0FBRUQ7SUFBb0MseUNBQWU7SUFBbkQ7UUFBb0MsOEJBQWU7SUE0Qm5ELENBQUM7SUEzQlcsa0RBQWtCLEdBQTVCLFVBQTZCLElBQXNCO1FBQ2pELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxnQkFBSyxDQUFDLGtCQUFrQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFUyxtREFBbUIsR0FBN0IsVUFBOEIsSUFBdUI7UUFDbkQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGdCQUFLLENBQUMsbUJBQW1CLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVPLHFEQUFxQixHQUE3QixVQUE4QixJQUF1QjtRQUNuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLElBQU0sSUFBSSxHQUFJLElBQUksQ0FBQyxDQUFDLENBQXNCLENBQUMsSUFBSSxDQUFDO2dCQUNoRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxHQUFJLElBQUksQ0FBQyxDQUFDLENBQXNCLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztnQkFFL0gsSUFBSSxLQUFLLFNBQVEsQ0FBQztnQkFDbEIsSUFBSSxDQUFDO29CQUNILEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLENBQ0E7Z0JBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbkYsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0E1QkEsQUE0QkMsQ0E1Qm1DLElBQUksQ0FBQyxVQUFVLEdBNEJsRCIsImZpbGUiOiJydWxlcy9ub0ludmFsaWRSZWdleHBSdWxlLmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
