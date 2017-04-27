using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.DAL;
using Todo.DAL.Entities;
using Todo.Models;

namespace Todo.BLL
{
    public class WorkListService : IWorkListService
    {
        private IDbContextFactory _dbContextFactory;

        public WorkListService(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }


        public IEnumerable<WorkListModel> Get()
        {
            using (var context = _dbContextFactory.Create())
            {
                var workLists = context.WorkLists.ToList()
                        .Select(w =>
                            new WorkListModel
                            {
                                Id = w.Id,
                                Title = w.Title
                            });

                return workLists;
            }
        }



        public WorkListModel Get(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var workList = context.WorkLists
                        .Where(w => w.Id == id)
                        .Single();

                return new WorkListModel
                {
                    Id = workList.Id,
                    Title = workList.Title
                };        
            }
        }



        public WorkListModel Create(WorkListModel workListModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var workList = new WorkList
                {
                    Title = workListModel.Title,
                };

                context.WorkLists.Add(workList);
                context.SaveChanges();
                workListModel.Id = workList.Id;
                return workListModel;
            }
        }



        public WorkListModel Modify(WorkListModel workListModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var workList = context.WorkLists
                        .Where(w => w.Id == workListModel.Id)
                        .Single();
                workList.Title = workListModel.Title;
                context.SaveChanges();
                return workListModel;
            }
        }



        public void Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var workList = context.WorkLists
                        .Where(w => w.Id == id)
                        .Single();
                context.WorkLists.Remove(workList);
                context.SaveChanges();
            }
        }



        public void ClearCompleted(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var workList = context.WorkLists
                        .Where(w => w.Id == id)
                        .FirstOrDefault();
                var worksToDelete = workList.Works
                        .Where(w => w.IsCompleted).ToList();
                foreach (var work in worksToDelete)
                {
                    context.Works.Remove(work);
                }

                context.SaveChanges();
            }
        }
    }
}
