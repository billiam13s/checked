Priority = {
    priority: [{
                id:     1,
                title:  'Normal',
                level:  'success'
            },{
                id:     2,
                title:  'Important',
                level:  'warning'
            },
            {
                id:     3,
                title:  'Urgent',
                level:  'danger'
            }],
    getPriorities: function() {
        return this.priority;
    },
    getLevel: function(id) {
        var result = null;
        var priority = this.priority;

        for (var i = priority.length - 1; i >= 0; i--) {
            if(priority[i].id == id)
                result = priority[i].level;
        }

        return result;
    },
    getTitle: function(id) {
        var result = null;
        var priority = this.priority;

        for (var i = priority.length - 1; i >= 0; i--) {
            if(priority[i].id == id)
                result = priority[i].title;
        }

        return result;
    }
}