var riot = require('riot');

<shaka-item>
	<td>{opts.itemid}</td>
	<td>{opts.itemname}</td>
	<td>{item.city}</td>
	<td>{item.state}</td>
	<td>{item.country}</td>
	<td>{item.company}</td>
	<td>{item.favoriteNumber}</td>

    //TODO: fix binding for usage item obj
    item = opts.data;

</shaka-item>