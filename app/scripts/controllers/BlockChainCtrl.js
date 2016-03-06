;(function (angular) {
    'use strict';

    angular
        .module('controllers.BlockChain', [])
        .controller('BlockChainCtrl', BlockChainCtrl);

    BlockChainCtrl.$inject = ["blockChainService","$scope","Constants"];

    function BlockChainCtrl (blockChainService,$scope,Constants) {

        $scope.processing=false;

        $scope.logs=new Array();

        //init salary
        blockChainService.setSalaryOf(Constants.users[1].address,1000000);


        $scope.executePayment = function() {

            $scope.processing=true;

            //we do nth with the time period yet
            blockChainService.executePayments(Constants.users[1].address,2,2016, function(err,results) {
                $scope.processing = false;
            });
        };

        var _this = this;
        blockChainService.watchTransactionsDone(function(error,event) {
            $scope.$apply(function() {
                event.receiver = _this.resolveName(event.args.receiver);
                event.sender = _this.resolveName(event.args.sender);
                event.amount = parseInt(event.args.amount)/100;
                event.accepted=false;
                $scope.logs.push(event);
            });
        });

        blockChainService.startWatchingBlockEntries(function(transactions){
            var newValues=new Array();
            angular.forEach($scope.logs,function(value,key){
                if (transactions.indexOf(value.transactionHash)) {
                    value.accepted=true;
                }
                newValues.push(value);
            });
            $scope.$apply(function() {
                $scope.logs = newValues;
            });
        });

        this.resolveName = function(address){
            if (address==Constants.users[1].address) return "Molly";
            else if (address==Constants.users[0].address) return "Matthew";
            else {
                var name = blockChainService.nameOf(address);
                return name;
            }
            return address;
        };


        $scope.clear = function(){
            $scope.logs = new Array();
        }
    }

})(angular);
