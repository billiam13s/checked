Meteor.subscribe("task");


Template.task.helpers({
    "listGroupColor": function() {
    var level = Priority.getLevel(this.priority_id);
    var result = "";

    if(level)
        result = "list-group-item-"+level;

    return result;
    }
})


Template.task.events({
    "click": function(event) {
        if(!$(event.target).is('input')) {
            $('#modal').empty();
            Blaze.renderWithData(Template.taskModal, this, $('#modal')[0]);
            $('#modal-task').modal('show');

        } else {
            if(event.target.checked)
                Meteor.call('deleteTask', this._id);
            else
                Meteor.call('recoverTask', this._id);
        }
    },
    "drag": function(event) {
    },
    "dragstart": function(event) {
        Session.set('dragTaskId', this._id);
    }
});


Template.taskModal.helpers({
    priorities: function () {
        return Priority.getPriorities();
    },
    priorityOptions: function() {
        var priorities = Priority.getPriorities();
        var result = "";

        for (var i = 0; i < priorities.length; i++) {
            result += "<option value=\"" + priorities[i].id + "\"";
            if(priorities[i].id == this.priority_id) 
                result += " selected";
            
            result += ">" + priorities[i].title + "</option>\n";
        };

        return Spacebars.SafeString(result);
    }
});


Template.taskModal.events({
    "hidden.bs.modal": function(event) {
        $("#modal").empty();
    },
    "submit": function(event) {
        var title    = event.target.title.value;
        var detail   = event.target.detail.value;
        var priority = event.target.priority.value;

        Meteor.call('updateTask', this._id, title, detail, priority);
        $('#modal-task').modal('hide');

        return false;
    }
});


Template.deletedTask.helpers({
    tasks: function () {
        return Task.find({
            deletedAt: {$exists: true},
            deletedAt: {$ne: null}
        }, {
            sort: {createdAt: 1}
        });
    }
});


Template.deletedTask.events({
});


Template.deletedTask.rendered = function() {
    $('#panel-box').fadeIn(800);
};


Template.deletedTaskEach.events({
    "click": function(event) {
        $('#modal').empty();
        Blaze.renderWithData(Template.deletedTaskModal, this, $('#modal')[0]);
        $('#modal-task-deleted').modal('show');
    }
})


Template.deletedTaskModal.events({
    "click .recover": function(event) {
        Meteor.call('recoverTask', this._id);
        $('#modal-task-deleted').modal('hide');

        return false;
    },
    "click .hard-delete": function(event) {
        Meteor.call('hardDeleteTask', this._id);
        $('#modal-task-deleted').modal('hide');

        return false;
    }
});
