/**
 * supplierdao.js defines methods related to data access object
 * (Save/Update/Delete/Get/Load/...etc) for Supplier object
 *
 * @author nnguyenngoc
 * @date 14-Nov-2012
 * @version 1.0
 */

var SupplierDao = (function() {
	var instantiated;
	function init() {
		return {
			// check if the browser supports Local Storage
			checkLocalStorage : function() {
				try {
					if (!store.enabled) {
                        console.log('Sorry! No web storage support..');
					}
				} catch(e) {
                    console.log("Unknown error "+ e +".");
					return;
				}
			},
			
			// save a supplier
			saveSupplier : function(name, region, addr, phonenumber, notes){
                var suppliers_length = 0;

                if(store.get('supplier')){
                    suppliers_length = store.get('supplier').length;
                }
                //for test
                /*if (suppliers_length >= 100){
                    suppliers_length = 0;
                    store.clear();
                }*/
                //end test

                if (name != "" && addr != ""){
                    var newSupplier = {id:suppliers_length, name:name, region:region, addr:addr, phonenumber:phonenumber, notes:notes, isDel:0};
                    store.set("supplier_" + suppliers_length.toString(), newSupplier);
                    suppliers_length += 1;
                    store.set("supplier", {length:suppliers_length});

                    //for test
                    var time0 = new Date().getTime();
                    for (var j = suppliers_length; j < (suppliers_length + 2500); j++)
                    {
                        newSupplier.name = this.randomString(6 + Math.random() * 20);
                        store.set("supplier_" + j.toString(), newSupplier);
                        store.set("supplier", {length:(j+1)});
                    }
                    //end test

                } else {
                    console.log("Invalid Supplier's name or address");
                }

                //for test
                var time1 = new Date().getTime();
                console.log("deleteList " + (time1 - time0) + "ms");
                //end test
			},
			
			//delete a supplier
			delSupplier : function(id){
                var delSupplier = store.get("supplier_" + id.toString());
                delSupplier.isDel = 1;
                store.set("supplier_" + id.toString(), delSupplier);
			},

            //update a supplier
            updateSupplier : function(id, name, region, addr, phonenumber, notes){
                var updateSupplier = store.get("supplier_" + id.toString());
                updateSupplier.name = name;
                updateSupplier.region = region;
                updateSupplier.addr = addr;
                updateSupplier.phonenumber = phonenumber;
                updateSupplier.notes = notes;
                store.set("supplier_" + id.toString(), updateSupplier);
            },
			// SELECT ALL
			selectAll : function(){
				var suppliers = [];
                var suppliers_length = 0;
                //Load the length of suppliers list
                if(store.get('supplier').length){
                    suppliers_length = store.get('supplier').length;
                }
                for (var i = 0; i < suppliers_length; i ++){
                    suppliers.push(store.get("supplier_" + i.toString()));
                }
                return suppliers;
			},

            //For test
            randomString:function(len, charSet) {
                charSet = charSet || ' abcdefghijklmnopqrstuvwxyz';
                var randomString = '';
                for (var i = 0; i < len; i++) {
                    var randomPoz = Math.floor(Math.random() * charSet.length);
                    randomString += charSet.substring(randomPoz,randomPoz+1);
                }
                return randomString;
            },
            //End test

            search:function(data, dataType){
                var searchResult = [];
                var suppliers_length = 0;

                var time0 = new Date().getTime();

                if(store.get('supplier').length){
                    suppliers_length = store.get('supplier').length;
                }
                for (var i = 0; i < suppliers_length; i ++){
                    var item = store.get("supplier_" + i.toString());
                    if(item[dataType].toUpperCase().search(data.toUpperCase()) != -1){
                        searchResult.push(item);
                    }
                }

                var time1 = new Date().getTime();
                console.log("Search time " + (time1 - time0) + "ms");


                return searchResult;
            }
		};
	}

	return {
		getInstance : function() {
			if (!instantiated) {
				instantiated = init();
			}
			return instantiated;
		}
	};
})();
