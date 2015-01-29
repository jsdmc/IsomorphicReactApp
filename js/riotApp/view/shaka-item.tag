var riot = require('riot');

<shaka-item>
	<span>{opts.itemid}</span>
	<span>{opts.itemname}</span>
	<span>{item.city}</span>
	<span>{item.state}</span>
	<span>{item.country}</span>
	<span>{item.company}</span>
	<span>{item.favoriteNumber}</span>

    //TODO: fix binding for usage item obj
    item = opts.data;

</shaka-item>