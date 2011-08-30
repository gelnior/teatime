What is Teatime ?
=================

Teatime is a kind of boilerplate for Coffeescript client-only application. It
includes :

* Cakefile task to build js file from coffee source files
* Cakefile task to watch for file modification and automatically build the app
* Cakefile task to build docs with Docco
* Cakefile task to build CSS from stylus source files
* Cakefile task to run Jasmine BDD tests
* dependencies: backbone, jquery, underscore, modernizr, respond
* HTML 5 boilerplate from initializr.com
* directory structure for a backbone app

I just share here what I found useful to set up when starting a browser-only 
coffee script application. I principally use it for newebe (an open source 
project) to develop the client side of its embedded applications. 
I did this because when  I was looking for good frameworks for developing 
javascript application on client side, I found only frameworks too big or too 
server oriented.

*NB: CSS are handled by Stylus, the Coffeescript-like language for CSS.*

Setup
=====


Just change the name of the application in the cakefile by changing the
variable *appName*. Then rename files as you like.

Don't forget that to use teatime tools,  you should must set up a development environment :

    git clone https://github.com/ry/node.git

    cd node 
    ./configure 
    make 
    make install

Then install its package manager, NPM:

    curl http://npmjs.org/install.sh | sh

Now install tools we need, Coffeescript compiler:

    npm install coffe-script

Cake, the build tool:

    npm install cake

UglifyJS, the minifier:

    npm install uglify-js

Docco, the documentation builder:

    npm install docco

And the Stylus compiler for CSS:

    npm install stylus

Then when you finish to work on client code. At the root of the module you worked on, type:

    cake build

or for automatic build:

    cake watch

and for documentation:
 
    cake docs
