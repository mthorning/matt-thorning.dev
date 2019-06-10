---
path: '/tmux-codemod'
date: '2019-06-10T10:00:00'
title: 'Tools for big code changes'
tags: ['tooling']
---

In my team at work we currently have 5 apps written in React. These apps all shared components held in a single repository. As the number of apps and components is increasing, we decided it would be a better idea to separate our shared components into their own respositories. This has been a big task as, not only did our apps need to be updated to import the components from their new locations, but a lot of the components depend on other components meaning that every split led to more places where changes needed to be made.

There have been two tools which have helped me complete this task which I am going to introduce you to now (if you haven't used them already); Tmux and Codemod.

## Codemod

[Codemod](https://github.com/facebook/codemod) is command line tool written by Facebook. You give it a regex pattern to search for and the code you want to replace it with and it will recursively search through your directories looking for every line that contains some text which matches. When it matches a line, it shows you a diff which you can either accept, decline or alter manually:

![codemod output](codemod-output.jpg)

There are a load of options you can give it and you can do all sorts of clever stuff with regex, such as capturing part of the pattern to use in the replacement; I only needed to do something very simple for this task though, here's an example:
```
codemod -d src --extensions js,jsx \
"shared/blog/preview"
