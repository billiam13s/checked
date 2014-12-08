Task = new Mongo.Collection("task");


Meteor.methods({
    addTask: function(title, panel_id) {
        Task.insert({
            title:      title,
            panel_id:   panel_id,
            createdAt:  new Date()

        });
    },
    updateTask: function(taskId, title, detail, priority_id) {
        if(!priority_id || priority_id.length == 0)
            priority_id = null
        Task.update(taskId, { 
            $set: { 
                title: title,
                detail: detail,
                priority_id: priority_id,
                updatedAt: new Date()
            } 
        });
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