"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var doctrine = require('doctrine');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var opts = this.getOptions().ruleArguments;
        if (opts && opts.length > 0) {
            if (opts[0].prefer) {
                Rule.prefer = opts[0].prefer;
            }
            Rule.requireReturn = opts[0].requireReturn !== false;
            Rule.requireParamDescription = opts[0].requireParamDescription !== false;
            Rule.requireReturnDescription = opts[0].requireReturnDescription !== false;
            Rule.matchDescription = opts[0].matchDescription;
        }
        var walker = new ValidJsdocWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        missingBrace: 'JSDoc type missing brace',
        syntaxError: 'JSDoc syntax error',
        missingParameterType: function (name) { return ("missing JSDoc parameter type for '" + name + "'"); },
        missingParameterDescription: function (name) { return ("missing JSDoc parameter description for '" + name + "'"); },
        duplicateParameter: function (name) { return ("duplicate JSDoc parameter '" + name + "'"); },
        unexpectedTag: function (title) { return ("unexpected @" + title + " tag; function has no return statement"); },
        missingReturnType: 'missing JSDoc return type',
        missingReturnDescription: 'missing JSDoc return description',
        prefer: function (name) { return ("use @" + name + " instead"); },
        missingReturn: function (param) { return ("missing JSDoc @" + (param || 'returns') + " for function"); },
        wrongParam: function (expected, actual) { return ("expected JSDoc for '" + expected + "'' but found '" + actual + "'"); },
        missingParam: function (name) { return ("missing JSDoc for parameter '" + name + "'"); },
        wrongDescription: 'JSDoc description does not satisfy the regex pattern',
        invalidRegexDescription: function (error) { return ("configured matchDescription is an invalid RegExp. Error: " + error); }
    };
    Rule.prefer = {};
    Rule.requireReturn = true;
    Rule.requireParamDescription = true;
    Rule.requireReturnDescription = true;
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ValidJsdocWalker = (function (_super) {
    __extends(ValidJsdocWalker, _super);
    function ValidJsdocWalker() {
        _super.apply(this, arguments);
        this.fns = [];
    }
    ValidJsdocWalker.prototype.visitSourceFile = function (node) {
        _super.prototype.visitSourceFile.call(this, node);
    };
    ValidJsdocWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ClassExpression) {
            this.visitClassExpression(node);
        }
        else {
            _super.prototype.visitNode.call(this, node);
        }
    };
    ValidJsdocWalker.prototype.visitArrowFunction = function (node) {
        this.startFunction(node);
        _super.prototype.visitArrowFunction.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitFunctionExpression = function (node) {
        this.startFunction(node);
        _super.prototype.visitFunctionExpression.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitFunctionDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitClassExpression = function (node) {
        this.startFunction(node);
        _super.prototype.visitClassExpression.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitClassDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitClassDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitMethodDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitConstructorDeclaration = function (node) {
        this.startFunction(node);
        _super.prototype.visitConstructorDeclaration.call(this, node);
        this.checkJSDoc(node);
    };
    ValidJsdocWalker.prototype.visitReturnStatement = function (node) {
        this.addReturn(node);
        _super.prototype.visitReturnStatement.call(this, node);
    };
    ValidJsdocWalker.prototype.startFunction = function (node) {
        var returnPresent = false;
        if (node.kind === ts.SyntaxKind.ArrowFunction && node.body.kind !== ts.SyntaxKind.Block)
            returnPresent = true;
        if (this.isTypeClass(node))
            returnPresent = true;
        this.fns.push({ node: node, returnPresent: returnPresent });
    };
    ValidJsdocWalker.prototype.addReturn = function (node) {
        var parent = node;
        var nodes = this.fns.map(function (fn) { return fn.node; });
        while (parent && nodes.indexOf(parent) === -1)
            parent = parent.parent;
        if (parent && node.expression) {
            this.fns[nodes.indexOf(parent)].returnPresent = true;
        }
    };
    ValidJsdocWalker.prototype.isTypeClass = function (node) {
        return node.kind === ts.SyntaxKind.ClassExpression || node.kind === ts.SyntaxKind.ClassDeclaration;
    };
    ValidJsdocWalker.prototype.isValidReturnType = function (tag) {
        return tag.type.name === 'void' || tag.type.type === 'UndefinedLiteral';
    };
    ValidJsdocWalker.prototype.getJSDocComment = function (node) {
        var ALLOWED_PARENTS = [
            ts.SyntaxKind.BinaryExpression,
            ts.SyntaxKind.VariableDeclaration,
            ts.SyntaxKind.VariableDeclarationList,
            ts.SyntaxKind.VariableStatement
        ];
        if (!/^\/\*\*/.test(node.getFullText().trim())) {
            if (ALLOWED_PARENTS.indexOf(node.parent.kind) !== -1) {
                return this.getJSDocComment(node.parent);
            }
            return {};
        }
        var comments = node.getFullText();
        comments = comments.substring(comments.indexOf('/**'));
        comments = comments.substring(0, comments.indexOf('*/') + 2);
        var start = node.pos;
        var width = comments.length;
        if (!/^\/\*\*/.test(comments) || !/\*\/$/.test(comments)) {
            return {};
        }
        return { comments: comments, start: start, width: width };
    };
    ValidJsdocWalker.prototype.checkJSDoc = function (node) {
        var _this = this;
        var _a = this.getJSDocComment(node), comments = _a.comments, start = _a.start, width = _a.width;
        if (!comments)
            return;
        var jsdoc;
        try {
            jsdoc = doctrine.parse(comments, {
                strict: true,
                unwrap: true,
                sloppy: true
            });
        }
        catch (e) {
            if (/braces/i.test(e.message)) {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingBrace));
            }
            else {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.syntaxError));
            }
            return;
        }
        var fn = this.fns.filter(function (f) { return node === f.node; })[0];
        var params = {};
        var hasReturns = false;
        var hasConstructor = false;
        var isOverride = false;
        for (var _i = 0, _b = jsdoc.tags; _i < _b.length; _i++) {
            var tag = _b[_i];
            switch (tag.title) {
                case 'param':
                case 'arg':
                case 'argument':
                    if (!tag.type) {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingParameterType(tag.name)));
                    }
                    if (!tag.description && Rule.requireParamDescription) {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingParameterDescription(tag.name)));
                    }
                    if (params[tag.name]) {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.duplicateParameter(tag.name)));
                    }
                    else if (tag.name.indexOf('.') === -1) {
                        params[tag.name] = true;
                    }
                    break;
                case 'return':
                case 'returns':
                    hasReturns = true;
                    if (!Rule.requireReturn && !fn.returnPresent && tag.type.name !== 'void' && tag.type.name !== 'undefined') {
                        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.unexpectedTag(tag.title)));
                    }
                    else {
                        if (!tag.type) {
                            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturnType));
                        }
                        if (!this.isValidReturnType(tag) && !tag.description && Rule.requireReturnDescription) {
                            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturnDescription));
                        }
                    }
                    break;
                case 'constructor':
                case 'class':
                    hasConstructor = true;
                    break;
                case 'override':
                case 'inheritdoc':
                    isOverride = true;
                    break;
            }
            var title = Rule.prefer[tag.title];
            if (Rule.prefer.hasOwnProperty(tag.title) && tag.title !== title) {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.prefer(title)));
            }
        }
        if (!isOverride && !hasReturns && !hasConstructor && node.parent.kind !== ts.SyntaxKind.GetKeyword && !this.isTypeClass(node)) {
            if (Rule.requireReturn || fn.returnPresent) {
                this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturn(Rule.prefer['returns'])));
            }
        }
        var jsdocParams = Object.keys(params);
        var parameters = node.parameters;
        if (parameters) {
            parameters.forEach(function (param, i) {
                if (param.name.kind === ts.SyntaxKind.Identifier) {
                    var name_1 = param.name.text;
                    if (jsdocParams[i] && name_1 !== jsdocParams[i]) {
                        _this.addFailure(_this.createFailure(start, width, Rule.FAILURE_STRING.wrongParam(name_1, jsdocParams[i])));
                    }
                    else if (!params[name_1] && !isOverride) {
                        _this.addFailure(_this.createFailure(start, width, Rule.FAILURE_STRING.missingParam(name_1)));
                    }
                }
            });
        }
        if (Rule.matchDescription) {
            try {
                var regex = new RegExp(Rule.matchDescription);
                if (!regex.test(jsdoc.description)) {
                    this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.wrongDescription));
                }
            }
            catch (e) {
                this.addFailure(this.createFailure(start, width, e.message));
            }
        }
    };
    return ValidJsdocWalker;
}(Lint.SkippableTokenAwareRuleWalker));

//# sourceMappingURL=data:application/json;base64,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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUcsQ0FBQztvQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxNQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVGLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDO2dCQUNILElBQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLENBQUM7WUFDSCxDQUNBO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMvRCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDSCx1QkFBQztBQUFELENBdFBBLEFBc1BDLENBdFA4QixJQUFJLENBQUMsNkJBQTZCLEdBc1BoRSIsImZpbGUiOiJydWxlcy92YWxpZEpzZG9jUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJkOlxccHJvamVjdHNcXHRzbGludC1lc2xpbnQtcnVsZXNcXHNyYyJ9
