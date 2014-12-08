Template.registerHelper("name", function() {
    return Setting.findOne({
                key: 'name'
            });
});


Template.registerHelper("desc", function() {
    return Setting.findOne({
                key: 'desc'
            });
});


Template.registerHelper("formatDate", function(date) {
    return moment(date).format('YYYY-M-D H:mm');
});


Template.registerHelper("formatTaskDetail", function(detail, limit) {
    var limit = limit?limit:150;

    if(detail)
        detail = detail.replace("\n", " ");

    if(detail && detail.length > limit) {
        detail = detail.substring(0, limit);
        detail += "...";
    }
    
    return detail;
});


Template.registerHelper("panelName", function(panel_id) {
    return Panel.findOne(panel_id).title;
});


Template.registerHelper("priorityName", function(priority_id) {
    var getTitle = Priority.getTitle(priority_id);
    if(!getTitle)
        getTitle = '-';
    return getTitle;
});