
#!/bin/bash

file="../core/node_modules/@feathersjs/hooks/script/hooks.d.ts"
old_word="DecoratorContext"
new_word="any"
line_number=9
position=99

sed -i "${line_number}s/\<${old_word}\>/${new_word}/g" "${file}"

# SED(1)                                                  User Commands                                                  SED(1)

# NAME
#        sed - stream editor for filtering and transforming text

# SYNOPSIS
#        sed [OPTION]... {script-only-if-no-other-script} [input-file]...

# DESCRIPTION
#        Sed  is  a stream editor.  A stream editor is used to perform basic text transformations on an input stream (a file or
#        input from a pipeline).  While in some ways similar to an editor which permits scripted edits (such as ed), sed  works
#        by making only one pass over the input(s), and is consequently more efficient.  But it is sed's ability to filter text
#        in a pipeline which particularly distinguishes it from other types of editors.