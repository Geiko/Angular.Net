using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.Models
{
    public class TodoListModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public virtual ICollection<TodoModel> Todos { get; set; }
    }
}
