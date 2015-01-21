using System;
using System.Collections.Generic;
using System.Web.Mvc;
using IsomorphicReactApp.Repository;

namespace IsomorphicReactApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly FakeRepository _repository;

        public HomeController()
        {
            _repository = new FakeRepository();
        }

        public ActionResult Index()
        {
            ViewBag.Message = "Message from ViewBag.";

            var model = _repository.GetItems();

            return View(model);
        }

        public ActionResult Index2()
        {
            ViewBag.Message = "Message from ViewBag.";

            return View("Index2");
        }
    }
}