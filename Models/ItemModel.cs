using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IsomorphicReactApp.Models
{
    public class ItemModel
    {
        public int id { get; set; }

        public string name { get; set; }

        public string city { get; set; }

        public string state { get; set; }

        public string country { get; set; }

        public string company { get; set; }

        public int favoriteNumber { get; set; }
    }
}