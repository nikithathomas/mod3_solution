(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var narrowIt=this;
		narrowIt.getMatchedMenuItems=function(searchTerm){
			MenuSearchService.getMatchedMenuItems(searchTerm);
		};
		narrowIt.found=MenuSearchService.getFoundItems();
	}


	MenuSearchService.$inject = ['$http', 'ApiBasePath']
	function MenuSearchService($http, ApiBasePath) {
		var service = this;
		var arr=[];
		var foundItems=[];
		service.getMatchedMenuItems = function (searchTerm) {

			$http({method: "GET",url: (ApiBasePath + "/menu_items.json")}).then(function (response) {
				// process result and only keep items that match
				// return processed items
				var i=0;
				arr=response.data.menu_items;
				for(i=0;i<arr.length;i++){
					if(arr[i].description==searchTerm){
						foundItems[i]=arr[i];
					}
				}
				return foundItems;
			});
		};
		service.getFoundItems=function(){
			return foundItems;
		};
	}

})();