class MyAppRouter extends Backbone.Router

   routes:
    "my-route/:name": "doIt"

   doIt: (name) ->
     alert name

   registerView: (view) ->
     @view = view
