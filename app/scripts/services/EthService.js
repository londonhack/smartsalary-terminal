;(function (angular) {
    'use strict';

    angular
        .module('services.Eth', [])
        .service('ethService');

    var abi = [
        [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "salaryOf",
                "outputs": [
                    {
                        "name": "",
                        "type": "int256"
                    }
                ],
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "employeeDelegate",
                        "type": "address"
                    },
                    {
                        "name": "month",
                        "type": "int256"
                    },
                    {
                        "name": "year",
                        "type": "int256"
                    }
                ],
                "name": "executePayments",
                "outputs": [],
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "delegate",
                        "type": "address"
                    },
                    {
                        "name": "salary",
                        "type": "int256"
                    }
                ],
                "name": "setSalaryOf",
                "outputs": [],
                "type": "function"
            }
        ]
    ];

    var sandboxId = 'abfeb5312e';
    var url = 'http://cementito.on.ether.camp:8555/sandbox/' + sandboxId;
    var web3 = new Web3(new Web3.providers.HttpProvider(url));

    web3.eth.defaultAccount = '0xdedb49385ad5b94a16f236a6890cf9e0b1e30392';

    var contract = web3.eth.contract(abi).at('0xaefa01276783e1436e5b461c099edccb0448dcf6');

    $(function() {
        $('#call').click(function(e) {
            e.preventDefault();
            console.log("call");

            var transEvent = contract.TransactionDone({sender:true,receiver:true,amount:true});

            // watch for changes
            transEvent.watch(function(error, result){
                if (!error)
                    console.log(result);
                else console.err(error);
            });

            var events = contract.allEvents();

            // watch for changes
            events.watch(function(error, event){
                if (!error)
                    console.log(event);
            });


            var response = contract.executePayments("0xdedb49385ad5b94a16f236a6890cf9e0b1e30392",2000, function (err, result) {
                if (err) return console.log(err);
            });
            console.log(response);

        });
    });
})(angular);
