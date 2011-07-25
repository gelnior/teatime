## MyModelRow

# MyModelRow is the widget representation of a note.
class MyModelRow extends Backbone.View

  tagName: "div"
  className: "my-model-row"

  # HTML representation
  template:  _.template('''
    <p class="mymodel">
	My model
    </p>
  ''')


  ### Events ###

  events:
    "mouseover" : "onMouseOver"
    "mouseout" : "onMouseOut"

  # Constructor : register view and set HTML element id.
  constructor: (@model) ->
    super
    @id = @model.id
    @model.view = @
    

  ### Listeners ###


  # When mouse is over...
  onMouseOver: ->

  # When mouse is out...
  onMouseOut: ->


  ### Functions ###

  # Render model in HTML.
  render: ->
    $(@el).html(@template(@model.toJSON()))



