var dndapp = angular.module('dndDirectives', ['ionic', 'ngStorage','dndFactories']);

dndapp.directive('infoPopup', function () {
    return {
        replace: true,
        scope: {
            title: '@',
            text: '@'
        },
        template: '<i class="icon ion-information-circled positive" ng-click="infoPopup()"></i>',
        controller: function ($scope, $element, $state, $ionicPopup) {
            $scope.infoPopup = function () {
                // get the ASI info
                var alertPopup = $ionicPopup.alert({
                    title: '<strong>' + $scope.title + '</strong>',
                    template: '<p>' + $scope.text + '</p>'
                });
                alertPopup.then(function (res) {
                    //console.log('');
                });
            };
        }
    }
});
dndapp.directive('backTab', function () {
    return {
        replace: true,
        scope: {
            text: '@'
        },
        template: '<a class="tab-item" ng-click="goBack()"><i class="icon ion-arrow-left-c"></i>{{text}}</a>',
        controller: function ($scope, $element, $ionicHistory) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            }
        },
        compile: function (element, attrs) {
            if (!attrs.text || attrs.text == "") {
                attrs.text = "Go Back";
            }
        }
    }
});
dndapp.directive('generatorCancelTab', function () {
    return {
        replace: true,
        scope: true,
        template: '<a class="tab-item assertive" ng-click="cancel()"><i class="icon ion-close-circled"></i>Cancel</a>',
        controller: function ($scope, $element, $state, $ionicPopup) {
            $scope.cancel = function () {
                var myPopup = $ionicPopup.show({
                    //template: '<input type="password" ng-model="data.wifi">',
                    title: 'Cancel',
                    subTitle: 'Are you sure? You will have to start over!',
                    scope: $scope,
                    buttons: [
                      { text: 'Stay' },
                      {
                          text: 'Leave',
                          type: 'button-assertive',
                          onTap: function (e) {
                              $state.go('app.home');
                          }
                      }
                    ]
                });
                myPopup.then(function (res) {
                    //console.log('Tapped!', res);
                });
            }
        }
    }
});