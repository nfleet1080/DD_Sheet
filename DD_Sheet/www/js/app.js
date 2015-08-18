// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngStorage', 'dndFactories'])

.run(function ($ionicPlatform, DataService, $rootScope) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });


    $rootScope.baseData = {
        "abilities": {},
        "adventuringGear": {},
        "alignments": {},
        "armor": {},
        "classes": {},
        "equipmentPacks": {},
        "equipmentType": {},
        "itemCategory": {},
        "languages": {},
        "races": {},
        "skills": {},
        "tools": {},
        "weapons": {},
        "weaponProperties": {}
};
    // since we're here, let's start getting some async data so it'll be ready when we need it
    DataService.Abilities().then(function (data) {
        $rootScope.baseData.abilities.name = "Abilities";
        $rootScope.baseData.abilities.data = data.abilities;
    });
    DataService.AdventuringGear().then(function (data) {
        $rootScope.baseData.adventuringGear.name = "Adventuring Gear";
        $rootScope.baseData.adventuringGear.data = data.adventuringGear;
    });
    DataService.Alignments().then(function (data) {
        $rootScope.baseData.alignments.name = "Alignments";
        $rootScope.baseData.alignments.data = data.alignments;
    });
    DataService.Armor().then(function (data) {
        $rootScope.baseData.armor.name = "Armor";
        $rootScope.baseData.armor.data = data.armor;
    });
    DataService.Classes().then(function (data) {
        $rootScope.baseData.classes.name = "Classes";
        $rootScope.baseData.classes.data = data.classes;
    });
    DataService.EquipmentPacks().then(function (data) {
        $rootScope.baseData.equipmentPacks.name = "Equipment Packs";
        $rootScope.baseData.equipmentPacks.data = data.equipmentPacks;
    });
    DataService.EquipmentType().then(function (data) {
        $rootScope.baseData.equipmentType.name = "Equipment Types";
        $rootScope.baseData.equipmentType.data = data.equipmentType;
    });
    DataService.ItemCategory().then(function (data) {
        $rootScope.baseData.itemCategory.name = "Item Categories";
        $rootScope.baseData.itemCategory.data = data.itemCategory;
    });
    DataService.Languages().then(function (data) {
        $rootScope.baseData.languages.name = "Languages";
        $rootScope.baseData.languages.data = data.languages;
    });
    DataService.Races().then(function (data) {
        $rootScope.baseData.races.name = "Races";
        $rootScope.baseData.races.data = data.races;
    });
    DataService.Skills().then(function (data) {
        $rootScope.baseData.skills.name = "Skills";
        $rootScope.baseData.skills.data = data.skills;
    });
    DataService.Tools().then(function (data) {
        $rootScope.baseData.tools.name = "Tools";
        $rootScope.baseData.tools.data = data.tools;
    });
    DataService.Weapons().then(function (data) {
        $rootScope.baseData.weapons.name = "Weapons";
        $rootScope.baseData.weapons.data = data.weapons;
    });
    DataService.WeaponProperties().then(function (data) {
        $rootScope.baseData.weaponProperties.name = "Weapon Properties";
        $rootScope.baseData.weaponProperties.data = data.weaponProperties;
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
      })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.new', {
        url: '/new',
        views: {
            'tab-new': {
                templateUrl: 'templates/tab-new.html',
                controller: 'NewCharCtrl'
            }
        }
    })
 .state('tab.data', {
     url: '/data',
     views: {
         'tab-data': {
             templateUrl: 'templates/tab-data.html',
             controller: 'DataCtrl'
         }
     }
 })
.state('tab.generator', {
    url: '/generator',
    views: {
        'tab-new': {
            templateUrl: 'templates/new-generator.html',
            controller: 'GeneratorCtrl'
        }
    }
})
        .state('tab.abilityScores', {
            url: '/abilityScores',
            views: {
                'tab-new': {
                    templateUrl: 'templates/generator-abilityScores.html',
                    controller: 'abilityScoreCtrl'
                }
            }
        })
        .state('tab.manual', {
            url: '/manual',
            views: {
                'tab-new': {
                    templateUrl: 'templates/new-manual.html',
                    controller: 'ManualCtrl'
                }
            }
        })
        .state('tab.data-item', {
            url: '/data',
            params: { item: null },
            views: {
                'tab-data': {
                    templateUrl: 'templates/data-item.html',
                    controller: 'DataItemCtrl'
                }
            }
        })
        .state('tab.data-item-detail', {
            url: '/data/item',
            params: { item: null },
            views: {
                'tab-data': {
                    templateUrl: 'templates/data-item-detail.html',
                    controller: 'DataItemDetailCtrl'
                }
            }
        })
        .state('tab.data-item-detail-additional', {
            url: '/data/item-additional',
            params: { item: null },
            views: {
                'tab-data': {
                    templateUrl: 'templates/data-item-detail.html',
                    controller: 'DataItemDetailCtrl'
                }
            }
        })
      .state('tab.chat-detail', {
          url: '/chats/:chatId',
          views: {
              'tab-chats': {
                  templateUrl: 'templates/chat-detail.html',
                  controller: 'ChatDetailCtrl'
              }
          }
      })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

})
.directive('infoPopup', function () {
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