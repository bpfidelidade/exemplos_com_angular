var myApp = angular.module('bpfApp', []);
var apiBasePath = "https://dev.bpfidelidade.com.br";

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    } 
    return query_string;
} ();

myApp.controller('DetalheCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.importacao = model;
    $scope.detalhes = model.detalhes;
    console.log($scope.importacao)
    getResultsPage();

    function getResultsPage() {
        $.blockUI({
            message: "Processando...",
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff',
                "z-index": "10000"
            }
        });
        var req = {
            method: 'get',
            url: apiBasePath + '/api/v1/parceiro/acumulo/detalhe/' + QueryString.controle,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie("token")
            }
        }

        $http(req).success(function (data, status, headers, config) {
            $.unblockUI()
            $scope.importacao = data;
            $scope.detalhes = $scope.importacao[0].detalhes;
        }).error(function (data, status, headers, config) {
            $.unblockUI()
            console.log(status);
        });
    }

}]);


model = 
  {
      "controle_transacao": "sample string 1",
      "data_movimentacao": "24/04/2015 10:21:55",
      "pontos": 3,
      "fator_conversão": 4.1,
      "totalizador": 5,
      "detalhes": [
        {
            "cpf": "sample string 1",
            "data_movimento": "24/04/2015 10:21:55",
            "data_expiracao": "24/04/2015 10:21:55",
            "pontos": 4,
            "conta": {
                "nome": "sample string 1",
                "sobrenome": "sample string 2",
                "cpf": "sample string 3",
                "email": "sample string 4",
                "endereco": {
                    "logradouro": "sample string 1",
                    "numero": "sample string 2",
                    "complemento": "sample string 3",
                    "bairro": "sample string 4",
                    "cidade": "sample string 5",
                    "uf": "sample string 6",
                    "cep": "sample string 7"
                }
            },
            "ponto_creditado": true
        }
      ]
  }