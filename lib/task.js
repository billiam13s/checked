Task = new Mongo.Collection("task");


Meteor.methods({
    addTask: function(title, panelId) {
        if(title.trim()) {
            Task.insert({
                title:      title,
                panel_id:   panelId,
                createdAt:  new Date()

            });
        }
    },
    updateTask: function(taskId, title, detail, priorityId) {
        if(!priorityId || priorityId.length == 0)
            priorityId = null

        if(title.trim()) {
            Task.update(taskId, { 
                $set: { 
                    title: title,
                    detail: detail,
                    priority_id: priorityId,
                    updatedAt: new Date()
                } 
            });
        }
    },
    updateTaskPanel: function(taskId, panelId) {
        Task.update(taskId, {
            $set: {
                panel_id: panelId,
                updatedAt: new Date()
            }
        })
    },
    deleteTask: function(taskId) {
        Task.update(taskId, {
            $set: {
                deletedAt: new Date(),
                updatedAt: new Date()
            }
        });
    },
    recoverTask: function(taskId) {
        task = Task.update(taskId, {
            $set: {
                deletedAt: null,
                updatedAt: new Date()
            }
        })
        if(task) {
            panelId = Task.findOne(taskId).panel_id;
            Meteor.call('recoverPanel', panelId);
        }
    },
    hardDeleteTask: function(taskId) {
        Task.remove(taskId);
    }
});