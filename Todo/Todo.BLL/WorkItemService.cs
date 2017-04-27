using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.DAL;
using Todo.DAL.Entities;
using Todo.Models;

namespace Todo.BLL
{
    public class WorkItemService : IWorkItemService
    {
        private IDbContextFactory _dbContextFactory;

        public WorkItemService(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }



        public WorkItemModel Create(WorkItemModel workModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var work = new Work
                {
                    WorkListId = workModel.WorkListId,
                    Title = workModel.Title,
                    IsCompleted = false
                };

                context.Works.Add(work);
                context.SaveChanges();
                workModel.Id = work.Id;
                return workModel;
            }
        }



        public WorkItemModel Modify(WorkItemModel workModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var work = context.Works.Where(w => w.Id == workModel.Id)
                                        .FirstOrDefault();
                work.Title = workModel.Title;
                work.IsCompleted = workModel.Completed;
                context.SaveChanges();
                return workModel;
            }
        }



        public void Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var work = context.Works.Where(w => w.Id == id)
                                        .Single();
                context.Works.Remove(work);
                context.SaveChanges();
            }
        }
    }
}
