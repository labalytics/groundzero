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
        var walker = new NoInnerDeclarationsWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInnerDeclarationsWalker = (function (_super) {
    __extends(NoInnerDeclarationsWalker, _super);
    function NoInnerDeclarationsWalker() {
        _super.apply(this, arguments);
        this.VALID_PARENT_TYPES = [
            ts.SyntaxKind.SourceFile,
            ts.SyntaxKind.FunctionDeclaration,
            ts.SyntaxKind.FunctionExpression,
            ts.SyntaxKind.ArrowFunction,
            ts.SyntaxKind.MethodDeclaration,
            ts.SyntaxKind.ModuleDeclaration,
            ts.SyntaxKind.Constructor
        ];
    }
    NoInnerDeclarationsWalker.prototype.visitFunctionDeclaration = function (node) {
        this.validateInnerDeclaration(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    NoInnerDeclarationsWalker.prototype.visitVariableStatement = function (node) {
        if (this.hasOption('both') && node.declarationList.getFirstToken().kind === ts.SyntaxKind.VarKeyword) {
            this.validateInnerDeclaration(node);
        }
        _super.prototype.visitVariableStatement.call(this, node);
    };
    NoInnerDeclarationsWalker.prototype.validateInnerDeclaration = function (node) {
        var body = this.nearestBody(node);
        var isValid = (body.isSourceFile && body.distance === 1) || body.distance === 2;
        if (!isValid) {
            var decl = node.kind === ts.SyntaxKind.FunctionDeclaration ? 'function' : 'variable';
            var root = body.isSourceFile ? 'program' : 'function body';
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), "move " + decl + " declaration to " + root + " root"));
        }
    };
    NoInnerDeclarationsWalker.prototype.nearestBody = function (node) {
        var ancestor = node.parent;
        var generation = 1;
        while (ancestor && this.VALID_PARENT_TYPES.indexOf(ancestor.kind) === -1) {
            generation++;
            ancestor = ancestor.parent;
        }
        return {
            isSourceFile: (ancestor && ancestor.kind === ts.SyntaxKind.SourceFile) || !ancestor,
            distance: generation
        };
    };
    return NoInnerDeclarationsWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vSW5uZXJEZWNsYXJhdGlvbnNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ2pDLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFFeEM7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQUtqRCxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUkseUJBQXlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FMQSxBQUtDLENBTHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUtoRDtBQUxZLFlBQUksT0FLaEIsQ0FBQTtBQUVEO0lBQXdDLDZDQUFlO0lBQXZEO1FBQXdDLDhCQUFlO1FBQzdDLHVCQUFrQixHQUFHO1lBQzNCLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVTtZQUN4QixFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQjtZQUNqQyxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQjtZQUNoQyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWE7WUFDM0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7WUFDL0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7WUFDL0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXO1NBQzFCLENBQUM7SUF3Q0osQ0FBQztJQXRDVyw0REFBd0IsR0FBbEMsVUFBbUMsSUFBNEI7UUFDN0QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLGdCQUFLLENBQUMsd0JBQXdCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVTLDBEQUFzQixHQUFoQyxVQUFpQyxJQUEwQjtRQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUNELGdCQUFLLENBQUMsc0JBQXNCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLDREQUF3QixHQUFoQyxVQUFpQyxJQUFhO1FBQzVDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUM7UUFFbEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDdkYsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLEdBQUcsZUFBZSxDQUFDO1lBRTdELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVEsSUFBSSx3QkFBbUIsSUFBSSxVQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BILENBQUM7SUFDSCxDQUFDO0lBRU8sK0NBQVcsR0FBbkIsVUFBb0IsSUFBYTtRQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQixPQUFPLFFBQVEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3pFLFVBQVUsRUFBRSxDQUFDO1lBQ2IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDN0IsQ0FBQztRQUVELE1BQU0sQ0FBQztZQUNMLFlBQVksRUFBRSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ25GLFFBQVEsRUFBRSxVQUFVO1NBQ3JCLENBQUM7SUFDSixDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQWpEQSxBQWlEQyxDQWpEdUMsSUFBSSxDQUFDLFVBQVUsR0FpRHREIiwiZmlsZSI6InJ1bGVzL25vSW5uZXJEZWNsYXJhdGlvbnNSdWxlLmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
