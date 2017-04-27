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
    public class TodoListsController : ApiController
    {
        private ITodoListService _todoListsService;
        public TodoListsController(ITodoListService todoListsService)
        {
            _todoListsService = todoListsService;
        }
        /// <summary>
        /// retrives collection of todo-lists
        /// </summary>
        /// <returns>collection of todo-lists</returns>
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(_todoListsService.Get());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// retrives todo-list
        /// </summary>
        /// <param name="id">id of todo-list to return</param>
        /// <returns>todo-list model</returns>
        public IHttpActionResult Get(int id)
        {
            try
            {
                return Ok(_todoListsService.Get(id));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// creates todo-list item
        /// </summary>
        /// <param name="todoListModel">todo-list model to create</param>
        /// <returns>created todo-list model</returns>
        public IHttpActionResult Post(TodoListModel todoListModel)
        {
            try
            {
                return Ok(_todoListsService.Create(todoListModel));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// changes todo-list item
        /// </summary>
        /// <param name="todoListModel">todo-list model to change</param>
        /// <returns>changed todo-list model</returns>
        public IHttpActionResult Put(TodoListModel todoListModel)
        {
            try
            {
                return Ok(_todoListsService.Modify(todoListModel));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// deletes todo-list item
        /// </summary>
        /// <param name="id">id of todo-list item to delete</param>
        /// <returns></returns>
        public IHttpActionResult Delete(int id)
        {
            try
            {
                _todoListsService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// removes completed todos from todo-list
        /// </summary>
        /// <param name="id">id of todo-list</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("api/todo-lists/{id}/clear-completed")]
        public IHttpActionResult ClearCompletedTodos(int id)
        {
            try
            {
                _todoListsService.ClearCompleted(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
