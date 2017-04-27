using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.Models
{
    public class WorkItemModel
    {
        public int Id { get; set; }

        public int WorkListId { get; set; }

        public string Title { get; set; }

        public bool IsCompleted { get; set; }
    }
}
