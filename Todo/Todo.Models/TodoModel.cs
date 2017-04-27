using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.Models
{
    public class TodoModel
    {
        public int Id { get; set; }

        public int TodoListId { get; set; }

        public string Title { get; set; }

        public bool Completed { get; set; }
    }
}
