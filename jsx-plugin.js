module.exports = function (babel) {

    var t = babel.types;

    return {

        name: "custom-jsx-plugin",

        visitor: {

            JSXElement(path) {
                console.log(path, "path")
                var openingElement = path.node.openingElement;
                // console.log(oeningElement, "openElement")

                var tagName = openingElement.name.name;
                // console.log(tagName, "tagName")

                var args = [];

                args.push(t.stringLiteral(tagName));

                var attribs = t.nullLiteral();
                // console.log(attribs, "attribs")

                args.push(attribs);

                var reactIdentifier = t.identifier("React"); //object
                // console.log(reactIdentifier, "reactIdentifier")

                var createElementIdentifier = t.identifier("createElement");
                // console.log(createElementIdentifier, "createElementIdentifier")

                var callee = t.memberExpression(reactIdentifier, createElementIdentifier)
                // console.log(callee, "callee")

                var callExpression = t.callExpression(callee, args);
                // console.log(callExpression, "callExpression")

                callExpression.arguments = callExpression.arguments.concat(path.node.children);
                // console.log(callExpression.arguments, "arguments")

                path.replaceWith(callExpression, path.node);
                // console.log(path, "path")

            },

        },

    };

};