;(function (angular) {
    'use strict';

    angular
        .module('services.BlockChain', [])
        .service('blockChainService',BlockChainService);

    BlockChainService.$inject = ['$q', 'Constants'];

    function BlockChainService ($q, Constants) {

        var url = 'http://cementito.on.ether.camp:8555/sandbox/' + Constants.sandboxId;
        var web3 = new Web3(new Web3.providers.HttpProvider(url));

        web3.eth.defaultAccount = Constants.defaultAccount;

        var contract = web3.eth.contract(Constants.abi).at(Constants.companyContractAccount);

        this.executePayments = function(employeeAddress, month, year, callback) {
            var response = contract.executePayments(employeeAddress, month, year, callback);
            return response;
        };

        this.watchTransactionDone = function(callback) {
            var transEvent = contract.TransactionDone({sender: true, receiver: true, amount: true});
            // watch for changes
            transEvent.watch(callback);
        };
    }
})(angular);
