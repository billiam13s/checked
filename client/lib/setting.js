Meteor.subscribe("setting");


Template.settingModal.events({
    "hidden.bs.modal": function(event) {
        $("#modal").empty();
    },
    "submit": function(event) {
        var name = event.target.name.value;
        var desc = event.target.desc.value;

        Meteor.call('updateSetting', name, desc);
        $('#modal-setting').modal('hide');

        return false;
    }
});