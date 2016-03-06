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

        var contractsMap = new Object();
        var BUAddress = refContract.addressOf("BU");
        var AFKAddress = refContract.addressOf("AFK");
        var ALVAddress = refContract.addressOf("ALV");
        var LPPAddress = refContract.addressOf("LPP");
        var AVSAddress = refContract.addressOf("AVS");
        var FAKAddress = refContract.addressOf("FAK");
        contractsMap[refContract.nameOf(BUAddress)] = "BU";
        contractsMap[refContract.nameOf(AFKAddress)] = "AFK";
        contractsMap[refContract.nameOf(LPPAddress)] = "LPP";
        contractsMap[refContract.nameOf(AVSAddress)] = "AVS";
        contractsMap[refContract.nameOf(ALVAddress)] = "ALV";
        contractsMap[refContract.nameOf(FAKAddress)] = "FAK";

        var companyContract = web3.eth.contract(Constants.companyAbi).at(companyAddress);
        var transactionContract = web3.eth.contract(Constants.transactionAbi).at(transAddress);

        this.startWatchingLogs=function(callback) {
            filter.watch(callback);
        };

        this.stopWatchingLogs=function() {
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

        this.nameOf = function(address) {
            return contractsMap[refContract.nameOf(address)];
        };
    }
})(angular);
