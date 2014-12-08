Meteor.startup(function () {
    if(Setting.find({key: 'name'}).count() === 0) {
        Setting.insert({
            key:        'name',
            value:      'Checked',
            createdAt:  new Date(),
            updatedAt:  new Date()
        });
    }

    if(Setting.find({key: 'desc'}).count() === 0) {
        Setting.insert({
            key:        'desc',
            value:      'Check of the done',
            createdAt:  new Date(),
            updatedAt:  new Date()
        });
    }
});