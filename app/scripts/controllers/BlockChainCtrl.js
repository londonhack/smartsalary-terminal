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
                console.log("Payment done");
                $scope.processing = false;
            });
        };

        var _this = this;
        blockChainService.watchTransactionsDone(function(error,event) {
            $scope.$apply(function() {
                event.receiver = _this.resolveName(event.args.receiver);
                event.sender = _this.resolveName(event.args.sender);
                $scope.logs.push(event);
                console.log(event);
            });
        });

        this.resolveName = function(address){
            if (address==Constants.users[1].address) return "Elliot Fu";
            else if (address==Constants.users[0].address) return "Daniel Louise";
            else {
                var name = blockChainService.nameOf(address);
                return name;
            }
            return null;
        };


    }

})(angular);