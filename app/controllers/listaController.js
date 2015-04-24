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

myApp.controller('ListaCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.importacoes = model;
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
            url: apiBasePath + '/api/v1/parceiro/acumulo/movimentacao',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie("token")
            }
        }

        $http(req).success(function (data, status, headers, config) {
            $.unblockUI()
            $scope.importacoes = data;
        }).error(function (data, status, headers, config) {
            $.unblockUI()
            console.log(status);
        });
    }

}]);


model = [
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
        },
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
  },
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
        },
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
]