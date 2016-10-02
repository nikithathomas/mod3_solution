(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('listItem', ListItem);


function ListItem() {
  var ddo = {
    templateUrl: 'itemsloaderindicator.template.html',
		scope: {
      items: '<',
			onRemove: '&'
    },
		controller: NarrowItDownController,
		controllerAs: 'narrowIt',
		bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var narrowIt=this;
		narrowIt.getMatchedMenuItems=function(searchTerm){
			narrowIt.errorMsg="";
if(searchTerm!="" && searchTerm!=undefined){
	var promise=MenuSearchService.getMatchedMenuItems(searchTerm);
	promise.then(function (foundItems) {
			if(foundItems.length!=0){
	 narrowIt.items= foundItems;
	 }
	 else {
	 	narrowIt.errorMsg="Nothing found";
	 }
	})
}
else
 	narrowIt.errorMsg="Nothing found";
	};

	narrowIt.removeItem = function (itemIndex) {
 MenuSearchService.removeItem(itemIndex);
};
}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
	var service = this;
	var arr=[];
	var foundItems=[];
	service.getMatchedMenuItems = function (searchTerm) {

		return $http({method: "GET",url: (ApiBasePath + "/menu_items.json")}).then(function (response) {
			// process result and only keep items that match
			// return processed items
			var i=0;
			arr=response.data.menu_items;
			for(i=0;i<arr.length;i++){
				if(arr[i].description==searchTerm){
					foundItems.push(arr[i]);
				}
			}
			return foundItems;
		});
	};

	service.removeItem = function (itemIndex) {
	foundItems.splice(itemIndex, 1);
};
}

})();
