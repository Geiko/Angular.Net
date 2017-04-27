using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Todo.BLL;
using Todo.Models;

namespace Todo.App.Controllers
{
    public class WorkListsController : ApiController
    {
        private IWorkListService _workListService;

        public WorkListsController(IWorkListService workListService)
        {
            _workListService = workListService;
        }

        public IHttpActionResult Get()
        {
            try
            {
                return Ok(_workListService.Get());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Get(int id)
        {
            try
            {
                return Ok(_workListService.Get(id));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Post(WorkListModel workListModel)
        {
            try
            {
                return Ok(_workListService.Create(workListModel));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Put(WorkListModel workListModel)
        {
            try
            {
                return Ok(_workListService.Modify(workListModel));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Delete(int id)
        {
            try
            {
                _workListService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);                
            }
        }


        [HttpDelete]
        [Route("api/work-lists/{id}/clear-completed")]
        public IHttpActionResult ClearCompletedWorks(int id)
        {
            try
            {
                _workListService.ClearCompleted(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
