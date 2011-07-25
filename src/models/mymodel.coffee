## Data model
class MyModel extends Backbone.Model

  #  Url where data live.
  url: '/my-url/'

  # Constructor initializes its field from a javascript raw object.
  constructor: (model) ->
    super

    if model.id
      @url = @url + @id + "/"
    else
      @url = "/notes/all/"


  # Sends a delete request to services backend then ask view to remove bound
  # widget from DOM.
  delete: ->
    @url = "/notes/" + @id + "/"
    @destroy()
    @view.remove()

  # Model is considered as new if no id is set.
  isNew: ->
    !@id


## Model collection
class MyAppCollection extends Backbone.Collection
  model: MyApp

  # Url where models lives.
  url: '/my-app/'

  # Select which field from backend response to use for parsing to populate  
  # collection.
  parse: (response) ->
    response.rows


