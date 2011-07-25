I just share here what I found useful to set up when starting a browser-only 
coffee script application. I principally use it for newebe to develop
the client side of its embedded applications. I did this because when 
I was looking for good frameworks for developing javascript application 
on client side, I found only frameworks too big or too server oriented.


*NB: CSS are handled by Stylus, the Coffeescript-like language for CSS.*


The sample code is based on Backbone.js but there is very few code and it 
almost do nothing, I put also JQuery and Underscore.js as default 
dependencies but the most interesting part is in the cakefile. You will 
just have to rename your file and the application name in the Cakefile to 
start working. Build and automatic build actions are already configured.


I hope to add BDD setup and docs setup soon (using respectively on Jasmine and Docco).


But first, to use Coffescript  you should must set up a development environment :

    git clone https://github.com/ry/node.git

    cd node ./configure make make install

Then install its package manager, NPM:

    curl http://npmjs.org/install.sh | sh

Now install tools we need, Coffeescript compiler:

    npm install coffe-script

Cake, the build tool:

    npm install cake

UglifyJS, the minifier:

    npm install uglify-js

And the Stylus compiler for CSS:

    npm install stylus

Then when you finish to work on client code. At the root of the module you worked on, type:

    cake build

or for automatic build:

    cake watch

