var React = require('react');

var ShakaMovie = React.createClass({
    render: function() {
        return (
          <div>
            <iframe width="560" height="315" src="//www.youtube.com/embed/pFIOTEyMT18" frameborder="0" allowfullscreen></iframe>
          </div>
        );
    }
});

module.exports = ShakaMovie;