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
        var walker = new NoIrregularWhitespaceWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.RULE_NAME = 'no-irregular-whitespace';
    Rule.FAILURE_STRING = 'irregular whitespace not allowed';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoIrregularWhitespaceWalker = (function (_super) {
    __extends(NoIrregularWhitespaceWalker, _super);
    function NoIrregularWhitespaceWalker() {
        _super.apply(this, arguments);
        this.IRREGULAR_WHITESPACE = /[\u0085\u00A0\ufeff\f\v\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u202f\u205f\u3000]+/mg;
        this.IRREGULAR_LINE_TERMINATORS = /[\u2028\u2029]/mg;
    }
    NoIrregularWhitespaceWalker.prototype.visitSourceFile = function (node) {
        this.validateIrregularWhitespace(node);
        _super.prototype.visitSourceFile.call(this, node);
    };
    NoIrregularWhitespaceWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.StringLiteral) {
            this.removeStringError(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoIrregularWhitespaceWalker.prototype.removeStringError = function (node) {
        var start = node.getStart();
        var end = node.getEnd();
        var failures = this.getFailures();
        for (var i = failures.length - 1; i >= 0; i--) {
            var failure = failures[i];
            if (failure.getRuleName() === Rule.RULE_NAME) {
                if (failure.getStartPosition().getPosition() >= start && failure.getEndPosition().getPosition() <= end) {
                    failures.splice(i, 1);
                }
            }
        }
    };
    NoIrregularWhitespaceWalker.prototype.validateIrregularWhitespace = function (node) {
        var _this = this;
        var lines = node.text.split(/\n/g);
        lines.forEach(function (line, i) {
            var match = _this.IRREGULAR_WHITESPACE.exec(line);
            while (match) {
                _this.addFailure(_this.createFailure(node.getPositionOfLineAndCharacter(i, match.index), 1, Rule.FAILURE_STRING));
                match = _this.IRREGULAR_WHITESPACE.exec(line);
            }
            match = _this.IRREGULAR_LINE_TERMINATORS.exec(line);
            while (match) {
                _this.addFailure(_this.createFailure(node.getPositionOfLineAndCharacter(i, match.index), 1, Rule.FAILURE_STRING));
                match = _this.IRREGULAR_LINE_TERMINATORS.exec(line);
            }
        });
    };
    return NoIrregularWhitespaceWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vSXJyZWd1bGFyV2hpdGVzcGFjZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDakMsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUV4QztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBUWpELENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDOUUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQU5hLGNBQVMsR0FBRyx5QkFBeUIsQ0FBQztJQUN0QyxtQkFBYyxHQUFHLGtDQUFrQyxDQUFDO0lBTXBFLFdBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBUWhEO0FBUlksWUFBSSxPQVFoQixDQUFBO0FBRUQ7SUFBMEMsK0NBQWU7SUFBekQ7UUFBMEMsOEJBQWU7UUFDL0MseUJBQW9CLEdBQUcseUlBQXlJLENBQUM7UUFDakssK0JBQTBCLEdBQUcsa0JBQWtCLENBQUM7SUFrRDFELENBQUM7SUFoRFcscURBQWUsR0FBekIsVUFBMEIsSUFBbUI7UUFFM0MsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLGdCQUFLLENBQUMsZUFBZSxZQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFUywrQ0FBUyxHQUFuQixVQUFvQixJQUFhO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUF3QixDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELGdCQUFLLENBQUMsU0FBUyxZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTyx1REFBaUIsR0FBekIsVUFBMEIsSUFBc0I7UUFDOUMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUUxQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFcEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzlDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUxQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDdkcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTyxpRUFBMkIsR0FBbkMsVUFBb0MsSUFBbUI7UUFBdkQsaUJBZ0JDO1FBZkMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNoSCxLQUFLLEdBQUcsS0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxDQUFDO1lBRUQsS0FBSyxHQUFHLEtBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNoSCxLQUFLLEdBQUcsS0FBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsa0NBQUM7QUFBRCxDQXBEQSxBQW9EQyxDQXBEeUMsSUFBSSxDQUFDLFVBQVUsR0FvRHhEIiwiZmlsZSI6InJ1bGVzL25vSXJyZWd1bGFyV2hpdGVzcGFjZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiZDpcXHByb2plY3RzXFx0c2xpbnQtZXNsaW50LXJ1bGVzXFxzcmMifQ==
