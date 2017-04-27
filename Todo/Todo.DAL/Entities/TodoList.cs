using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.DAL.Entities
{
    public class TodoList
    {
        public TodoList()
        {
            Todos = new List<Todo>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public virtual ICollection<Todo> Todos { get; set; }
    }
}
