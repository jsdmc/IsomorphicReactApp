var React = require('react');
var ShakaView = require('./movie/ShakaView'); //you can skip extention here (confugured when creating browserify bundler)

var ShakaBrahApp = React.createClass({
    render: function(){
        return (
                <div>
                    <h1>Shaka brah from React!</h1>
                    <ShakaView initialData={this.props.initialData} />
                </div>
        );
    }
});

module.exports = ShakaBrahApp;