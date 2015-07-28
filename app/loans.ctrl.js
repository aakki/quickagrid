(function(){
	angular
		.module('ARM')
		.controller('LoansController', LoansController);

		LoansController.$inject = ['$filter'];

		function LoansController($filter) {
			var vm = this;

			vm.pendingView = true;
			vm.showMonday = true;

		    var columnDefs = [
		        {
		            headerName: 'Pending',
		            field: '',
		            suppressSorting: true,
		            templateUrl: './app/views/pending.icons.html',
		            width: 92,
		            suppressSizeToFit: true,
		            headerCellRenderer: pendingHdr,
		            headerTooltip: 'On/Off'
		        },
		        {
		            headerName: 'Name', 
		            field: 'name', 
		            width: 180,
		            suppressSizeToFit: true,
		            cellStyle:  {'background-color': 'rgba(255, 255, 180, 0.5)'}
		        },
		        {
		            headerName: 'Monday', 
		            headerGroup: 'Weekly Editable Values',  
		            field: 'mon', 
		            newValueHandler: numberNewValueHandler, 
		            editable: true,
		            cellClass: 'text-right',
		            cellRenderer: function(params) {
		                return $filter('number')(params.data.mon, 1);
		            },
		            cellValueChanged: cellValueChangedFunction,
		            hide: !vm.showMonday
		        },
		        {
		            headerName: 'Tuesday',
		            headerGroup: 'Weekly Editable Values',
		            field: 'tue',
		            newValueHandler: numberNewValueHandler,
		            editable: true,
		            cellClass: function(params) {
		                return gtZero(params.data.tue);
		            },
		            cellRenderer: function(params) {
		                return $filter('flexCurrency')(params.data.tue, 2);
		            },
		            cellValueChanged: cellValueChangedFunction
		        },
		        {
		            headerName: 'Wednesday',
		            headerGroup: 'Weekly Editable Values',
		            field: 'wed',
		            newValueHandler: numberNewValueHandler,
		            editable: true,
		            cellClass: 'text-right',
		            cellRenderer: function(params) {
		                return $filter('number')(params.data.wed, 1);
		            },
		            cellValueChanged: cellValueChangedFunction
		        },
		        {
		            headerName: 'Thursday',
		            headerGroup: 'Weekly Editable Values',
		            field: 'thur',
		            newValueHandler: numberNewValueHandler,
		            editable: true,
		            cellClass: 'text-right',
		            cellRenderer: function(params) {
		                return $filter('number')(params.data.thur, 1);
		            },
		            cellValueChanged: cellValueChangedFunction
		        },
		        {
		            headerName: 'Friday',
		            headerGroup: 'Weekly Editable Values',
		            field: 'fri',
		            newValueHandler: numberNewValueHandler,
		            editable: true,
		            cellClass: 'text-right',
		            cellRenderer: function(params) {
		                return $filter('number')(params.data.fri, 1);
		            },
		            cellValueChanged: cellValueChangedFunction
		        },
		        {
		            headerName: 'Total',
		            headerGroup: 'Volatile Summary',
		            valueGetter: 'data.mon + data.tue + data.wed + data.thur + data.fri',
		            volatile: true,
		            cellStyle:  {'background-color': 'rgba(180, 255, 255, 0.5)'}, // light blue background
		            cellClassRules: {
		                'bold-and-red': 'x>20'
		            },
		            cellClass: 'text-right',
		            cellRenderer: function(params) {
		                return $filter('number')(params.value, 1);
		            },
		        },
		        {
		            headerName: 'Avg',
		            headerGroup: 'Volatile Summary',
		            valueGetter: '(data.mon + data.tue + data.wed + data.thur + data.fri) / 5',
		            volatile: true,
		            cellClass: 'text-right',
		            cellStyle:  {'background-color': 'rgba(180, 255, 255, 0.5)'} // light blue background
		        },
		        {
		            headerName: 'Total',
		            headerGroup: 'Hard Summary',
		            valueGetter: 'data.mon + data.tue + data.wed + data.thur + data.fri',
		            cellClass: 'text-right',
		            cellStyle:  {'background-color': 'rgba(255, 180, 255, 0.5)'}, // light red background
		            cellClassRules: {
		                'bold-and-red': 'x>20'
		            }
		        },
		        {
		            headerName: 'Avg',
		            headerGroup: 'Hard Summary',
		            valueGetter: '(data.mon + data.tue + data.wed + data.thur + data.fri) / 5',
		            cellClass: 'text-right',
		            cellStyle:  {'background-color': 'rgba(255, 180, 255, 0.5)'} // light red background
		        }
		    ];

		    var unsorted = [
		        {
		            need_vote: true,
		            has_comment: true,
		            is_stale: true,
		            is_watched: true,
		            disbursement_issue: true,
		            name: 'Katniss Everdeen',
		            mon: 9,
		            tue: 9,
		            wed: 9,
		            thur: 9,
		            fri: 4
		        },
		        {
		            need_vote: true,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: true,
		            name: 'Primrose Everdeen',
		            mon: 5, 
		            tue: 0,
		            wed: 5, 
		            thur: 5, 
		            fri: 5
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: true,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Gale Hawthorne',
		            mon: 12,
		            tue: 12,
		            wed: 12,
		            thur: 4, 
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: true,
		            is_stale: false,
		            is_watched: true,
		            disbursement_issue: false,
		            name: 'Peeta Mellark',
		            mon: 10,
		            tue: 0,
		            wed: 10,
		            thur: 10,
		            fri: 10
		        },
		        {
		            need_vote: false,
		            has_comment: true,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Haymitch Abernathy',
		            mon: 4,
		            tue: 4,
		            wed: 4,
		            thur: 4,
		            fri: 4
		        },
		        {
		            need_vote: true,
		            has_comment: true,
		            is_stale: true,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Effie Trinket',
		            mon: 10,
		            tue: 10,
		            wed: 10,
		            thur: 10,
		            fri: 10
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: true,
		            name: 'Cinna Firestarter',
		            mon: 4,
		            tue: 4,
		            wed: 4,
		            thur: 4,
		            fri: 4
		         },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: true,
		            disbursement_issue: false,
		            name: 'Plutarch Heavensbee',
		            mon: 8,
		            tue: 8,
		            wed: 8,
		            thur: 8,
		            fri: 8
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Finnick Odair',
		            mon: 9,
		            tue: 9,
		            wed: 9,
		            thur: 9,
		            fri: 4
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Beetee Latier',
		            mon: 10,
		            tue: 10,
		            wed: 10,
		            thur: 10,
		            fri: 10
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'President Alma Coin',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Rue Cleverd',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Cato Malicious',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Thresh Righteous',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Clove Nifer',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Seneca Crane',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Marvel Arroger',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Mags Mentor',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'General Boggs',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Caesar Flickerman',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        },
		        {
		            need_vote: false,
		            has_comment: false,
		            is_stale: false,
		            is_watched: false,
		            disbursement_issue: false,
		            name: 'Johanna Mason',
		            mon: 3,
		            tue: 3,
		            wed: 3,
		            thur: 3,
		            fri: 0
		        }
		    ];

		    var data = getSortedData(vm.pendingView, unsorted);

		    function pendingHdr(params) {
		        //console.log('before', params);
		        if(params.context.pending_view){
		            return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-exclamation-sign" ng-click="vm.sortPending()" style="color:#006837;"></span></div>';
		        } else {
		            return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-exclamation-sign" ng-click="vm.sortPending()" style="color:#aaaaaa;"></span></div>';
		        }
		    }

		    vm.sortPending = sortPending;

		    vm.gridOptions = {
		        angularCompileRows: true,
		        angularCompileHeaders: true,
		        //rowData: data,
		        columnDefs: columnDefs,
		        colWidth: 100,
		        groupHeaders: true,
		        rowSelection: 'single',
		        enableSorting: true,
		        sortPending: sortPending,
		        context: {
		            pending_view: vm.pendingView
		        },
		        ready: function(api) {
		            api.setRows(data);
		            api.sizeColumnsToFit();
		        }
		    };

		    vm.onHardRefresh = function() {
		        vm.gridOptions.api.refreshView();
		    };
		    //////////
		    function getSortedData(state, collection) {
		        var ds = [];
		        if(state) {
		            ds = _.sortByAll(collection, ['need_vote', 'has_comment', 'is_stale', 'is_watched', 'disbursement_issue', 'name']).reverse();
		            //console.log('true', ds);
		            return ds;
		        } else {
		            ds = _.sortByAll(collection, ['name']);
		            //console.log('false', ds);
		            return ds;
		        }
		    }
		    function sortPending() {
		        vm.gridOptions.context.pending_view = !vm.gridOptions.context.pending_view;

		        var newData = getSortedData(vm.gridOptions.context.pending_view, unsorted);
		        vm.gridOptions.api.setRows(newData);
		        vm.gridOptions.api.refreshView();
		        vm.gridOptions.api.refreshHeader();
		        vm.gridOptions.api.onNewRows()
		        return vm.gridOptions.context.pending_view;
		    }
		    function numberNewValueHandler(params) {
		        var valueAsNumber = parseInt(params.newValue);
		        if (isNaN(valueAsNumber)) {
		            window.alert("Invalid value " + params.newValue + ", must be a number");
		        } else {
		            params.data[params.colDef.field] = valueAsNumber;
		        }
		    }
		    function cellValueChangedFunction() {
		        // after a value changes, get the volatile cells to update
		        vm.gridOptions.api.softRefreshView();
		    }
		    function gtZero(value) {
		        var val = Number(value);
		        if (val <= 0) {
		            return 'text-center';
		        }
		        else {
		            return 'text-right';
		        }
		    }
		}
})();