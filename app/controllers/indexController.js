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

myApp.controller('IndexCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.username = "";
    $scope.password = "";

    $scope.submit = function () {
        var params = $.param({
            grant_type: "password",
            username: $scope.username,
            password: $scope.password,
            user_type: 1
        })
        var req = {
            method: 'POST',
            url: apiBasePath + '/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            data: params
        }
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
        $http(req).success(function (data, status, headers, config) {
            $.unblockUI()
            console.log(data);
            setCookie('token', data["token_type"] + " " + data["access_token"], 100000);
            console.log(getCookie('token'));
            location.href = location.href + "/lista.html"
        }).error(function (data, status, headers, config) {
            $.unblockUI()
            console.log(status);
        });
    }

    function getResultsPage(pageNumber, modalidade) {
        var req = {
            method: 'POST',
            url: apiBasePath + '/api/produtos',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                modalidade: modalidade ? modalidade : $scope.modalidade,
                pageIndex: $scope.currentPage,
                viagem: $scope.viagem,
                search: $scope.search,
                pId: $scope.parceiro.id,
                pageSize: $scope.pageSize
            }
        }

        $http(req).success(function (data, status, headers, config) {
            bpf.ui.unblock();
            $scope.produtos = data.list;
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    }

}]);