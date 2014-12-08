Setting = new Mongo.Collection("setting");

Meteor.methods({
    updateSetting: function (name, desc) {
        Setting.update({
                key: 'name'
            }, { 
            $set: { 
                value: name,
                updatedAt: new Date()
            } 
        });
        Setting.update({
                key: 'desc'
            }, { 
            $set: { 
                value: desc,
                updatedAt: new Date()
            } 
        });
    }
});

