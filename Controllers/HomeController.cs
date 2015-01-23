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
            return View();
        }

        public ActionResult ReactServerRender()
        {
            ViewBag.Message = "Message from ViewBag to server-rendered React app.";

            var model = _repository.GetItems(null);

            return View(model);
        }

        public ActionResult ReactClientRender()
        {
            ViewBag.Message = "Message from ViewBag to client-rendered React app.";

            return View();
        }

        public ActionResult Angular()
        {
            ViewBag.Message = "Message from ViewBag to Angular App.";

            return View();
        }

        public ActionResult Razor()
        {
            ViewBag.Message = "Message from ViewBag in Razor server-rendered page.";

            var model = _repository.GetItems(null);

            return View(model);
        }
    }
}