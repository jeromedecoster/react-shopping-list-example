
const ShoppingList = require('./ShoppingList')
const React = require('react')


var Application = React.createClass({
  render: function () {
    return (
      <div className="container">
        <ShoppingList />
      </div>
    )
  }
})

module.exports = Application
