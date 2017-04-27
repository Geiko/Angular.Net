using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.Models
{
    public class WorkListModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public virtual ICollection<WorkItemModel> Works { get; set; }

        public WorkListModel()
        {
            Works = new List<WorkItemModel>();
        }
    }
}
