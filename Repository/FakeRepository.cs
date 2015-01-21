using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IsomorphicReactApp.Models;

namespace IsomorphicReactApp.Repository
{
    public class FakeRepository
    {
        private List<ItemModel> _items;

        public FakeRepository()
        {
            _items = new List<ItemModel>();

            for (int i = 0; i < 1000; i++)
            {
                _items.Add(new ItemModel
                    {
                        id = i,
                        name = "Mayer Leonard" + i.ToString(),
                        city = "Kapowsin" + i.ToString(),
                        state = "Hawaii" + i.ToString(),
                        country = "United Kingdom" + i.ToString(),
                        company = "Ovolo" + i.ToString(),
                        favoriteNumber = new Random().Next(100)
                    });
            }
        }

        public List<ItemModel> GetItems()
        {
            return _items;
        }

        public ItemModel GetItem(int id)
        {
            return _items.FirstOrDefault(x => x.id == id);
        }
    }
}