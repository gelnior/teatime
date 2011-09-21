# Cakefile for building application (makefile like).

appName = "my_app"

# Dependencies
sys    = require 'sys'
print  = console.log
puts   = sys.puts
fs     = require 'fs'
{exec} = require 'child_process'


# Additional files to add to file that can be found in source directory.:
appFiles  = [
]
# Source files (automatically filled)
srcFiles = []
# Jasmine tests files
testFiles = []
# Stylus file to build css
styleFile = "./styles/#{appName}.styl"


# Tools

# Browse source directory to find file with coffee extension and add them
# to the app files list.
walk = (dir, fileList) ->
  list = fs.readdirSync(dir)
  if list
    for file in list
      if file
        filename = dir + '/' + file
        stat = fs.statSync(filename)
        if stat and stat.isDirectory()
          walk(filename, fileList)
        else if filename.substr(-6) == "coffee"
          fileList.push(filename)
        else if filename.substr(-4) == "styl"
          fileList.push(filename)
  fileList

# Process compile given files to coffee script file adding given suffix.
process = (appContents, suffix, callback) ->
  # Concatenate files
  fs.writeFile "app/#{appName}.#{suffix}.coffee", \
               appContents.join('\n\n'), \
               'utf8', \
               (err) ->
    if err
      print 'Process caught exception:\n' + err
    else

      # Compile files
      exec "coffee --compile app/#{appName}.#{suffix}.coffee", \
           (err, stdout, stderr) ->
        if err
          print 'Compilation caught exception:\n' + err
        else
          fs.unlink "app/#{appName}.#{suffix}.coffee", (err) ->
            if err
              print err
            else
              callback()

# End Tools


# Grab src files and add them to app files.
walk("./src", srcFiles)

# Weird way to enusre that main file is converted at the end of the result file.
i = 0
appFile = ""
for file, index in srcFiles
  if file == "./src/#{appName}.coffee"
    appFile = file
    i = index
srcFiles.splice(i, 1)
srcFiles.push(appFile)

appFiles = appFiles.concat(srcFiles)


# Browse tests files
walk("./tests/specs", testFiles)


# Build task
task 'build', 'Build single application file from source files', ->
  puts 'Start build'
  appContents = new Array
  remaining = appFiles.length

  # Compile styles
  puts 'Building CSS'
  exec "stylus " + styleFile, (err, stdout, stderr) ->
    if err
      print "Stylus caught exception: \n" + err
    else
      print stdout

      # Then compile JS Code
      puts 'Building JS'

      for file, index in appFiles then do (file, index) ->
        puts file
        fs.readFile "#{file}", 'utf8', (err, fileContents) ->

          if err
            print 'Read file caught exception:\n ' + err
          else
            appContents[index] = fileContents
            if --remaining is 0
              process appContents, "dev", () ->
                puts 'Build done'
                invoke 'minify'


# Make JS file lighter
task 'minify', 'Minify the resulting application file after build', ->

  puts 'Start minify'
  command = "uglifyjs app/#{appName}.dev.js > app/#{appName}.js"

  exec command, (err, stdout, stderr) ->
    if err
      print "Minify caught exception: \n" + err
    else
      puts 'Minify done.'


# Automatically build app when a change occurs
task 'watch', 'Watch prod source files and build changes', ->
    print "Starting watching for modifications..."

    # Watch Coffeescript files
    for file in appFiles then do (file) ->
      fs.watchFile "#{file}", (curr, prev) ->
        if +curr.mtime isnt +prev.mtime
          print "Saw change in app/#{file}.coffee"
          invoke 'build'

    # Watch Stylus file
    fs.watchFile styleFile, (curr, prev) ->
      if +curr.mtime isnt +prev.mtime
        print "Saw change in " + styleFile
        invoke 'build'


# Build documentations
task 'docs', 'Build documentations', ->

  puts 'Start buidling code documentations'
  command = "docco " + srcFiles.join(" ")

  exec command, (err, stdout, stderr) ->
    if err
      print "Docco caught exception: \n" + err
    else
      print stdout
      print 'Documentations built.'


# Build test sources
task 'build-tests', 'Compile coffee script tests to JS', ->
  appContents = new Array

  # Then compile JS Code
  puts 'Building JS'

  allFiles = []
  allFiles = allFiles.concat(srcFiles)
  allFiles = allFiles.concat(testFiles)
  remaining = allFiles.length

  for file, index in allFiles then do (file, index) ->
    puts file
    fs.readFile "#{file}", 'utf8', (err, fileContents) ->
      if err
        print "Read file caught exception: \n" + err
      else
        print stdout + stderr
        appContents[index] = fileContents
        if --remaining is 0
          process appContents, "tests", ->
            puts 'Tests build'


# Run tests
task 'tests', 'run tests through browser', ->
  puts 'Run tests through firefox'
  command = "firefox index-test.html "

  exec command, (err, stdout, stderr) ->
    if err
      print "Run firefox caught exception: \n" + err




