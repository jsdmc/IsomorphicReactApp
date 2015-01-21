using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace IsomorphicReactApp.Controllers
{
    public class HomeController : Controller
    {
        private static List<object> _items;

        static HomeController()
        {
            _items = new List<object>();

            for (int i = 0; i < 100; i++)
            {
                _items.Add(new
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

        public ActionResult Index()
        {
            ViewBag.Message = "Message from ViewBag.";

            return View(_items);
        }

        public ActionResult Index2()
        {
            ViewBag.Message = "Message from ViewBag.";

            return View("Index2");
        }

        public JsonResult GetItems()
        {
            return Json(_items, JsonRequestBehavior.AllowGet);
        }
    }
}