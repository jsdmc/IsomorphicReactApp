var React = require('react');
var ViewItem = require('./ViewItem');

var Collection = require("ampersand-collection");
var restMixin = require("ampersand-collection-rest-mixin");
var ItemsCollection = Collection.extend(restMixin, 
{
	url:  '/api/items'
});
var itemsCollection = new ItemsCollection();

var ShakaView = React.createClass({
	getInitialState: function() {
		var items = this.props.initialData ? this.props.initialData.slice(0) : [];
		return {items: items};
	},
	componentWillMount: function() {
		var that = this;
		if (!this.props.initialData){
			
			itemsCollection.fetch( { 
				success: function(data){
					that.setState({ items: data });
				}
			});
		}
	},
    render: function() {
		return (
				<div className="panel">
					<h3 className="panel-heading">
						Mega grid
					</h3>
					<table className="table table-striped table-bordered table-hover">
						<tbody>
							{
								this.state.items.map(function(elem){
									return <ViewItem data={elem} /> ;
								})
							}
						</tbody>
					</table> 
				</div>
        );
    }
});

module.exports = ShakaView;