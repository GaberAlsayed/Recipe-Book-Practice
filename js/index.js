var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// React and Redux Const
var _React = React,
    Component = _React.Component;
var _ReactDOM = ReactDOM,
    render = _ReactDOM.render;
var _ReactRedux = ReactRedux,
    Provider = _ReactRedux.Provider,
    connect = _ReactRedux.connect;
var _Redux = Redux,
    applyMiddleware = _Redux.applyMiddleware,
    createStore = _Redux.createStore,
    compose = _Redux.compose,
    combineReducers = _Redux.combineReducers,
    bindActionCreators = _Redux.bindActionCreators;

//Locale Storage
//const { localStorage } = windows;

/*
name used for local storage, since well, its 
codepen and other people will be creating
recipe apps, and don't want to break them 
*/

var STORE_PREFIX = '_jnmorse';

// Redux Action Types
var ADD_RECIPE = 'ADD_RECIPE';
var REMOVE_RECIPE = 'REMOVE_RECIPE';
var STORE_RECIPES = 'STORE_RECIPE';
var RETRIEVE_RECIPES = 'RETRIEVE_RECIPES';
var SEARCH_RECIPES = 'SEARCH_RECIPES';

var addRecipe = function addRecipe(recipe, index) {
  var name = recipe.name,
      directions = recipe.directions,
      ingredients = recipe.ingredients;


  return {
    type: ADD_RECIPE,
    payload: {
      recipe: { name: name, directions: directions, ingredients: ingredients },
      index: index
    }
  };
};

var removeRecipe = function removeRecipe(id) {
  return {
    type: REMOVE_RECIPE,
    payload: id
  };
};

var retrieveRecipes = function retrieveRecipes() {
  var data = JSON.parse(localStorage.getItem(STORE_PREFIX + '_recipes'));

  if (!data) {
    data = [{
      name: 'Sausage Chowder',
      ingredients: ['1 pound bulk pork sausage', '5 potatoes, peeled and cubed', '1 (15 ounce) can cream-style corn', '1 (15 ounce) can whole kernal corn', '1/2 onion, diced', '1 cup uncooked macaroni (optional)', '8 ounces processed cheese food, cubed', 'salt and pepper to taste'],
      directions: ['Cumble the sausage into a dutch oven our soup pot over medium-high heat. Cook until evenly browned, stirring and breaking into smaller chunks. Drain grease. Add onion; cook and stir until onion is beginning to soften.', 'Put in the potatoes, and fill with enough water to cover. Bring to a boil, and stir in the macaroni. Pour in the cans of creamed corn, and whole corn with the juice from the can.', 'When the pasta and potatoes are tender, remove from heat and stir in the processed cheese until melted. Season with salt and pepper to taste. If the chowder is too thick, stir in milk or water to thin before serving.']
    }, {
      name: 'Mushroom Slow Cooker Roast Beef',
      ingredients: ['1 pound sliced fresh mushrooms', '1 (4 pound) standing beef rib roast', '1 (1.25 ounce) envelope onion soup mix', '1 (12 fluid ounce) bottle beer', 'ground black pepper'],
      directions: ['Place the mushrooms in the bottom of a slow cooker;', 'set the roast atop the mushrooms;', 'sprinkle the onion soup mix over the beef', 'pour the beer over everything', 'season with black pepper', 'Set slow cooker to low', 'Cook 9 - 10 hours until the meat is easily pulled apart with a fork']
    }, {
      name: 'Vanishing Oatmeal Raisin Cookies',
      ingredients: ['1/2 Cup (1 Stick) plus 6 tablespoons butter, softened', '3/4 Cup firmly packed brown sugar', '1/2 Cup granulated sugar', '2 Eggs', '1 Teaspoon vanilla', '1-1/2 Cups all-purpose flour', '1 Teaspoon Baking Soda', '1 Teaspoon ground cinnamon', '1/2 Teaspoon salt (optional)', '3 Cups Quaker Oats (quick or old fashioned, uncooked)', '1 Cup raisins'],
      directions: ['Heat Oven to 350 deg fahrenheit', 'In a large bowl, beat butter and sugars on medium speed of electric mixer until creamy', 'Add eggs and vanilla, beat well', 'Add combined flour, baking soda, cinnamon, and salt, mix well', 'Add oats and raisins, mix well', 'Drop dough by rounded tablespoonfuls onto ungreased cookie sheets', 'Bake 8 to 10 minutes or until light golden brown']
    }];
  }

  return {
    type: RETRIEVE_RECIPES,
    payload: data
  };
};

