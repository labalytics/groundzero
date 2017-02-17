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
        var walker = new NoMultiSpacesWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoMultiSpacesWalker = (function (_super) {
    __extends(NoMultiSpacesWalker, _super);
    function NoMultiSpacesWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.EXCEPTION_MAP = (_a = {},
            _a[ts.SyntaxKind.VariableDeclaration] = 'VariableDeclaration',
            _a[ts.SyntaxKind.PropertyAssignment] = 'PropertyAssignment',
            _a[ts.SyntaxKind.BinaryExpression] = 'BinaryExpression',
            _a
        );
        this.STRING_TYPES = [
            ts.SyntaxKind.NoSubstitutionTemplateLiteral,
            ts.SyntaxKind.StringLiteral
        ];
        this.exceptions = {};
        this.targets = [];
        this.lastNode = null;
        this.targetNode = {};
        this.targetIndex = 0;
        var opt = this.getOptions();
        this.src = sourceFile.getFullText();
        if (opt.length) {
            this.exceptions = opt[0].exceptions || {};
        }
        if (this.exceptions['PropertyAssignment'] === undefined) {
            this.exceptions['PropertyAssignment'] = true;
        }
        var pattern = /[^\n\r\u2028\u2029\t ].? {2,}/g;
        while (pattern.test(this.src)) {
            this.targets.push(pattern.lastIndex);
            this.targetNode[pattern.lastIndex] = sourceFile;
        }
        this.lastNode = sourceFile.getLastToken();
        var _a;
    }
    NoMultiSpacesWalker.prototype.inRange = function (x, range) {
        return x >= range[0] && x <= range[1];
    };
    NoMultiSpacesWalker.prototype.warn = function (value, pos, node) {
        var msg = "Multiple spaces found before '" + value + "'.";
        var exceptionName = this.EXCEPTION_MAP[node.parent.kind];
        var report = true;
        var start = node.getFullStart() - 1;
        var previousChar = this.src.substring(start, start + 1);
        if (exceptionName && this.exceptions[exceptionName]) {
            if (previousChar !== ',') {
                report = false;
            }
        }
        if (previousChar === ':') {
            var crt = node.parent;
            while (crt.kind !== ts.SyntaxKind.SourceFile) {
                crt = crt.parent;
                if (crt.kind === ts.SyntaxKind.PropertyAssignment) {
                    if (this.exceptions['PropertyAssignment']) {
                        report = false;
                    }
                    break;
                }
            }
        }
        if (report) {
            this.addFailure(this.createFailure(pos, value.length, msg));
        }
    };
    NoMultiSpacesWalker.prototype.walkChildren = function (node) {
        var _this = this;
        var range = [node.getStart(), node.getEnd()];
        for (var i = this.targetIndex, len = this.targets.length, target = void 0; i < len; i++) {
            target = this.targets[i];
            if (this.inRange(target, range)) {
                this.targetNode[target] = node;
            }
            if (range[0] > this.targets[this.targetIndex]) {
                this.targetIndex++;
            }
        }
        if (node === this.lastNode) {
            this.targets.forEach(function (target) {
                var valid = _this.targetNode[target];
                if (target === valid.getStart()) {
                    _this.warn(valid.getText(), target, valid);
                }
                else if (target === valid.getEnd() - 1 && _this.STRING_TYPES.indexOf(valid.kind) === -1) {
                    var endChar = _this.src.substring(target, valid.getEnd());
                    _this.warn(endChar, target, valid);
                }
                else {
                    if (_this.src.charAt(target) !== '\n' && valid.kind !== ts.SyntaxKind.SourceFile) {
                    }
                }
            });
        }
        var children = node.getChildren();
        for (var index in children) {
            this.visitNode(children[index]);
        }
    };
    return NoMultiSpacesWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vTXVsdGlTcGFjZXNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ2pDLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFFeEM7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQU1qRCxDQUFDO0lBSlEsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FOQSxBQU1DLENBTnlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQU1oRDtBQU5ZLFlBQUksT0FNaEIsQ0FBQTtBQWlCRDtJQUFrQyx1Q0FBZTtJQWtCL0MsNkJBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUMzRCxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFqQnJCLGtCQUFhLEdBQUc7WUFDdEIsR0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEdBQUUscUJBQXFCO1lBQzFELEdBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFFLG9CQUFvQjtZQUN4RCxHQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsR0FBRSxrQkFBa0I7O1NBQ3JELENBQUM7UUFDTSxpQkFBWSxHQUFHO1lBQ3JCLEVBQUUsQ0FBQyxVQUFVLENBQUMsNkJBQTZCO1lBQzNDLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYTtTQUM1QixDQUFDO1FBQ00sZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxJQUFJLENB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
