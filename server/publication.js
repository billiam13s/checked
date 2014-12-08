Meteor.publish("panel", function () {
    return Panel.find();
});

Meteor.publish("setting", function () {
    return Setting.find();
});

Meteor.publish("task", function () {
    // don't query 3 months and older to client
    var before = moment().subtract(3, 'months').toDate();

    return Task.find({
        $or:[{
            deletedAt: {$exists: false},
            deletedAt: null
        },{
            deletedAt: {$exists: true},
            deletedAt: {$gt: before}
        }]
    });
});