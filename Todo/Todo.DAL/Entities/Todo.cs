using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.DAL.Entities
{
    public class Todo
    {
        public int Id { get; set; }

        public int TodoListId { get; set; }
        public virtual TodoList TodoList { get; set; }

        public string Title { get; set; }

        public bool Completed { get; set; }
    }
}
