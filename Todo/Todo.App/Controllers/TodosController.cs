using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Todo.BLL;
using Todo.DAL;
using Todo.Models;

namespace Todo.App.Controllers
{
    public class TodosController : ApiController
    {
        private ITodosService _todosService;
        public TodosController(ITodosService todosService)
        {
            _todosService = todosService;
        }
        /// <summary>
        /// creates new todo item
        /// </summary>
        /// <param name="todoModel">todo model to create</param>
        /// <returns>created todo model</returns>
        public IHttpActionResult Post(TodoModel todoModel)
        {
            try
            {
                return Ok(_todosService.Create(todoModel));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// modifies todo
        /// </summary>
        /// <param name="todoModel">todo model to modify</param>
        /// <returns>modified todo model</returns>
        public IHttpActionResult Put(TodoModel todoModel)
        {
            try
            {
                return Ok(_todosService.Modify(todoModel));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
                throw;
            }
        }

        /// <summary>
        /// deletes todo item
        /// </summary>
        /// <param name="id">id of todo to delete</param>
        /// <returns></returns>
        public IHttpActionResult Delete(int id)
        {
            try
            {
                _todosService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
                throw;
            }
        }
    }
}
