(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

const React = require('react');
const uid = require('uid');

var styleRequired = {
  color: "#ffaaaa"
};

var AddListItem = React.createClass({
  displayName: 'AddListItem',


  handleSubmitEvent: function (event) {
    event.preventDefault();

    var item = {
      id: uid(),
      date: new Date(),
      name: this.refs.name.value.trim(),
      description: this.refs.description.value.trim(),
      quantity: this.refs.quantity.value
    };

    this.props.addListItem(item);
  },

  render: function () {
    return React.createElement(
      'form',
      { onSubmit: this.handleSubmitEvent },
      React.createElement(
        'h3',
        { className: 'page-header' },
        'Add New Item'
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          { htmlFor: 'listItemName' },
          'Name ',
          React.createElement(
            'span',
            { style: styleRequired },
            '*'
          )
        ),
        React.createElement('input', { type: 'text', className: 'form-control', id: 'listItemName', placeholder: 'Enter name', required: true, ref: 'name' })
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          { htmlFor: 'listItemDescription' },
          'Description'
        ),
        React.createElement('textarea', { className: 'form-control', rows: '3', id: 'listItemDescription', placeholder: 'Enter description', ref: 'description' })
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          { htmlFor: 'listItemQuantity' },
          'Quantity ',
          React.createElement(
            'span',
            { style: styleRequired },
            '*'
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-xs-5 col-sm-6 col-md-4' },
            React.createElement('input', { type: 'number', min: '1', max: '9999', step: '1', defaultValue: '1', className: 'form-control', id: 'listItemQuantity', required: true, ref: 'quantity' })
          )
        )
      ),
      React.createElement('hr', null),
      React.createElement(
        'button',
        { type: 'submit', className: 'btn btn-primary' },
        'Add to list'
      ),
      React.createElement(
        'button',
        { type: 'reset', className: 'btn btn-link' },
        'Cancel'
      )
    );
  }
});

module.exports = AddListItem;

},{"react":"react","uid":"uid"}],2:[function(require,module,exports){

const ShoppingList = require('./ShoppingList');
const React = require('react');

var Application = React.createClass({
  displayName: 'Application',

  render: function () {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(ShoppingList, null)
    );
  }
});

module.exports = Application;

},{"./ShoppingList":8,"react":"react"}],3:[function(require,module,exports){

const React = require('react');

var EmptyList = React.createClass({
  displayName: 'EmptyList',

  render: function () {
    return React.createElement(
      'div',
      null,
      'There are no items in your list.'
    );
  }
});

module.exports = EmptyList;

},{"react":"react"}],4:[function(require,module,exports){

const ListHeader = require('./ListHeader');
const EmptyList = require('./EmptyList');
const ListItem = require('./ListItem');
const React = require('react');

var List = React.createClass({
  displayName: 'List',


  getListOfItemIds: function (items) {
    return Object.keys(items);
  },

  getTotalNumberOfListItems: function (items) {
    var totalNumberOfItems = 0;
    var item;

    this.getListOfItemIds(items).forEach(function (itemId) {
      item = items[itemId];
      totalNumberOfItems = totalNumberOfItems + parseInt(item.quantity, 10);
    });

    return totalNumberOfItems;
  },

  createListItemElements: function (items) {
    var item;

    return this.getListOfItemIds(items).map(function createListItemElement(itemId) {
      item = items[itemId];
      return React.createElement(ListItem, { item: item, removeListItem: this.props.removeListItem, key: item.id });
    }.bind(this)).reverse();
  },

  render: function () {
    var items = this.props.items;
    var listItemElements = this.createListItemElements(items);

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h3',
        { className: 'page-header' },
        React.createElement(ListHeader, { totalNumberOfListItems: this.getTotalNumberOfListItems(items), removeAllListItems: this.props.removeAllListItems })
      ),
      React.createElement(
        'ul',
        null,
        listItemElements.length > 0 ? listItemElements : React.createElement(EmptyList, null)
      )
    );
  }
});

