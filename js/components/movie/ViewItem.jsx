var React = require('react');

var ViewItem = React.createClass({
	componentWillMount: function(){
		
	},
    render: function(){
		
		var item = this.props.data;

        return (
        		<tr>
	                <td>{item.id}</td>
	                <td>{item.name}</td>
	                <td>{item.city}</td>
	                <td>{item.state}</td>
	                <td>{item.country}</td>
	                <td>{item.company}</td>
	                <td>{item.favoriteNumber}</td>
                </tr>
        );
    }
});

module.exports = ViewItem;