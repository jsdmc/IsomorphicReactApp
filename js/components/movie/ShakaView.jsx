var React = require('react');
//var Griddle = require('griddle-react');
var ViewItem = require('./ViewItem');

var ShakaView = React.createClass({
	getInitialState: function() {
		var items = this.props.initialData ? this.props.initialData.slice(0) : [];
		return {items: items};
	},
	componentWillMount: function() {
		
		if (!this.props.initialData){
			var xhr = new XMLHttpRequest();
			xhr.open('get', '/api/items', true);
			xhr.onload = function() {
				var data = JSON.parse(xhr.responseText);
				this.setState({ items: data });
			}.bind(this);
			xhr.send();
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