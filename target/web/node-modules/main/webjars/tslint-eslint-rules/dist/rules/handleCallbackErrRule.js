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
        var languageService = Lint.createLanguageService(sourceFile.fileName, sourceFile.getFullText());
        return this.applyWithWalker(new ErrCallbackHandlerWalker(sourceFile, this.getOptions(), languageService));
    };
    Rule.FAILURE_STRING = 'Expected error to be handled';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ErrCallbackHandlerWalker = (function (_super) {
    __extends(ErrCallbackHandlerWalker, _super);
    function ErrCallbackHandlerWalker(sourceFile, options, languageService) {
        _super.call(this, sourceFile, options);
        this.languageService = languageService;
        var errorArgument = options.ruleArguments[0] || 'err';
        if (errorArgument.charAt(0) === '^') {
            this.errorCheck = RegExp.prototype.test.bind(new RegExp(errorArgument));
        }
        else {
            this.errorCheck = function (name) { return name === errorArgument; };
        }
    }
    ErrCallbackHandlerWalker.prototype.visitFunctionExpression = function (node) {
        this.validateFunction(node);
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    ErrCallbackHandlerWalker.prototype.visitFunctionDeclaration = function (node) {
        this.validateFunction(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    ErrCallbackHandlerWalker.prototype.visitArrowFunction = function (node) {
        this.validateFunction(node);
        _super.prototype.visitArrowFunction.call(this, node);
    };
    ErrCallbackHandlerWalker.prototype.validateFunction = function (node) {
        var parameter = node.parameters[0];
        if (parameter && this.errorCheck(parameter.name.getText())) {
            var fileName = this.getSourceFile().fileName;
            var highlights = this.languageService.getDocumentHighlights(fileName, parameter.pos, [fileName]);
            if (!highlights || highlights[0].highlightSpans.length <= 1) {
                this.addFailure(this.createFailure(parameter.name.getStart(), parameter.name.getWidth(), Rule.FAILURE_STRING));
            }
        }
    };
    return ErrCallbackHandlerWalker;
}(Lint.RuleWalker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2hhbmRsZUNhbGxiYWNrRXJyUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFZLElBQUksV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRXhDO0lBQTBCLHdCQUF1QjtJQUFqRDtRQUEwQiw4QkFBdUI7SUFPakQsQ0FBQztJQUpRLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNwQyxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNsRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBTGEsbUJBQWMsR0FBRyw4QkFBOEIsQ0FBQztJQU1oRSxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQU9oRDtBQVBZLFlBQUksT0FPaEIsQ0FBQTtBQUVEO0lBQXVDLDRDQUFlO0lBSXBELGtDQUFZLFVBQXlCLEVBQUUsT0FBc0IsRUFBRSxlQUFtQztRQUNoRyxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7UUFFeEQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksS0FBSyxhQUFhLEVBQXRCLENBQXNCLENBQUM7UUFDckQsQ0FBQztJQUNILENBQUM7SUFFTSwwREFBdUIsR0FBOUIsVUFBK0IsSUFBMkI7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLGdCQUFLLENBQUMsdUJBQXVCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLDJEQUF3QixHQUEvQixVQUFnQyxJQUE0QjtRQUMxRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsZ0JBQUssQ0FBQyx3QkFBd0IsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0scURBQWtCLEdBQXpCLFVBQTBCLElBQXNCO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixnQkFBSyxDQUFDLGtCQUFrQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxtREFBZ0IsR0FBeEIsVUFBeUIsSUFBZ0M7UUFDdkQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDL0MsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFbkcsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNqSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDSCwrQkFBQztBQUFELENBM0NBLEFBMkNDLENBM0NzQyxJQUFJLENBQUMsVUFBVSxHQTJDckQiLCJmaWxlIjoicnVsZXMvaGFuZGxlQ2FsbGJhY2tFcnJSdWxlLmpzIiwic291cmNlUm9vdCI6ImQ6XFxwcm9qZWN0c1xcdHNsaW50LWVzbGludC1ydWxlc1xcc3JjIn0=
