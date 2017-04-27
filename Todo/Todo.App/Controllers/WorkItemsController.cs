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
    public class WorkItemsController : ApiController
    {
        private IWorkItemService _worksService;

        public WorkItemsController(IWorkItemService worksService)
        {
            _worksService = worksService;
        }

        public IHttpActionResult Post(WorkItemModel workModel)
        {
            try
            {
                return Ok(_worksService.Create(workModel));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }



        public IHttpActionResult Put(WorkItemModel workModel)
        {
            try
            {
                return Ok(_worksService.Modify(workModel));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        public IHttpActionResult Delete (int id)
        {
            try
            {
                _worksService.Delete(id);
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
