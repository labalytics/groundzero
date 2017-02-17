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
        var walker = new ObjectCurlySpacingWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        always: {
            start: "A space is required after '{'",
            end: "A space is required before '}'"
        },
        never: {
            start: "There should be no space after '{'",
            end: "There should be no space before '}'"
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ObjectCurlySpacingWalker = (function (_super) {
    __extends(ObjectCurlySpacingWalker, _super);
    function ObjectCurlySpacingWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.always = this.hasOption(OPTION_ALWAYS) || (this.getOptions() && this.getOptions().length === 0);
    }
    ObjectCurlySpacingWalker.prototype.visitNode = function (node) {
        var bracedKind = [
            ts.SyntaxKind.ObjectLiteralExpression,
            ts.SyntaxKind.ObjectBindingPattern,
            ts.SyntaxKind.NamedImports,
            ts.SyntaxKind.NamedExports
        ];
        if (bracedKind.indexOf(node.kind) > -1) {
            this.checkSpacingInsideBraces(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ObjectCurlySpacingWalker.prototype.checkSpacingInsideBraces = function (node) {
        var text = node.getText();
        if (text.indexOf('\n') !== -1 || text === '{}') {
            return;
        }
        var leadingSpace = text.match(/^\{(\s{0,2})/)[1].length;
        var trailingSpace = text.match(/(\s{0,2})}$/)[1].length;
        if (this.always) {
            if (leadingSpace === 0) {
                this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.always.start));
            }
            if (trailingSpace === 0) {
                this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.always.end));
            }
        }
        else {
            if (leadingSpace > 0) {
                this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.never.start));
            }
            if (trailingSpace > 0) {
                this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.never.end));
            }
        }
    };
    return ObjectCurlySpacingWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL29iamVjdEN1cmx5U3BhY2luZ1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDakMsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUV4QyxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUM7QUFFL0I7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQWdCakQsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMzRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBZGEsbUJBQWMsR0FBRztRQUM3QixNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsK0JBQStCO1lBQ3RDLEdBQUcsRUFBRSxnQ0FBZ0M7U0FDdEM7UUFDRCxLQUFLLEVBQUU7WUFDTCxLQUFLLEVBQUUsb0NBQW9DO1lBQzNDLEdBQUcsRUFBRSxxQ0FBcUM7U0FDM0M7S0FDRixDQUFDO0lBTUosV0FBQztBQUFELENBaEJBLEFBZ0JDLENBaEJ5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FnQmhEO0FBaEJZLFlBQUksT0FnQmhCLENBQUE7QUFFRDtJQUF1Qyw0Q0FBZTtJQUlwRCxrQ0FBWSxVQUF5QixFQUFFLE9BQXNCO1FBQzNELGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBRVMsNENBQVMsR0FBbkIsVUFBb0IsSUFBYTtRQUMvQixJQUFNLFVBQVUsR0FBRztZQUNqQixFQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QjtZQUNyQyxFQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQjtZQUNsQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVk7WUFDMUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZO1NBQzNCLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxnQkFBSyxDQUFDLFNBQVMsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRU8sMkRBQXdCLEdBQWhDLFVBQWlDLElBQWE7UUFDNUMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFL0MsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzFELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVGLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUYsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNGLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0YsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUgsK0JBQUM7QUFBRCxDQS9DQSxBQStDQyxDQS9Dc0MsSUFBSSxDQUFDLFVBQVUsR0ErQ3JEIiwiZmlsZSI6InJ1bGVzL29iamVjdEN1cmx5U3BhY2luZ1J1bGUuanMiLCJzb3VyY2VSb290IjoiZDpcXHByb2plY3RzXFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
