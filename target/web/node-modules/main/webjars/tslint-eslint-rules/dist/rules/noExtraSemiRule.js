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
        var walker = new NoExtraSemiWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'unnecessary semicolon';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoExtraSemiWalker = (function (_super) {
    __extends(NoExtraSemiWalker, _super);
    function NoExtraSemiWalker() {
        _super.apply(this, arguments);
        this.ALLOWED_PARENT_TYPES = [
            ts.SyntaxKind.ForStatement,
            ts.SyntaxKind.ForInStatement,
            ts.SyntaxKind.ForOfStatement,
            ts.SyntaxKind.WhileStatement,
            ts.SyntaxKind.DoStatement
        ];
    }
    NoExtraSemiWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.EmptyStatement) {
            this.visitEmptyStatement(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoExtraSemiWalker.prototype.visitClassDeclaration = function (node) {
        this.checkClass(node);
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    NoExtraSemiWalker.prototype.visitEmptyStatement = function (node) {
        if (this.ALLOWED_PARENT_TYPES.indexOf(node.parent.kind) === -1) {
            this.validateNoExtraSemi(node);
        }
    };
    NoExtraSemiWalker.prototype.checkClass = function (node) {
        var indexOf = node.getChildren().map(function (child) { return child.kind; }).indexOf(ts.SyntaxKind.FirstPunctuation);
        var children = node.getChildren().slice(indexOf);
        this.checkClassChildren(children);
    };
    NoExtraSemiWalker.prototype.checkClassChildren = function (children) {
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if ((child.kind === ts.SyntaxKind.SyntaxList || child.kind === ts.SyntaxKind.SemicolonClassElement) && child.getText() === ';') {
                this.validateNoExtraSemi(child);
            }
            else if (child.kind === ts.SyntaxKind.SyntaxList && child.getText().indexOf(';') !== -1) {
                this.checkClassChildren(child.getChildren());
            }
        }
    };
    NoExtraSemiWalker.prototype.validateNoExtraSemi = function (node) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    };
    return NoExtraSemiWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRXh0cmFTZW1pUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLEVBQUUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUNqQyxJQUFZLElBQUksV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRXhDO0lBQTBCLHdCQUF1QjtJQUFqRDtRQUEwQiw4QkFBdUI7SUFPakQsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTGEsbUJBQWMsR0FBRyx1QkFBdUIsQ0FBQztJQU16RCxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQU9oRDtBQVBZLFlBQUksT0FPaEIsQ0FBQTtBQUVEO0lBQWdDLHFDQUFlO0lBQS9DO1FBQWdDLDhCQUFlO1FBQ3JDLHlCQUFvQixHQUFHO1lBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWTtZQUMxQixFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWM7WUFDNUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjO1lBQzVCLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYztZQUM1QixFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVc7U0FDMUIsQ0FBQztJQXlDSixDQUFDO0lBdkNXLHFDQUFTLEdBQW5CLFVBQW9CLElBQWE7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQW9CLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsZ0JBQUssQ0FBQyxTQUFTLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVTLGlEQUFxQixHQUEvQixVQUFnQyxJQUF5QjtRQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLGdCQUFLLENBQUMscUJBQXFCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLCtDQUFtQixHQUEzQixVQUE0QixJQUFrQjtRQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBQ0gsQ0FBQztJQUVPLHNDQUFVLEdBQWxCLFVBQW1CLElBQXlCO1FBQzFDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxFQUFWLENBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEcsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLDhDQUFrQixHQUExQixVQUEyQixRQUF3QjtRQUNqRCxHQUFHLENBQUMsQ0FBYyxVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVEsQ0FBQztZQUF0QixJQUFJLEtBQUssaUJBQUE7WUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMvQyxDQUFDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sK0NBQW1CLEdBQTNCLFVBQTRCLElBQWE7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FoREEsQUFnREMsQ0FoRCtCLElBQUksQ0FBQyxVQUFVLEdBZ0Q5QyIsImZpbGUiOiJydWxlcy9ub0V4dHJhU2VtaVJ1bGUuanMiLCJzb3VyY2VSb290IjoiZDpcXHByb2plY3RzXFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
