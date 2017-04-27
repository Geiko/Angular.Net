using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.Models;

namespace Todo.BLL
{
    public interface IWorkListService
    {
        IEnumerable<WorkListModel> Get();
        WorkListModel Get(int id);
        WorkListModel Create(WorkListModel workListModel);
        WorkListModel Modify(WorkListModel workListModel);
        void Delete(int id);
        void ClearCompleted(int id);
    }
}
