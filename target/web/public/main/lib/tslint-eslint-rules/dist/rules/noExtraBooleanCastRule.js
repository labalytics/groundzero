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
        var walker = new NoExtraBooleanCastWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        if: 'redundant double negation in an if statement condition',
        do: 'redundant double negation in a do while loop condition',
        while: 'redundant double negation in a while loop condition',
        ternaryif: 'redundant double negation in a ternary condition',
        for: 'redundant double negation in a for loop condition',
        unaryCast: 'redundant multiple negation',
        objectCast: 'redundant double negation in call to Boolean()',
        newCast: 'redundant double negation in Boolean constructor call'
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoExtraBooleanCastWalker = (function (_super) {
    __extends(NoExtraBooleanCastWalker, _super);
    function NoExtraBooleanCastWalker() {
        _super.apply(this, arguments);
    }
    NoExtraBooleanCastWalker.prototype.visitPrefixUnaryExpression = function (node) {
        this.validateNoExtraBoolean(node);
        _super.prototype.visitPrefixUnaryExpression.call(this, node);
    };
    NoExtraBooleanCastWalker.prototype.validateNoExtraBoolean = function (node) {
        var parent = node.parent;
        var grandparent = parent.parent;
        if (node.operator !== ts.SyntaxKind.ExclamationToken ||
            parent.kind !== ts.SyntaxKind.PrefixUnaryExpression ||
            parent.operator !== ts.SyntaxKind.ExclamationToken) {
            return;
        }
        if (grandparent.kind === ts.SyntaxKind.BinaryExpression) {
            grandparent = grandparent.parent;
        }
        if (grandparent.kind === ts.SyntaxKind.IfStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.if));
        }
        else if (grandparent.kind === ts.SyntaxKind.DoStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.do));
        }
        else if (grandparent.kind === ts.SyntaxKind.WhileStatement) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.while));
        }
        else if (grandparent.kind === ts.SyntaxKind.ConditionalExpression && parent === grandparent.condition) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.ternaryif));
        }
        else if (grandparent.kind === ts.SyntaxKind.ForStatement && parent === grandparent.condition) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.for));
        }
        else if (grandparent.kind === ts.SyntaxKind.PrefixUnaryExpression && grandparent.operator === ts.SyntaxKind.ExclamationToken) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.unaryCast));
        }
        else if (grandparent.kind === ts.SyntaxKind.CallExpression && /^Boolean/.test(grandparent.getText())) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.objectCast));
        }
        else if (grandparent.kind === ts.SyntaxKind.NewExpression && /^new Boolean/.test(grandparent.getText())) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING.newCast));
        }
    };
    return NoExtraBooleanCastWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRXh0cmFCb29sZWFuQ2FzdFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDakMsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUV4QztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBZ0JqRCxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksd0JBQXdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFkYSxtQkFBYyxHQUFHO1FBQzdCLEVBQUUsRUFBRSx3REFBd0Q7UUFDNUQsRUFBRSxFQUFFLHdEQUF3RDtRQUM1RCxLQUFLLEVBQUUscURBQXFEO1FBQzVELFNBQVMsRUFBRSxrREFBa0Q7UUFDN0QsR0FBRyxFQUFFLG1EQUFtRDtRQUN4RCxTQUFTLEVBQUUsNkJBQTZCO1FBQ3hDLFVBQVUsRUFBRSxnREFBZ0Q7UUFDNUQsT0FBTyxFQUFFLHVEQUF1RDtLQUNqRSxDQUFDO0lBTUosV0FBQztBQUFELENBaEJBLEFBZ0JDLENBaEJ5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FnQmhEO0FBaEJZLFlBQUksT0FnQmhCLENBQUE7QUFFRDtJQUF1Qyw0Q0FBZTtJQUF0RDtRQUF1Qyw4QkFBZTtJQWdEdEQsQ0FBQztJQTlDVyw2REFBMEIsR0FBcEMsVUFBcUMsSUFBOEI7UUFDakUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLGdCQUFLLENBQUMsMEJBQTBCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVPLHlEQUFzQixHQUE5QixVQUErQixJQUE4QjtRQUMzRCxJQUFNLE1BQU0s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LElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN2RyxDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3hHLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDckcsQ0FBQztJQUNILENBQUM7SUFDSCwrQkFBQztBQUFELENBaERBLEFBZ0RDLENBaERzQyxJQUFJLENBQUMsVUFBVSxHQWdEckQiLCJmaWxlIjoicnVsZXMvbm9FeHRyYUJvb2xlYW5DYXN0UnVsZS5qcyIsInNvdXJjZVJvb3QiOiJkOlxccHJvamVjdHNcXHRzbGludC1lc2xpbnQtcnVsZXNcXHNyYyJ9