var storeRecipes = function storeRecipes(data) {
  localStorage.setItem(STORE_PREFIX + '_recipes', JSON.stringify(data));

  return {
    type: STORE_RECIPES
  };
};

var searchRecipes = function searchRecipes(term) {
  return {
    type: SEARCH_RECIPES,
    payload: term
  };
};

var RecipeBook = function (_Component) {
  _inherits(RecipeBook, _Component);

  function RecipeBook(props) {
    _classCallCheck(this, RecipeBook);

    var _this = _possibleConstructorReturn(this, (RecipeBook.__proto__ || Object.getPrototypeOf(RecipeBook)).call(this, props));

    _this.state = {
      newRecipeToggle: false
    };
    return _this;
  }

  _createClass(RecipeBook, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.retrieveRecipes();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var cards = this.props.recipe.cards;


      if (cards !== prevProps.recipe.cards) {
        this.props.storeRecipes(cards);
      }
    }
  }, {
    key: 'showNewRecipe',
    value: function showNewRecipe() {
      this.setState({
        newRecipeToggle: !this.state.newRecipeToggle
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var cards = this.props.recipe.cards;


      return React.createElement(
        'div',
        { className: 'recipe-book' },
        React.createElement(
          'header',
          { className: 'recipe-book-title' },
          React.createElement(
            'h1',
            null,
            'Recipe Book'
          )
        ),
        React.createElement(
          'div',
          { className: 'recipe-top-controls' },
          React.createElement(SearchRecipes, null),
          React.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this2.showNewRecipe();
              } },
            'Add Recipe'
          )
        ),
        React.createElement(
          'div',
          null,
          this.state.newRecipeToggle ? React.createElement(EditRecipe, { callback: function callback() {
              return _this2.showNewRecipe();
            } }) : null
        ),
        React.createElement(RecipeList, this.props)
      );
    }
  }]);

  return RecipeBook;
}(Component);

function mapStateToProps(_ref) {
  var recipe = _ref.recipe;

  return { recipe: recipe };
}

RecipeBook = connect(mapStateToProps, {
  storeRecipes: storeRecipes,
  retrieveRecipes: retrieveRecipes
})(RecipeBook);

