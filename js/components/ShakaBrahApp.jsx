var React = require('react');
var ShakaMovie = require('./movie/ShakaMovie'); //you can skip extention here (confugured when creating browserify bundler)

var ShakaBrahApp = React.createClass({
    render: function(){
        return (
                <div>
                    <h1>Shaka brah from React!</h1>
                    <ShakaMovie initialData={this.props.initialData} />
                </div>
        );
    }
});

module.exports = ShakaBrahApp;