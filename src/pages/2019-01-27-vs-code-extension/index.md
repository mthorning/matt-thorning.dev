---
path: '/vscode-extension'
date: '2019-01-27T20:00'
title: 'Creating a VS Code extension'
---

Where I work we have become a bit particular about making our code line up vertically in the import sections and when declaring some objects so that it looks nice and neat! My colleague commented that it would be nice if there was an extension for VS Code that would do the alignment for us so I made one (I suspect that this was his plan all along!).

The full code can be found on [my Github](https://github.com/mthorning/align-vertically), I will explain the steps I took to create it below.

![Gif of extension in action](action.gif)

---

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

---

## Adding a menu item

The first thing I knew I wanted to do was add an item to the context menu so that users could right-click on some highlighted text to run the extension. This can be achieved through the _package.json_ (whilst you are in there you should change the references to 'helloWorld' to the name of your extension); just add the following to the `contributes` section:

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

---

## Programing the extension

If you chose to write your extension in JavaScript then you will have a file called _extension.js_ which looks like this when you first open it:

![Hello world sample](./helloWorld.png)


If you are writing your file in TypeScript then it will look different but the logic is going to be the same for both. We need to change the `activate` function to register our extension, notice that `"extension.alignVertically"` matches up with the entries in the _package.json_.

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
Let's take a closer look at this function. On _line 2_ we get the `activeTextEditor` from the `vscode` object (which is required in at the top of the file). Then, on _line 3_ we get the text which has been highlighted by the user. The `if` statement on _line 4_ means that the rest of the program will only run if some text has acutally been selected.

Next (_line 5_) we prompt the user for the keyword which is going to be used to split the text. You hopefully noticed on _line 1_ that this function is `async` which means we can make it wait for some data by using the `await` command. We call `getKeywordFromUser` and the execution is paused until the result is returned. Here is the function:
```javascript
function getKeywordFromUser() {
    return vscode.window.showInputBox({
        placeHolder: "Align by which word?"
    });
}
```
Using a method on the `vscode` API's `window` object, all we need to do is set the placeholder text which we want to be displayed by the input box. The result is returned by the API as a promise which is resolved when the user hits enter.

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

_Lines 6 - 9_ call the functions which I have written to transform the highlighted text. These are in another file and I will cover them in the next section. By _line 10_ we have our transformed text held in a variable called `result` and all that is left to do is to replace the highlighted text in the editor with value of this `result` variable. 

Our `editor` variable from _line 2_ has a method called `edit` which calls a function with an object (named `builder`) which has the method `replace` and it, as you can probably guess, replaces the selected text (`editor.selection` - previously used on _line 3_) with `result`. Phew, that felt like a lot when typing it out, it's not that bad though, hopefully it made sense to read!

---

## Test Driven Development

_lines 6 - 9_ use five functions which are imported from a separate file I have written. These functions process the text by:
1. Splitting the text into separate chunks which I could easily work with.
1. Calculating the current positions of the supplied keyword in each line.
1. Creating a new chunk of the correct amount of empty spaces for each line.
1. Adding the new chunk to each line
1. Rejoining the chunks of text back together.

One of the advantages of separating your logic like this is that you can write simple functions which just do one thing each. These are pure functions which do not have any side effects - based on what you put in you know exactly what you are going to get out. Because of this, the best and easiest way to develop oure functions is to set up tests where you supply an input and test that the output is as expected.

The VS Code generator creates your project with Mocha installed, I prefer to work with [Jest](https://jestjs.io/) though. You can install Jest with NPM:
```
npm install Jest -D
```
This will add Jest to the node_modules binaries (.bin) folder. The easiest thing to do is to add this to the `scripts` section in your _package.json_:
```json
"scripts": {
    "test": "jest"
}
```
And run the tests with:
```
npm test
```
Jest will search through you codebase for files with `.test` in the name and run the tests in those files (our functions are in a file which I, rather originally, titled _functions.js_ and the tests are in the, equally originally named, _functions.test.js_ file). You can also start the tests in watch mode so that the tests will re-run each time a change is made; there are also some useful options in the watch menu that are worth exploring:
```
$ npm test -- --watch

No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
 ```

---

At the top of the file I `require` in the functions from _functions.js_. The reason I put these functions in a separate file was so that I would not need to mock anything when running the tests, if I left them in _extension.js_ then Jest would attempt to import the `vscode` object.

To create a test suite in Jest you use a `describe` block. The first argument is just a string which will be used at the start of every test and the second argument is the function within which you run each test.
```javascript{numberLines: true}
const {
    getMask,
    getLines,
    transform,
    getSpaces,
    joinWithKeyword
} = require("../functions.js");

describe("The function ", () => {

    const keyword = "SPLIT";

    const text = [
        "This is some SPLIT text",
        "I want SPLIT to test",
        "Nothing to report here",
        "It SPLIT should be getting",
        "split where there SPLIT is"
    ].join("\n");

    const expectedLines = [
        ["This is some ", " text"],
        ["I want ", " to test"],
        ["Nothing to report here"],
        ["It ", " should be getting"],
        ["split where there ", " is"]
    ];

    const expectedMask = [13, 7, 0, 3, 18];

    const expectedTransformed = [
        ["This is some      ", " text"],
        ["I want            ", " to test"],
        ["Nothing to report here"],
        ["It                ", " should be getting"],
        ["split where there ", " is"]
    ];

    const expectedResult = [
        "This is some      SPLIT text",
        "I want            SPLIT to test",
        "Nothing to report here",
        "It                SPLIT should be getting",
        "split where there SPLIT is"
    ].join("\n");
 
```
First I set up the variables which will be used in each test. At _line 11_ is the imaginary keyword supplied by our user, next, at _line 13_ is the block of text which our user has highlighted, declared as an array joined with `\n` (newline). Each following `expected` output is then used both to test the function has come up with the correct output and also as the input for the following function.
```javascript{numberLines: 47}

    test("getLines returns expected", () => {
        expect(getLines(text, keyword)).toEqual(expectedLines);
    });

    test("getMask returns expected", () => {
        expect(getMask(expectedLines)).toEqual(expectedMask);
    });

    test("getSpaces returns expected", () => {
        expectedMask.forEach(index => {
            const diff = 18 - index;
            expect(getSpaces(18, index).length).toBe(diff);
        });
    });

    test("transform returns expected", () => {
        expect(transform(expectedLines, expectedMask, getSpaces)).toEqual(
            expectedTransformed
        );
    });

    test("joinWithKeyword returns expected", () => {
        expect(joinWithKeyword(expectedTransformed, keyword)).toEqual(
            expectedResult
        );
    });
```