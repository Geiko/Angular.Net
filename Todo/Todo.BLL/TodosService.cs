using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.DAL;
using Todo.Models;

namespace Todo.BLL
{
    public class TodosService : ITodosService
    {
        private IDbContextFactory _dbContextFactory;
        public TodosService(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public TodoModel Create(TodoModel todoModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var todo = new DAL.Entities.Todo
                {
                    TodoListId = todoModel.TodoListId,
                    Title = todoModel.Title,
                    Completed = false
                };
                context.Todos.Add(todo);
                context.SaveChanges();
                todoModel.Id = todo.Id;
                return todoModel;
            }
        }

        public TodoModel Modify(TodoModel todoModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var todo = context.Todos.Where(t => t.Id == todoModel.Id).FirstOrDefault();
                todo.Title = todoModel.Title;
                todo.Completed = todoModel.Completed;
                context.SaveChanges();
                return todoModel;
            }
        }

        public void Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var todo = context.Todos.Where(t => t.Id == id).FirstOrDefault();
                context.Todos.Remove(todo);
                context.SaveChanges();
            }
        }

    }
}
