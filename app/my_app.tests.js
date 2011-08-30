(function() {
  var MyAppCollection, MyAppView, MyModel, MyModelRow, myApp, panda;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  MyModel = (function() {
    __extends(MyModel, Backbone.Model);
    MyModel.prototype.url = '/my-url/';
    function MyModel(model) {
      MyModel.__super__.constructor.apply(this, arguments);
      if (model.id) {
        this.url = this.url + this.id + "/";
      } else {
        this.url = "/notes/all/";
      }
    }
    MyModel.prototype["delete"] = function() {
      this.url = "/notes/" + this.id + "/";
      this.destroy();
      return this.view.remove();
    };
    MyModel.prototype.isNew = function() {
      return !this.id;
    };
    return MyModel;
  })();
  MyAppCollection = (function() {
    __extends(MyAppCollection, Backbone.Collection);
    function MyAppCollection() {
      MyAppCollection.__super__.constructor.apply(this, arguments);
    }
    MyAppCollection.prototype.model = MyApp;
    MyAppCollection.prototype.url = '/my-app/';
    MyAppCollection.prototype.parse = function(response) {
      return response.rows;
    };
    return MyAppCollection;
  })();
  MyModelRow = (function() {
    __extends(MyModelRow, Backbone.View);
    MyModelRow.prototype.tagName = "div";
    MyModelRow.prototype.className = "my-model-row";
    MyModelRow.prototype.template = _.template('    <p class="mymodel">\nMy model\n    </p>');
    /* Events */
    MyModelRow.prototype.events = {
      "mouseover": "onMouseOver",
      "mouseout": "onMouseOut"
    };
    function MyModelRow(model) {
      this.model = model;
      MyModelRow.__super__.constructor.apply(this, arguments);
      this.id = this.model.id;
      this.model.view = this;
    }
    /* Listeners */
    MyModelRow.prototype.onMouseOver = function() {};
    MyModelRow.prototype.onMouseOut = function() {};
    /* Functions */
    MyModelRow.prototype.render = function() {
      return $(this.el).html(this.template(this.model.toJSON()));
    };
    return MyModelRow;
  })();
  MyAppView = (function() {
    __extends(MyAppView, Backbone.View);
    MyAppView.prototype.el = $("#notes-list");
    /* Events */
    function MyAppView() {
      MyAppView.__super__.constructor.apply(this, arguments);
    }
    MyAppView.prototype.initialize = function() {
      return this;
    };
    /* Listeners  */
    /* Functions  */
    /* UI Builders  */
    MyAppView.prototype.setListeners = function() {
      return this;
    };
    MyAppView.prototype.setWidgets = function() {
      return this;
    };
    return MyAppView;
  })();
  myApp = new MyAppView;
  myApp.setWidgets();
  myApp.setListeners();
  panda = "happy";
  describe('panda', function() {
    it('is happy', function() {
      expect(panda).toBe('happy');
    });
  });
}).call(this);
