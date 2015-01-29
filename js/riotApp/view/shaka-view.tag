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
		<input type="text" onkeyup="{ runSearch }"/>
		<span>Total items count: {items.length}</span>

        <div each="{ items }">
            <shaka-item itemid="{ this.id }" itemname="{ this.name }" data="{ this }" ></shaka-item>
        <div>

	</div>

        //TODO: onkeyup event used for input instead of onchange
        //onchange somehow works really slow > 10s until handler executed

        //TODO: display table instread of simple divs
        //currently there is an issue for that on github. Already fixed but not released yet

        var that = this;
        
        this.items = opts.items || [];
        
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
        
        this.searchTerm = opts.searchTerm || '';
        this.runSearch(this.searchTerm);

</shaka-view>
