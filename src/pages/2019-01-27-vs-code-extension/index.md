---
path: '/vscode-extension'
date: '2019-01-27T20:00'
title: 'Creating a VS Code extension'
---

Where I work we have become a bit particular about making our code line up vertically in the import sections and when declaring some objects so that it looks nice and neat! My colleague commented that it would be nice if there was an extension for VS Code that would do the alignment for us so I made one (I suspect that this was his plan all along!).

The full code can be found on [my Github](https://github.com/mthorning/align-vertically), I will explain the steps I took to create it below.

![Gif of extension in action](action.gif)

## Getting started

The first step is to download Yeoman and the VS Code Extension Generator with NPM:

```
npm install -g yo generator-code
```

Running the generator scaffolds a new project ready for developing. Just type the following and answer the questions:

```
$ yo code


     _-----_     ╭──────────────────────────╮
    |       |    │   Welcome to the Visual  │
    |--(o)--|    │   Studio Code Extension  │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

? What type of extension do you want to create? New Extension (TypeScript)
? What's the name of your extension? my-new-extension
? What's the identifier of your extension? my-new-extension
? What's the description of your extension? It's an extension which is mine and new.
? Enable stricter TypeScript checking in 'tsconfig.json'? No
? Setup linting using 'tslint'? No
? Initialize a git repository? (Y/n) n
```

Once the project has been created and the dependencies have been installed you can open the folder in VS Code to check out the project structure. Pressing F5 starts the debugger and runs your code in a new "Extension Development Host window". What the team at VS Code have done here is great because you can place breakpoints in the main editor whilst trying out the extension you are writing in a development version of VS Code.

That's all I'm going to say about getting setup, I haven't gone into great detail; if you would like a more in-depth article about getting started then I recommend taking a look at [this tutorial](https://code.visualstudio.com/api/get-started/your-first-extension) on VS Code's website.

## Adding a menu item

The first thing I knew I wanted to do was add an item to the context menu so that users could right-click on some highlighted text to run the extension. This can be achieved through the package.json (whilst you are in there you should change the references to 'helloWorld' to the name of your extension); just add the following to the `contributes` section:

```json
"contributes": {
    "commands": [
        {
            "command": "extension.alignVertically",
            "title": "Align Vertically"
        }
    ],
    "menus": {
        "editor/context": [
            {
                "command": "extension.alignVertically",
                "group": "YourGroup@1"
            }
        ]
    }
}
```

## Programing the extension

If you chose to write your extension in JavaScript then you will have a file called extension.js which looks like this when you first open it:

![Hello world sample](./helloWorld.png)


If you are writing your file in TypeScript then it will look different but the logic is going to be the same for both. We need to change the `activate` function to register our extension, notice that `"extension.alignVertically"` matches up with the entries in the package.json.

```javascript
function activate(context) {
    let disposable = vscode.commands.registerCommand(
        'extension.alignVertically',
        alignVertically
    )

    context.subscriptions.push(disposable)
}
```

The second argument passed to `vscode.commands.registerCommand` is our function which we will call `alignVertically`. This function will do the nitty-gritty of formatting the text and replacing it in the editor:

```javascript{numberLines: true}
async function alignVertically() {
    const editor = vscode.window.activeTextEditor
    const text = editor.document.getText(editor.selection)
    if (text) {
        const keyword = await getKeywordFromUser()
```
On _line 2_ we get the `activeTextEditor` from the `vscode` object which is required in at the top of the file. Then, on _line 3_ we get the text which has been highlighted by the user. The `if` statement on _line 4_ means that the program will exit unless some text has been selected.

Next (_line 5_) we prompt the user for the keyword which is going to be used to split the text. You hopefully noticed on _line 1_ that this function is `async` which means we can make it wait for some data by using the `await` command. We call `getKeywordFromUser` and the execution is paused until the result is returned. Here is the function:
```javascript
function getKeywordFromUser() {
    return vscode.window.showInputBox({
        placeHolder: "Align by which word?"
    });
}
```
Using a method on the `vscode` API, all we need to do is set the text which we want to be displayed by the input box. The result is returned by the API as a promise which is resolved when the user hits enter.

Back to the `alignVertically` function:

```javascript{numberLines: 4}
if (text) {
    const keyword = await getKeywordFromUser()
    const lines = getLines(text, keyword)
    const mask = getMask(lines)
    const transformedText = transform(lines, mask, getSpaces)
    const result = joinWithKeyword(transformedText, keyword)
    editor.edit(builder => builder.replace(editor.selection, result))
}
```

_Lines 6 - 9_ call functions which I made to transform the highlighted text. These are in another file and I will cover them in the next section. By _line 10_ we have our transformed text held in a variable called `result`. Our `editor` variable from _line 2_ has a method called `edit` which calls a function with an object (named `builder`) which has the method `replace` and it, as you can probably guess, replaces the selected text (`editor.selection` - previously used on _line 3_) with `result`. Phew, that felt like a lot when typing it out, it's not that bad though, hopefully it made sense to read!

## The functions