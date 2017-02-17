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
        var walker = new NoDuplicateCaseWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'duplicate case label';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDuplicateCaseWalker = (function (_super) {
    __extends(NoDuplicateCaseWalker, _super);
    function NoDuplicateCaseWalker() {
        _super.apply(this, arguments);
    }
    NoDuplicateCaseWalker.prototype.visitSwitchStatement = function (node) {
        this.validateNoDupeCase(node);
        _super.prototype.visitSwitchStatement.call(this, node);
    };
    NoDuplicateCaseWalker.prototype.validateNoDupeCase = function (node) {
        var _this = this;
        var cases = Object.create(null);
        node.caseBlock.clauses.forEach(function (clause) {
            if (clause.kind === ts.SyntaxKind.CaseClause) {
                var key = clause.getText();
                if (cases[key]) {
                    _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
                }
                else {
                    cases[key] = clause;
                }
            }
        });
    };
    return NoDuplicateCaseWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRHVwbGljYXRlQ2FzZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDakMsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUV4QztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBT2pELENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUxhLG1CQUFjLEdBQUcsc0JBQXNCLENBQUM7SUFNeEQsV0FBQztBQUFELENBUEEsQUFPQyxDQVB5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FPaEQ7QUFQWSxZQUFJLE9BT2hCLENBQUE7QUFFRDtJQUFvQyx5Q0FBZTtJQUFuRDtRQUFvQyw4QkFBZTtJQXFCbkQsQ0FBQztJQXBCVyxvREFBb0IsR0FBOUIsVUFBK0IsSUFBd0I7UUFDckQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLGdCQUFLLENBQUMsb0JBQW9CLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVPLGtEQUFrQixHQUExQixVQUEyQixJQUF3QjtRQUFuRCxpQkFjQztRQWJDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtZQUNuQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM3QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNmLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUM3RixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUF1QixDQUFDO2dCQUN2QyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FyQkEsQUFxQkMsQ0FyQm1DLElBQUksQ0FBQyxVQUFVLEdBcUJsRCIsImZpbGUiOiJydWxlcy9ub0R1cGxpY2F0ZUNhc2VSdWxlLmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
