Template.nav.events({
    "click a": function(event){
        var open = $(event.target).data('open')
        if(open)
            $('#modal').empty();

        var openDelete = function(template) {
            $('#panel-box').fadeOut(500);
            var nav = $('#side-nav a');
            var template = template;
            nav.each(function(index) {
                var each = $(this);
                if(each.hasClass('active'))
                    each.removeClass('active');
            });

            Meteor.setTimeout(function() {
                $('#panel-box').empty();
                template();
                $('#panel-box').hide();
            }, 500);
        }

        switch(open) {
            case 'createPanel':
                Blaze.render(Template.createPanelModal, $('#modal')[0]);
                $('#modal-panel-create').modal('show');
                break;

            case 'setting':
                Blaze.render(Template.settingModal, $('#modal')[0]);
                $('#modal-setting').modal('show');
                break;
            case 'deletedPanel':
                var template = function() { 
                    Blaze.render(Template.deletedPanel, $('#panel-box')[0]);
                }
                openDelete(template);
                break;
            case 'deletedTask':
                var template = function() {
                    Blaze.render(Template.deletedTask, $('#panel-box')[0]);
                }
                openDelete(template);
                break;
            default:
                break;
        }

    }
});