var EditRecipe = function (_Component2) {
  _inherits(EditRecipe, _Component2);

  function EditRecipe(props) {
    _classCallCheck(this, EditRecipe);

    var _this3 = _possibleConstructorReturn(this, (EditRecipe.__proto__ || Object.getPrototypeOf(EditRecipe)).call(this, props));

    _this3.state = {
      name: '',
      ingredient: '',
      step: '',
      ingredients: [],
      directions: []
    };
    return _this3;
  }

  _createClass(EditRecipe, [{
    key: 'updateIngredient',
    value: function updateIngredient(value) {
      this.setState({
        ingredient: value
      });
    }
  }, {
    key: 'updateStep',
    value: function updateStep(value) {
      this.setState({
        step: value
      });
    }
  }, {
    key: 'addStep',
    value: function addStep() {
      document.querySelector('#recipe-step').value = '';

      this.setState({
        directions: [].concat(_toConsumableArray(this.state.directions), [this.state.step]),
        step: ''
      });
    }
  }, {
    key: 'addIngredient',
    value: function addIngredient() {
      document.querySelector('#ingredient').value = '';

      this.setState({
        ingredients: [].concat(_toConsumableArray(this.state.ingredients), [this.state.ingredient]),
        ingredient: ''
      });
    }
  }, {
    key: 'updateName',
    value: function updateName(value) {
      this.setState({
        name: value
      });
    }
  }, {
    key: 'onFormSubmit',
    value: function onFormSubmit(event) {
      event.preventDefault();

      var _state = this.state,
          name = _state.name,
          directions = _state.directions,
          ingredients = _state.ingredients;


      if (name && directions.length && ingredients.length) {
        this.props.addRecipe(this.state, this.props.index);
        this.props.callback();
      }
    }
  }, {
    key: 'hide',
    value: function hide(event) {
      if (event.target === document.querySelector('.recipe-edit')) {
        this.props.callback(event);
      }
    }
  }, {
    key: 'deleteStep',
    value: function deleteStep(event, i) {
      event.preventDefault();
      var directions = [].concat(_toConsumableArray(this.state.directions));
      directions.splice(i, 1);

      this.setState({ directions: directions });
    }
  }, {
    key: 'deleteIngredient',
    value: function deleteIngredient(event, i) {
      event.preventDefault();
      var ingredients = [].concat(_toConsumableArray(this.state.ingredients));
      ingredients.splice(i, 1);

      this.setState({ ingredients: ingredients });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          name = _props.name,
          ingredients = _props.ingredients,
          directions = _props.directions;


      if (name && ingredients && directions) {
        this.setState({ name: name, ingredients: ingredients, directions: directions });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var ingredients = this.state.ingredients.map(function (ingredient, i) {
        return React.createElement(
          'li',
          { key: i },
          React.createElement(
            'span',
            null,
            ingredient,
            '\xA0 '
          ),
          React.createElement(
            'a',
            { href: true, onClick: function onClick(event) {
                return _this4.deleteIngredient(event, i);
              } },
            'X'
          ),
          React.createElement(
            'span',
            null,
            '\xA0 '
          )
        );
      });

      var directions = this.state.directions.map(function (step, i) {
        return React.createElement(
          'li',
          { key: i },
          React.createElement(
            'p',
            null,
            step,
            ' ',
            React.createElement(
              'a',
              { href: true, onClick: function onClick(event) {
                  return _this4.deleteStep(event, i);
                } },
              'X'
            )
          )
        );
      });

      return React.createElement(
        'div',
        { className: 'recipe-edit', onClick: function onClick(event) {
            return _this4.hide(event);
          } },
        React.createElement(
          'form',
          { onSubmit: function onSubmit(event) {
              return _this4.onFormSubmit(event);
            } },
          React.createElement(
            'header',
            { style: { display: 'none' } },
            React.createElement(
              'h1',
              null,
              'New Recipe'
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'recipe-name' },
              'Name'
            ),
            React.createElement('input', {
              type: 'text',
              id: 'recipe-name',
              placeholder: 'Recipe Name',
              value: this.state.name,
              onChange: function onChange(event) {
                return _this4.updateName(event.target.value);
              }
            })
          ),
          React.createElement(
            'fieldset',
            null,
            React.createElement(
              'legend',
              null,
              'Ingredients'
            ),
            React.createElement(
              'ul',
              { className: 'ingredients' },
              ingredients
            ),
            React.createElement(
              'label',
              { htmlFor: 'ingredient' },
              'Ingredient'
            ),
            React.createElement('input', {
              type: 'text',
              id: 'ingredient',
              placeholder: 'ingredient',
              value: this.state.ingredient,
              onChange: function onChange(event) {
                return _this4.updateIngredient(event.target.value);
              }
            }),
            React.createElement(
              'button',
              { type: 'button', onClick: function onClick() {
                  return _this4.addIngredient();
                } },
              'Add Ingredient'
            )
          ),
          React.createElement(
            'fieldset',
            null,
            React.createElement(
              'legend',
              null,
              'Directions:'
            ),
            React.createElement(
              'ul',
              null,
              this.state.directions.length ? directions : React.createElement(
                'li',
                null,
                'No Directions'
              )
            ),
            React.createElement('hr', null),
            React.createElement(
              'label',
              { htmlFor: 'recipe-step' },
              'Step'
            ),
            React.createElement('textarea', {
              id: 'recipe-step',
              placeholder: 'preheat over to 350',
              value: this.state.step,
              onChange: function onChange(event) {
                return _this4.updateStep(event.target.value);
              }
            }),
            React.createElement(
              'button',
              { type: 'button', onClick: function onClick() {
                  return _this4.addStep();
                } },
              'Add Direction Step'
            )
          ),
          React.createElement(
            'footer',
            null,
            React.createElement(
              'button',
              { type: 'submit' },
              'Save Recipe'
            ),
            React.createElement(
              'button',
              { type: 'button', onClick: function onClick(event) {
                  return _this4.props.callback(event);
                } },
              'Cancel'
            )
          )
        )
      );
    }
  }]);

  return EditRecipe;
}(Component);

