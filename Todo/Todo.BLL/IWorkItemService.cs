using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.Models;

namespace Todo.BLL
{
    public interface IWorkItemService
    {
        WorkItemModel Create(WorkItemModel workModel);
        WorkItemModel Modify(WorkItemModel workModel);
        void Delete(int id);
    }
}
