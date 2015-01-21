var React = require('react');
var Griddle = require('griddle-react');

var ShakaMovie = React.createClass({
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
        	<div>
	          <div>
	            {/*<iframe width="560" height="315" src="//www.youtube.com/embed/pFIOTEyMT18" frameborder="0" allowfullscreen></iframe>*/}
	          </div>
			  <Griddle results={this.state.items} tableClassName="table" showFilter={true} resultsPerPage={1000}
				showSettings={true} columns={["name", "city", "state", "country"]}/>
          </div>
        );
    }
});

module.exports = ShakaMovie;