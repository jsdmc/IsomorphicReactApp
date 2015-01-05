using System.Web.Mvc;

namespace IsomorphicReactApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Message from ViewBag.";

            return View();
        }
    }
}