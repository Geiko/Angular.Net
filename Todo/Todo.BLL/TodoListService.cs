using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.DAL;
using Todo.Models;

namespace Todo.BLL
{
    public class TodoListService : ITodoListService
    {
        private IDbContextFactory _dbContextFactory;
        public TodoListService(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public IEnumerable<TodoListModel> Get()
        {
            using (var context = _dbContextFactory.Create())
            {
                var todoLists = context.TodoLists.ToList().Select((todoList) => {
                    return new TodoListModel
                    {
                        Id = todoList.Id,
                        Title = todoList.Title
                    };
                });
                return todoLists;
            }
        }

        public TodoListModel Get(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var todoListModel = context.TodoLists
                        .Where(t => t.Id == id)
                        .ToList()
                        .Select((todoList) => {
                    return new TodoListModel
                    {
                        Id = todoList.Id,
                        Title = todoList.Title,
                        Todos = todoList.Todos.Select((todo) =>
                        {
                            return new TodoModel
                            {
                                Id = todo.Id,
                                Title = todo.Title,
                                Completed = todo.Completed
                            };
                        })
                        .ToList()
                    };
                })
                .FirstOrDefault();

               return todoListModel;
            }
        }

        public TodoListModel Create(TodoListModel todoListModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var todoList = new DAL.Entities.TodoList
                {
                    Title = todoListModel.Title,
                };
                context.TodoLists.Add(todoList);
                context.SaveChanges();
                todoListModel.Id = todoList.Id;
                return todoListModel;
            }
        }

        public TodoListModel Modify(TodoListModel todoListModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var todoList = context.TodoLists.Where(t => t.Id == todoListModel.Id).FirstOrDefault();
                todoList.Title = todoListModel.Title;
                context.SaveChanges();
                return todoListModel;
            }
        }

        public void Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var todo = context.TodoLists.Where(t => t.Id == id).FirstOrDefault();
                context.TodoLists.Remove(todo);
                context.SaveChanges();
            }
        }

        public void ClearCompleted(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var todoList = context.TodoLists.Where(t => t.Id == id).FirstOrDefault();
                var toDeleteList = todoList.Todos.Where(t => t.Completed).ToList();
                foreach (var todo in toDeleteList)
                {
                    context.Todos.Remove(todo);
                }
                context.SaveChanges();
            }
        }
    }
}
