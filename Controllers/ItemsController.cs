﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IsomorphicReactApp.Models;
using IsomorphicReactApp.Repository;

namespace IsomorphicReactApp.Controllers
{
    public class ItemsController : ApiController
    {
        private readonly FakeRepository _repository;

        public ItemsController()
        {
            _repository = new FakeRepository();
        }

        // GET api/<controller>
        public IEnumerable<ItemModel> Get(string searchTerm)
        {
            return _repository.GetItems(searchTerm);
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}