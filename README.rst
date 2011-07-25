I just share here what I found useful to set up when starting a browser-only 
coffee script application. I principally use it for newebe to develop
the client side of its embedded applications.


But first you should must set up a development environment :

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

