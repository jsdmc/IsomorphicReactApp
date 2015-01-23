using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using IsomorphicReactApp.Models;

namespace IsomorphicReactApp.Repository
{
    public class FakeRepository
    {
        private List<ItemModel> _items;

        private readonly int _itemsCount = 10;

        public FakeRepository()
        {
            Int32.TryParse(ConfigurationManager.AppSettings["FakeItemsCount"], out _itemsCount);

            _items = new List<ItemModel>();

            for (int i = 0; i < _itemsCount; i++)
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

        public List<ItemModel> GetItems(string searchTerm)
        {
            var val = (searchTerm ?? "").Trim();

            return string.IsNullOrEmpty(val) ? _items : _items.Where(x => x.name.Contains(val) || x.city.Contains(val) || x.state.Contains(val) || x.country.Contains(val) || x.company.Contains(val)).ToList();
        }

        public ItemModel GetItem(int id)
        {
            return _items.FirstOrDefault(x => x.id == id);
        }
    }
}