window.SupplierListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        //var suppliers = this.model.models;
        //var len = suppliers.length;

        var dataList = SupplierDao.getInstance().selectAll();
        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = 0; i < dataList.length; i++) {
            supplier = new window.Supplier();
            supplier.defaults.name = dataList[i].name;
            supplier.defaults.address = dataList[i].addr;
            supplier.defaults.region = dataList[i].region;
            supplier.defaults.phonenumber = dataList[i].phonenumber;
            supplier.defaults._id = dataList[i].id;
            $('.thumbnails', this.el).append(new SupplierListItemView({model: supplier}).render().el);
        }

        //$(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.SupplierListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});