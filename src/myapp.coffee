## Application entry point

# Builds notess app view, inits widgets and listeners, retrieves last notes
# and displays them.
myApp = new MyAppView

myApp.setWidgets()
myApp.setListeners()

panda = "happy"

router = new MyAppRouter
router.registerView(myApp)

Backbone.history.start()
