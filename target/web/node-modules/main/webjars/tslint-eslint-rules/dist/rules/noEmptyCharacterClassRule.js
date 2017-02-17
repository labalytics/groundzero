"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new NoEmptyCharacterClassWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = "don't use empty classes in regular expressions";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoEmptyCharacterClassWalker = (function (_super) {
    __extends(NoEmptyCharacterClassWalker, _super);
    function NoEmptyCharacterClassWalker() {
        _super.apply(this, arguments);
    }
    NoEmptyCharacterClassWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.validateEmptyCharacterClass(node);
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    NoEmptyCharacterClassWalker.prototype.validateEmptyCharacterClass = function (node) {
        if (!(/^\/([^\\[]|\\.|\[([^\\\]]|\\.)+\])*\/[gim]*$/.test(node.text))) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoEmptyCharacterClassWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vRW1wdHlDaGFyYWN0ZXJDbGFzc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUV4QztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBT2pELENBQUM7SUFKUSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDcEMsSUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDOUUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUxhLG1CQUFjLEdBQUcsZ0RBQWdELENBQUM7SUFNbEYsV0FBQztBQUFELENBUEEsQUFPQyxDQVB5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FPaEQ7QUFQWSxZQUFJLE9BT2hCLENBQUE7QUFFRDtJQUEwQywrQ0FBZTtJQUF6RDtRQUEwQyw4QkFBZTtJQVd6RCxDQUFDO0lBVlcsbUVBQTZCLEdBQXZDLFVBQXdDLElBQTBCO1FBQ2hFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxnQkFBSyxDQUFDLDZCQUE2QixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyxpRUFBMkIsR0FBbkMsVUFBb0MsSUFBMEI7UUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLDhDQUE4QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDN0YsQ0FBQztJQUNILENBQUM7SUFDSCxrQ0FBQztBQUFELENBWEEsQUFXQyxDQVh5QyxJQUFJLENBQUMsVUFBVSxHQVd4RCIsImZpbGUiOiJydWxlcy9ub0VtcHR5Q2hhcmFjdGVyQ2xhc3NSdWxlLmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
