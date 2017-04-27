using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.Models;

namespace Todo.BLL
{
    public interface ITodoListService
    {
        IEnumerable<TodoListModel> Get();
        TodoListModel Get(int id);
        TodoListModel Create(TodoListModel todoListModel);
        TodoListModel Modify(TodoListModel todoListModel);
        void Delete(int id);
        void ClearCompleted(int id);
    }
}