module.exports = List;

},{"./EmptyList":3,"./ListHeader":5,"./ListItem":6,"react":"react"}],5:[function(require,module,exports){

const React = require('react');

var ListHeader = React.createClass({
  displayName: 'ListHeader',


  handleSubmit: function (event) {
    event.preventDefault();

    this.props.removeAllListItems();
  },

  render: function () {
    var totalNumberOfListItems = this.props.totalNumberOfListItems;

    if (totalNumberOfListItems > 0) {
      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit, className: 'form-inline' },
        this.props.totalNumberOfListItems,
        ' ',
        totalNumberOfListItems === 1 ? 'item' : 'items',
        ' ',
        React.createElement(
          'button',
          { className: 'btn btn-xs btn-default', type: 'submit' },
          'Remove all'
        )
      );
    }

    return React.createElement(
      'span',
      null,
      'Shopping List'
    );
  }
});

module.exports = ListHeader;

},{"react":"react"}],6:[function(require,module,exports){

const ListItemDescription = require('./ListItemDescription');
const React = require('react');

var ListItem = React.createClass({
  displayName: 'ListItem',


  handleSubmit: function (event) {
    event.preventDefault();

    var listItemId = this.props.item.id;

    this.props.removeListItem(listItemId);
  },

  render: function () {
    var item = this.props.item;
    return React.createElement(
      'div',
      { className: 'panel panel-primary' },
      React.createElement(
        'div',
        { className: 'panel-heading' },
        item.quantity,
        ' x ',
        item.name
      ),
      item.description.length > 0 ? React.createElement(ListItemDescription, { description: item.description }) : '',
      React.createElement(
        'div',
        { className: 'panel-footer' },
        React.createElement(
          'form',
          { className: 'form-inline', onSubmit: this.handleSubmit },
          React.createElement(
            'button',
            { type: 'submit', className: 'btn btn-default btn-xs' },
            'Remove'
          )
        )
      )
    );
  }
});

module.exports = ListItem;

},{"./ListItemDescription":7,"react":"react"}],7:[function(require,module,exports){

const React = require('react');

var ListItemDescription = React.createClass({
  displayName: "ListItemDescription",

  render: function () {
    return React.createElement(
      "div",
      { className: "panel-body" },
      this.props.description
    );
  }
});

module.exports = ListItemDescription;

},{"react":"react"}],8:[function(require,module,exports){

const AddListItem = require('./AddListItem');
const List = require('./List');
const React = require('react');

var ShoppingList = React.createClass({
  displayName: 'ShoppingList',


  getInitialState: function () {
    return {
      list: {}
    };
  },

  updateList: function (newList) {
    this.setState({
      list: newList
    });
  },

  addListItem: function (item) {
    var list = this.state.list;

    list[item.id] = item;

    this.updateList(list);
  },

  removeListItem: function (itemId) {
    var list = this.state.list;

    delete list[itemId];

    this.updateList(list);
  },

  removeAllListItems: function () {
    this.updateList({});
  },

  render: function () {
    var items = this.state.list;

    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-sm-6' },
        React.createElement(List, {
          items: items,
          removeListItem: this.removeListItem,
          removeAllListItems: this.removeAllListItems })
      ),
      React.createElement(
        'div',
        { className: 'col-sm-6' },
        React.createElement(AddListItem, { addListItem: this.addListItem })
      )
    );
  }
});

module.exports = ShoppingList;

},{"./AddListItem":1,"./List":4,"react":"react"}],9:[function(require,module,exports){

const Application = require('./components/Application');
const ReactDOM = require('react-dom');
const React = require('react');

ReactDOM.render(React.createElement(Application, null), document.querySelector('[data-react-application]'));

},{"./components/Application":2,"react":"react","react-dom":"react-dom"}]},{},[9]);
