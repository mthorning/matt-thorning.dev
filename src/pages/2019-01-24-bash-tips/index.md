---
path: '/bash-tips'
date: '2019-02-16T20:00'
title: 'Bash tips'
tags: ['linux']
---

This post is as much for myself as it is for anyone else and I will update it whenever I come across anything that I find that is worth including. The below are all of the cool little bash commands for linux/unix that I have stumbled across.

Command | Description
------- | :-----------|
`man`   | Follow this with any command for full instructions on how to use. Most commands can be followed with `--help` or `-h` as well for a reminder of the basics.
`set -e` | Sets option to exit a script if a command returns a non-zero exit code.
`set -z` | Outputs the commands that get run as they run.
`grep` | Searches an input and prints out lines that match a pattern.
`<()` | Treats output as a file such as `diff <(grep something) <(grep nothing)`.
`!!` | Repeats the last command.
`!$` | Repeats the last argument of the last command.
`pushd` | Changes directory like `cd` but adds to stack so you can then go back with `popd`.
`cd ~` | Change to home directory, `cd` on its own will also do this.
`cd -` | Go back to previous directory.
`!:1-$` | Takes all the arguments to the previous command and drops them in. `!`(last command) `:1`(first word) `-$`(to last word).
`:h` | Put it after a filename, and it will change that filename to remove everything up to the folder.
`exit 0` | Exit script with exit code zero.
`head` | Print first 5 lines of file.txt.
`tail`  | Print last 5 lines of file.txt.
`lsof` | Lists open files. Use with `-i :80` to find process listening on a port (port 80 here).
`ctrl-r` | Reverse history search. `Ctrl-r` next item, `ctrl-j` to copy or `enter` to run.

### Variables
```
$ variable=$(git describe --tags)
$ echo "version is $variable"
version is 0.15.0
```

### Here Docs
Input stream which sends the text in each line to a process until a line is reached which contains only the delimiter (`ENDOFSTRING` in the example below).
```
$ cat << ENDOFSTRING
  This is a here doc
  It will write every line to the file
  until a line with only ENDOFSTRING
  ENDOFSTRING

This is a here doc
It will write every line to the file
until a line with on ENDOFSTRING
```

### Translate
Transforms or deletes characters in a string.
```
$ echo "hello there" | tr a-z A-Z
HELLO THERE

$ echo "edward woodward" | tr -d "d"
ewar woowar
```

As mentioned above, I will keep updating this one. I expect I'll update the date each time to keep bumping it up the list. I'm also planning on starting a similar reference list of Vim commands :)

### Cat
Concatenates files. In addition to writing a file to stdout, `cat` can also write to a file. Use cat with redirect ( `>` ) to the file you want to write to, write your message then `ctrl-d` to exit:
```
$cat > file1.txt
Hello from file 2

$cat > file2.txt
Hello from file 2

cat file1.txt file2.txt > file3.txt
cat file3.txt
Hello from file 2
Hello from file 2
```

