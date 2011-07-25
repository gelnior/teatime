# Cakefile for Newebe Profile application.

appName = "my_app"

# Dependencies
sys    = require 'sys'
print  = sys.print
puts   = sys.puts
fs     = require 'fs'
{exec} = require 'child_process'


# Additional files to add to file that can be found in source directory.:
appFiles  = [
]

srcFiles = []
stylFiles = []

# Browse source directory to find file with coffee extension and add them
# to the app files list.
walk = (dir) ->
  list = fs.readdirSync(dir)
  if list
    for file in list
      if file
        filename = dir + '/' + file
        stat = fs.statSync(filename)
        if stat and stat.isDirectory()
          walk (filename)
        else if filename.substr(-6) == "coffee"
          srcFiles.push(filename)
        else if filename.substr(-4) == "styl"
          stylFiles.push(filename)

walk("./src")
srcFiles.reverse()
appFiles = appFiles.concat(srcFiles)

# Browse styles file
walk("./styles")
styleFile = stylFiles[0]


# Build task
task 'build', 'Build single application file from source files', ->
  puts 'Start build'
  appContents = new Array remaining = appFiles.length


  # Compile styles
  puts 'Building CSS'
  exec "stylus " + styleFile, (err, stdout, stderr) ->
    throw err if err
    print stdout + stderr

    # Then compile JS Code
    puts 'Building JS'
    for file, index in appFiles then do (file, index) ->
      puts file
      fs.readFile "#{file}", 'utf8', (err, fileContents) ->
        throw err if err
        appContents[index] = fileContents
        process() if --remaining is 0


  # Once data are prepared, the compilation process is running.
  process = ->
    # Concatenate files 
    fs.writeFile "app/#{appName}.dev.coffee", appContents.join('\n\n'), \ 
                 'utf8', \
        (err) ->
      throw err if err

      # Compile files
      exec "coffee --compile app/#{appName}.dev.coffee", \
           (err, stdout, stderr) ->
        throw err if err
        print stdout + stderr
        fs.unlink "app/#{appName}.dev.coffee", (err) ->
          throw err if err
          puts 'Build done.'
          invoke 'minify'


# Make JS file lighter
task 'minify', 'Minify the resulting application file after build', ->

  puts 'Start minify'
  command = "uglifyjs app/#{appName}.dev.js > app/#{appName}.js"

  exec command, (err, stdout, stderr) ->
    throw err if err
    print stdout + stderr
    puts 'Minify done.'


# Automatically build app when a change occurs
task 'watch', 'Watch prod source files and build changes', ->
    puts "Starting watching for modifications"

    # Watch Coffeescript files
    for file in appFiles then do (file) ->
        fs.watchFile "#{file}", (curr, prev) ->
            if +curr.mtime isnt +prev.mtime
                puts "Saw change in app/#{file}.coffee"
                invoke 'build'

    # Watch Stylus file
    fs.watchFile styleFile, (curr, prev) ->
        if +curr.mtime isnt +prev.mtime
            puts "Saw change in " + styleFile
            invoke 'build'

