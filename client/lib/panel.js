Meteor.subscribe("panel");


Template.body.helpers({
    panels: function () {
        return Panel.find({
            deletedAt: {$exists: false},
            deletedAt: null
        }, {
            sort: {createdAt: 1}
        });
    }
});


Template.body.rendered = function() {
    Meteor.setTimeout(function() {
        first = $('#side-nav a').first().click();
    }, 1000);
};


Template.listGroup.helpers({
    countTask: function () {
        return Task.find({
            panel_id: this._id,
            deletedAt: {$exists: false},
            deletedAt: null
        }).count();
    }
});


Template.listGroup.events({
    "click": function(event){
        $('#panel-box').fadeOut(500);
        var nav = $('#side-nav a');
        nav.each(function(index) {
            var each = $(this);
            if(each.hasClass('active'))
                each.removeClass('active');
        });
        $(event.target).addClass('active');
        var id = this._id;
        
        Meteor.setTimeout(function() {
            Session.set('currentPanel', id);
            $('#panel-box').empty();
            Blaze.render(Template.panel, $('#panel-box')[0]);
            $('#panel-box').hide();
        }, 500);
    },
    "drop": function(event) {
        taskId = Session.get('dragTaskId');
        if(taskId) {
            Session.set('dragTaskId', null);
            Meteor.call('updateTaskPanel', taskId, this._id);
        }
        event.preventDefault();
    },
    "dragover": function(event) {
        event.preventDefault();
    }
});


Template.panel.helpers({
    getPanel: function() {
        var id = Session.get('currentPanel');
        return Panel.findOne(id);
    }
});


Template.panelEach.helpers({
    tasks: function () {
        // don't query 7 days and older to client
        var before = moment().subtract(7, 'days').toDate();

        return Task.find({
            panel_id: this._id,
            $or:[{
                deletedAt: {$exists: false},
                deletedAt: null
            },{
                deletedAt: {$exists: true},
                deletedAt: {$gt: before}
            }]
        }, {
            sort: {
                priority_id: -1,
                createdAt: 1
            }
        });
    }
});


Template.panelEach.events({
    "click .edit-panel": function(event){
        $('#modal').empty();
        Blaze.renderWithData(Template.editPanelModal, this, $('#modal')[0]);
        $('#modal-panel-edit').modal('show');

    },
    "submit": function(event) {
        var title = event.target.title.value;
        Meteor.call('addTask', title, this._id);
        event.target.title.value = "";

        return false;
    }
});


Template.panelEach.rendered = function() {
    $('#panel-box').fadeIn(800);
};


Template.createPanelModal.events({
    "hidden.bs.modal": function(event) {
        $("#modal").empty();
    },
    "submit": function(event) {
        var title = event.target.title.value;

        Meteor.call('addPanel', title);
        $('#modal-panel-create').modal('hide');

        return false;
    },
});


Template.editPanelModal.events({
    "hidden.bs.modal": function(event) {
        $("#modal").empty();
    },
    "submit": function(event) {
        var title = event.target.title.value;;
        Meteor.call('updatePanel', this._id, title);
        $('#modal-panel-edit').modal('hide');

        return false;
    },
    "click .delete": function(event) {
        $('#panel-box').fadeOut(500);
        Meteor.call('deletePanel', this._id);
        $('#modal-panel-edit').modal('hide');

        Meteor.setTimeout(function() {
            // Session.set('currentPanel', id);
            $('#panel-box').empty();
        }, 500);

        return false;
    }
});


Template.deletedPanel.helpers({
    panels: function () {
        return Panel.find({
            deletedAt: {$exists: true},
            deletedAt: {$ne: null}
        }, {
            sort: {createdAt: 1}
        });
    }
});


Template.deletedPanel.events({
});


Template.deletedPanel.rendered = function() {
    $('#panel-box').fadeIn(800);
};


Template.deletedPanelEach.events({
    "click": function(event) {
        $('#modal').empty();
        Blaze.renderWithData(Template.deletedPanelModal, this, $('#modal')[0]);
        $('#modal-panel-deleted').modal('show');
    }
})


Template.deletedPanelEach.helpers({
    countTask: function () {
        return Task.find({
            panel_id: this._id
        }).count();
    }
});


Template.deletedPanelModal.events({
    "click .recover": function(event) {
        Meteor.call('recoverPanel', this._id);
        $('#modal-panel-deleted').modal('hide');

        return false;
    },
    "click .hard-delete": function(event) {
        Meteor.call('hardDeletePanel', this._id);
        $('#modal-panel-deleted').modal('hide');

        return false;
    }
});
