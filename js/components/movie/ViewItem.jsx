var React = require('react');

var ViewItem = React.createClass({
	componentWillMount: function(){
		
	},
    render: function(){
		
		var item = this.props.data;

        return (
        		<tr>
	                <th>{item.id}</th>
	                <th>{item.name}</th>
	                <th>{item.city}</th>
	                <th>{item.state}</th>
	                <th>{item.country}</th>
	                <th>{item.company}</th>
	                <th>{item.favoriteNumber}</th>
                </tr>
        );
    }
});

module.exports = ViewItem;