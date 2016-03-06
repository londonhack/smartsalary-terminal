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
        var filter = web3.eth.filter("latest");

        var refContract = web3.eth.contract(Constants.nameRegAbi).at(Constants.refAddress);

        var transAddress = refContract.addressOf("Transaction");
        var companyAddress = refContract.addressOf("Company");

        var companyContract = web3.eth.contract(Constants.companyAbi).at(companyAddress);
        var transactionContract = web3.eth.contract(Constants.transactionAbi).at(transAddress);

        this.startWatchingBlockEntries=function(callback) {
            filter.watch(function(err,blockHash){
                var block = web3.eth.getBlock(blockHash, function(err,blockRes) {
                    callback(blockRes.transactions);
                });
            });
        };

        this.stopWatchingBlockEntries=function() {
            filter.stopWatching();
        };

        this.watchTransactionsDone = function(callback) {
            transactionContract.TransactionDone(callback);
        };

        this.setSalaryOf = function(employeeAddress,amount) {
            var response = companyContract.setSalaryOf(employeeAddress,amount);
            return response;
        };

        this.executePayments = function(employeeAddress, month, year, callback) {
            var response = companyContract.executePayments(employeeAddress, month, year, callback);
            return response;
        };

        this.toAscii = function(string) {
            return web3.toAscii(string);
        };

        this.nameOf = function(address) {
            return this.toAscii(refContract.nameOf(address)).replace(/[\x00]/g,"");
        };
    }
})(angular);
