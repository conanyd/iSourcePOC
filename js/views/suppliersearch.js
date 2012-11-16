window.SearchView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"          : "change",
        "click .search"   : "search"
    },

    change:function(event){
        // Remove any existing alert message
        utils.hideAlert();
        console.log("AA");
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

    },
    search: function () {
        var self = this.model.attributes;
        console.log(self);
        var dataList = SupplierDao.getInstance().search(self.name, self.seachBy);
        $(this.el).html(this.template(this.model.toJSON()));
        for (var i = 0; i < dataList.length; i++) {
            supplier = new window.Supplier();
            supplier.defaults.name = dataList[i].name;
            supplier.defaults.address = dataList[i].addr;
            supplier.defaults.region = dataList[i].region;
            supplier.defaults.phonenumber = dataList[i].phonenumber;
            supplier.defaults._id = dataList[i].id;
            $('.thumbnails', this.el).append(new SupplierListItemView({model: supplier}).render().el);
        }
        //alert("Done");

    }

});