EditRecipe = connect(null, { addRecipe: addRecipe })(EditRecipe);

var SearchRecipes = function (_Component3) {
  _inherits(SearchRecipes, _Component3);

  function SearchRecipes(props) {
    _classCallCheck(this, SearchRecipes);

    var _this5 = _possibleConstructorReturn(this, (SearchRecipes.__proto__ || Object.getPrototypeOf(SearchRecipes)).call(this, props));

    _this5.state = {
      term: ''
    };

    _this5.search = _.debounce(_this5.props.searchRecipes, 500);
    return _this5;
  }

  _createClass(SearchRecipes, [{
    key: 'updateTerm',
    value: function updateTerm(term) {
      this.setState({
        term: term
      });

      this.search(term);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return React.createElement('input', {
        className: 'recipe-search-box',
        type: 'text',
        value: this.state.term,
        placeholder: 'Search Recipes',
        onChange: function onChange(event) {
          return _this6.updateTerm(event.target.value);
        }
      });
    }
  }]);

  return SearchRecipes;
}(Component);

SearchRecipes = connect(null, { searchRecipes: searchRecipes })(SearchRecipes);

var RecipeList = function RecipeList(props) {
  var _props$recipe = _extends({}, props.recipe),
      cards = _props$recipe.cards,
      search = _props$recipe.search;

  cards = cards.sort(function (a, b) {
    return a.name > b.name;
  }).filter(function (card) {
    var name = card.name.toLowerCase();
    search = search.toLowerCase();

    var nameMatch = name.search(search) !== -1;
    var ingredentsMatch = card.ingredients.some(function (item) {
      item = item.toLowerCase();
      return item.search(search) !== -1;
    });

    return nameMatch || ingredentsMatch;
  }).map(function (card, index) {
    return React.createElement(Recipe, _extends({ index: index, key: index }, card));
  });

  return React.createElement(
    'div',
    null,
    cards
  );
};

