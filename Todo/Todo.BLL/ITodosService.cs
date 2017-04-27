using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.Models;

namespace Todo.BLL
{
    public interface ITodosService
    {
        TodoModel Create(TodoModel todoModel);
        TodoModel Modify(TodoModel todoModel);
        void Delete(int id);
    }
}
