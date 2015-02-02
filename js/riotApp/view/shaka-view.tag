var riot = require('riot');
require('./shaka-item');

var Collection = require("ampersand-collection");
var restMixin = require("ampersand-collection-rest-mixin");
var ItemsCollection = Collection.extend(restMixin,
{
    url: '/api/items'
});
var itemsCollection = new ItemsCollection();

<shaka-view>

	<div className="panel">
		<h3 className="panel-heading">
			Mega grid
		</h3>
		<input type="text" onkeyup="{ runSearch }" value="{ searchTerm }"/>
		<span>Total items count: {items.length}</span>

        <table class="table table-striped table-bordered table-hover">
            <tr each="{ items }">
                <td>{id}</td>
	            <td>{name}</td>
	            <td>{city}</td>
	            <td>{state}</td>
	            <td>{country}</td>
	            <td>{company}</td>
	            <td>{favoriteNumber}</td>
            </tr>
        </table>

	</div>
        
        /*TODO: add proper table items rendering using nested components
        <shaka-item itemid="{ this.id }" itemname="{ this.name }" data="{ this }" />*/
        var that = this;
        
        this.items = opts.items || [];

        this.searchTerm = opts.searchterm || '';

        
        runSearch(e) {
            var searchTerm = e.target ? e.target.value : e;

            itemsCollection.fetch({
                data: { searchTerm: searchTerm },
                reset: true,
                success: function (data) {
                    //update view
                    that.update({items: data.models});
                }
            });
        }

        this.on('mount', function() {
            this.runSearch(this.searchTerm);
        });

</shaka-view>
