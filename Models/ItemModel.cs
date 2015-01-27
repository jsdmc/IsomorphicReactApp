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

        public string image { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }
        public int bidPrice { get; set; }
        public int binPrice { get; set; }
        public string bidLabel { get; set; }
        public string endDate { get; set; }
    }
}