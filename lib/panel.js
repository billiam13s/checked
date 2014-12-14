Panel = new Mongo.Collection("panel");

Meteor.methods({
    addPanel: function (title) {
        if(title.trim()) {
            Panel.insert({
                title: title,
                createdAt: new Date(),
            });
        }
    },
    updatePanel: function (panelId, title) {
        if(title.trim()) {
            Panel.update(panelId, { 
                $set: { 
                    title: title,
                    updatedAt: new Date()
                } 
            });
        }
    },
    deletePanel: function(panelId) {
        Task.update({
            panel_id: panelId
        },{
            $set: {
                deletedAt: new Date(),
                updatedAt: new Date()
            }
        });
        Panel.update(panelId, {
            $set: {
                deletedAt: new Date(),
                updatedAt: new Date()
            }
        });
    },
    recoverPanel: function(panelId) {
        Panel.update(panelId, {
            $set: {
                deletedAt: null,
                updatedAt: new Date()
            }
        });
    },
    hardDeletePanel: function(panelId) {
        Task.remove({
            panel_id: panelId
        });
        Panel.remove(panelId);
    }
});