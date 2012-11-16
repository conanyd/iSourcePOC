var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "suppliers"	: "listSuppliers",
        "suppliers/list"	: "listSuppliers",
        "suppliers/new"         : "addSupplier",
        "suppliers/search"         : "searchSupplier",
        "suppliers/:id"         : "supplierDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    listSuppliers: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var supplierList = new SupplierCollection();
        //supplierList.fetch({success: function(){
            $("#content").html(new SupplierListView({model: supplierList, page: p}).el);
        //}});
        this.headerView.selectMenuItem();
    },

    supplierDetails: function (id) {
        console.log("supplierDetails");
        var supplier = new Supplier({_id: id});
        console.log(supplier);
        //supplier.fetch({success: function(){
            $("#content").html(new SupplierView({model: supplier}).el);
        //}});
        this.headerView.selectMenuItem();
    },

	addSupplier: function() {
        var supplier = new Supplier();
        $('#content').html(new SupplierView({model: supplier}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    searchSupplier: function() {
        var supplier = new SearchSupplier();
        $('#content').html(new SearchView({model: supplier}).el);
        this.headerView.selectMenuItem('');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'SupplierView', 'SupplierListItemView', 'AboutView', 'SearchView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});