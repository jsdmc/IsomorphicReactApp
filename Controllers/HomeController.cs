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

        public ActionResult ServerRender()
        {
            ViewBag.Message = "Message from ViewBag.";

            var model = _repository.GetItems();

            return View(model);
        }

        public ActionResult ClientRender()
        {
            ViewBag.Message = "Message from ViewBag.";

            return View();
        }
    }
}