var Recipe = function (_Component4) {
  _inherits(Recipe, _Component4);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    var _this7 = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this, props));

    _this7.state = {
      edit: false
    };
    return _this7;
  }

  _createClass(Recipe, [{
    key: 'toggleActive',
    value: function toggleActive(event, id) {
      event.preventDefault();

      var itemToToggle = document.querySelector('#recipe-' + id);
      var classList = itemToToggle.classList;
      var active = false;
      var i = 0;

      for (i = 0; i < classList.length; i++) {
        if (classList[i] === 'active') {
          active = true;
        }
      }

      if (active) {
        classList.remove('active');
      } else {
        classList.add('active');
      }
    }
  }, {
    key: 'toggleEdit',
    value: function toggleEdit(event) {
      if (event) {
        event.preventDefault();
      }

      this.setState({
        edit: !this.state.edit
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var _props2 = this.props,
          name = _props2.name,
          index = _props2.index;


      var list = function list(step, i) {
        return React.createElement(
          'li',
          { key: i },
          step
        );
      };

      var directions = this.props.directions.map(list);
      var ingredients = this.props.ingredients.map(list);

      return React.createElement(
        'article',
        { id: 'recipe-' + index, className: 'recipe-card' },
        this.state.edit ? React.createElement(EditRecipe, _extends({}, this.props, { callback: function callback() {
            return _this8.toggleEdit();
          } })) : null,
        React.createElement(
          'header',
          { className: 'recipe-title' },
          React.createElement(
            'h1',
            null,
            React.createElement(
              'a',
              { href: true, onClick: function onClick(event) {
                  return _this8.toggleActive(event, index);
                } },
              name
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'recipe-details' },
          React.createElement(
            'section',
            null,
            React.createElement(
              'header',
              null,
              React.createElement(
                'h2',
                null,
                'Ingredients'
              )
            ),
            React.createElement(
              'ol',
              null,
              ingredients
            )
          ),
          React.createElement(
            'section',
            null,
            React.createElement(
              'header',
              null,
              React.createElement(
                'h2',
                null,
                'Directions'
              )
            ),
            React.createElement(
              'ol',
              null,
              directions
            )
          ),
          React.createElement(
            'footer',
            null,
            React.createElement(
              'a',
              {
                href: '#',
                className: 'button',
                onClick: function onClick(event) {
                  return _this8.toggleEdit(event);
                }
              },
              React.createElement(
                'span',
                null,
                'Edit Recipe'
              )
            ),
            React.createElement(
              'button',
              {
                onClick: function onClick() {
                  return _this8.props.removeRecipe(index);
                },
                type: 'button',
                className: 'danger'
              },
              React.createElement(
                'span',
                null,
                'Delete Recipe'
              )
            )
          )
        )
      );
    }
  }]);

  return Recipe;
}(Component);

Recipe = connect(null, { removeRecipe: removeRecipe })(Recipe);

var App = function App() {
  return React.createElement(
    'div',
    null,
    React.createElement(RecipeBook, null)
  );
};

var RECIPES_INIT_STATE = {
  search: '',
  cards: []
};

var RecipesReducer = function RecipesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RECIPES_INIT_STATE;
  var action = arguments[1];

  var cards = [];

  switch (action.type) {

    case SEARCH_RECIPES:
      return _extends({}, state, { search: action.payload });

    case RETRIEVE_RECIPES:
      return _extends({}, state, { cards: action.payload });

    case ADD_RECIPE:
      cards = [].concat(_toConsumableArray(state.cards));

      if (action.payload.index !== undefined) {
        cards[action.payload.index] = action.payload.recipe;
      } else {
        cards.push(action.payload.recipe);
      }

      return _extends({}, state, { cards: cards });

    case REMOVE_RECIPE:
      cards = [].concat(_toConsumableArray(state.cards));
      cards.splice(action.payload, 1);

      return _extends({}, state, { cards: cards });

    default:
      return state;
  }
};

var rootReducer = combineReducers({
  recipe: RecipesReducer
});

/* simplified React Promise Middleware */
function promiseMiddleware(_ref2) {
  var dispatch = _ref2.dispatch;

  function isPromise(val) {
    return val && typeof val.then === 'function';
  }

  return function (next) {
    return function (action) {
      return isPromise(action.payload) ? action.payload.then(function (result) {
        return dispatch(_extends({}, action, { payload: result }));
      }, function (error) {
        return dispatch(_extends({}, action, { payload: error, error: true }));
      }) : next(action);
    };
  };
}

function configureStore(initialState) {
  var store = createStore(rootReducer, initialState, compose(applyMiddleware(promiseMiddleware), window.devToolsExtension ? window.devToolsExtension() : function (f) {
    return f;
  }));

  return store;
}

var store = configureStore();

render(React.createElement(
  Provider,
  { store: store },
  React.createElement(App, null)
), document.querySelector('#app'));