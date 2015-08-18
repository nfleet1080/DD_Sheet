angular.module('starter.controllers', ['dndFactories', 'ngStorage', 'ngSanitize'])

.controller('DashCtrl', function ($scope, $localStorage, $ionicLoading, $timeout, $ionicPopup) {
    $scope.reorderMode = false;
    $scope.deleteMode = false;
    // get custom characters that were saved by the user
    // Setup the loader while this is taking place
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    // hide loading
    $timeout(function () {
        $ionicLoading.hide();
        // in production, these values will be set upon creating a character
        $localStorage.userCharacters = [
            { "id": 1, "avatar": "/images/2.jpg", "name": "Mr. Fluffy", "level": 10, "class": "Destroyer of Worlds", 'lastDate': new Date() },
            { "id": 2, "avatar": "/images/4.jpg", "name": "Napoleon", "level": 7, "class": "Fighter", 'lastDate': new Date() },
            { "id": 3, "avatar": "/images/3.jpg", "name": "Mango", "level": 3, "class": "Rogue", 'lastDate': new Date() }
        ];
        $scope.$storage = $localStorage;

    }, 1000);

    // A confirm dialog
    $scope.showConfirm = function (char) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete Character',
            template: 'Are you sure you want to delete this character?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                $scope.$storage.userCharacters.splice($scope.$storage.userCharacters.indexOf(char), 1);
            } else {
                // canceled out
            }
        });
    };
})

.controller('NewCharCtrl', function ($scope, $rootScope) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.newCharacter = function () {
        $rootScope.TempCharacter = {};
    };

})
    .controller('DataCtrl', function ($scope, $rootScope,$state) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $scope.openItem = function (itemData) {
            // href="#/tab/data/{{item}}"
            $state.go('tab.data-item', { item: itemData });
        };

    })
        .controller('DataItemCtrl', function ($scope, $rootScope, $stateParams,$state) {
            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //
            //$scope.$on('$ionicView.enter', function(e) {
            //});
            $scope.dataItem = $stateParams.item;

            $scope.itemDetails = function (itemData) {
                // href="#/tab/data/{{item}}"
                $state.go('tab.data-item-detail', { item: itemData });
            };
        })
    .controller('DataItemDetailCtrl', function ($scope, $rootScope, $stateParams, DetailService, $state, $sanitize) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $scope.helper = DetailService;
        $scope.item = $stateParams.item;

        $scope.additionalDetails = function (itemData) {
            // href="#/tab/data/{{item}}"
            $state.go('tab.data-item-detail-additional', { item: itemData });
        };
    })
    .controller('GeneratorCtrl', function ($scope, $rootScope, DetailService, $state, TempUser) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $scope.helper = DetailService;

        $scope.update = function () {
            $scope.subraces = $scope.helper.getRace($scope.selectedRace.id).subrace;
            $scope.selectedSubRace = $scope.subraces[0];
        }
        // grab races and set default selection
        $scope.races = $rootScope.baseData.races.data;
        $scope.selectedRace = $scope.races[0];
        // grab subraces and set default
        $scope.update();

        // grab classes and set default
        $scope.classes = $rootScope.baseData.classes.data;
        $scope.selectedClass = $scope.classes[0];

        $scope.selectClass = function () {
            TempUser.set('RaceID', $scope.selectedRace.id);
            TempUser.set('SubRaceID', $scope.selectedSubRace.id);
            TempUser.set('ClassID', $scope.selectedClass.id);
            //$rootScope.TempCharacter.RaceID = $scope.selectedRace.id;
            //$rootScope.TempCharacter.SubRaceID = $scope.selectedSubRace.id;
            //$rootScope.TempCharacter.ClassID = $scope.selectedClass.id;

            //console.table($rootScope.TempCharacter);
            //$scope.$emit('raceChanged');
            console.info("race selected! id:" + TempUser.get('RaceID'));
            //$state.go('tab.abilityScores', {}, {
            //    reload: true,
            //    inherit: false,
            //    notify: true
            //});
        }
    })

    .controller('abilityScoreCtrl', function ($scope, $rootScope, DetailService, $filter, TempUser) {


        $scope.activePage = "roll";
        $scope.showRoll = function () {
            $scope.activePage = "roll";
        }
        $scope.showQuick = function () {
            $scope.activePage = "quick";
        }
        $scope.showVariant = function () {
            $scope.activePage = "variant";
        }
        $scope.showManual = function () {
            $scope.activePage = "manual";
        }

        $scope.$on('$ionicView.enter', function (e) {
            // always get these in case they went back and the race changed
            $scope.TempCharacter = TempUser.data();
            $scope.abilities = $scope.getAbilities();
            //console.info("abilities should now reflect new race");
        });
        $scope.roll = function () {
            // clear the existing roll results
            $scope.rollResults.length = 0

            // for each of the 6 possible scores...
            for (i = 0; i < 6; i++) {
                // Roll four 6-sided dice and record the total of the highest three dice
                var rolls = DetailService.roll(1, 6, 4);
                //rolls.push.apply(rolls, DetailService.roll(1, 6, 4)[0]);
                //for (r = 0; r < 4; r++) {
                //    rolls.push(DetailService.roll(1, 6, 1)[0]);
                //}
                // sort the array from lowest to highest
                rolls.sort(function (a, b) { return a - b });
                // remove the lowest recorded value (first index)
                rolls.splice(1, 1);

                // now that we have the three highest values, add them
                var sum = 0;
                for (var s = 0; s < rolls.length; s++) {
                    sum += rolls[s];
                }

                // finally, add this fancy value to the roll results
                $scope.rollResults.push(sum);
            }
            $scope.rollResults.sort(function (a, b) { return b - a });

        };

        // get individual racial stat bonus for a specific stat
        $scope.getStatBonus = function (id) {
            return DetailService.getStatBonus(id, TempUser.get('RaceID'), TempUser.get('SubRaceID')).bonus;
        };

        $scope.helper = DetailService;

        // for holding 4d6 roll results
        $scope.rollResults = [];

        // static scores (quick)
        $scope.staticScores = [15, 14, 13, 12, 10, 8];

        // initial 4d6 roll
        $scope.roll();

        // point buy variable
        $scope.pointBuy = {
            "points": 27,
            "str": 8,
            "dex": 8,
            "con": 8,
            "int": 8,
            "wis": 8,
            "cha": 8,
        }

        $scope.manual = {
            "str": null,
            "dex": null,
            "con": null,
            "int": null,
            "wis": null,
            "cha": null,
        }

        var pointCostValues = [
                { "point": 8, "cost": 0 },
                { "point": 9, "cost": 1 },
                { "point": 10, "cost": 2 },
                { "point": 11, "cost": 3 },
                { "point": 12, "cost": 4 },
                { "point": 13, "cost": 5 },
                { "point": 14, "cost": 7 },
                { "point": 15, "cost": 9 },
        ];
        function pointCost(point) {
            return ($filter('filter')(pointCostValues, { point: Number(point) }, true))[0].cost;
        }
        // function to calculate currently used points
        $scope.calculatePoints = function () {
            var runningTotal = $scope.pointBuy.points;
            runningTotal -= pointCost($scope.pointBuy.str);
            runningTotal -= pointCost($scope.pointBuy.dex);
            runningTotal -= pointCost($scope.pointBuy.con);
            runningTotal -= pointCost($scope.pointBuy.int);
            runningTotal -= pointCost($scope.pointBuy.wis);
            runningTotal -= pointCost($scope.pointBuy.cha);
            return runningTotal;
        }

        $scope.notEnoughPoints = function (abl) {
            // determine if there are enough points to increase
            // first figure out the number the next available number
            var valToIncrease = $scope.pointBuy[abl] + 1;
            var newcost = 0;
            var currentcost = pointCost($scope.pointBuy[abl]);
            if (valToIncrease < 16) {
                newcost = pointCost(valToIncrease);
            } else {
                return true;
            }
            // look at the current remaining points...
            var currentPoints = $scope.calculatePoints();
            if (currentPoints - (newcost - currentcost) >= 0) {
                return false;
            } else {
                return true;
            }

        };

        $scope.getAbilities = function () {
            return DetailService.getRacialStatBonuses(TempUser.get('RaceID'), TempUser.get('SubRaceID'));
        };
        $scope.abilities = $scope.getAbilities();

        $scope.moveItem = function (item, fromIndex, toIndex) {
            //Move the item in the array
            $scope.abilities.splice(fromIndex, 1);
            $scope.abilities.splice(toIndex, 0, item);
        };

        $scope.pickScores = function () {
            var abilityScore = [];
            switch ($scope.activePage) {
                case 'roll':
                    // 4d6 roll
                    for (var i = 0; i < $scope.abilities.length; i++) {
                        var tmpObject = {};
                        tmpObject[$scope.abilities[i].id] = $scope.rollResults[i];
                        abilityScore.push(tmpObject);
                    }
                    break;
                case 'quick':
                    // quick
                    for (var i = 0; i < $scope.abilities.length; i++) {
                        var tmpObject = {};
                        tmpObject[$scope.abilities[i].id] = $scope.staticScores[i];
                        abilityScore.push(tmpObject);
                    }
                    break;
                case 'variant':
                    // variant
                    abilityScore.push({ 1: $scope.pointBuy.str });
                    abilityScore.push({ 2: $scope.pointBuy.dex });
                    abilityScore.push({ 3: $scope.pointBuy.con });
                    abilityScore.push({ 4: $scope.pointBuy.int });
                    abilityScore.push({ 5: $scope.pointBuy.wis });
                    abilityScore.push({ 6: $scope.pointBuy.cha });
                    break;
                case 'manual':
                    // manual
                    abilityScore.push({ 1: $scope.manual.str });
                    abilityScore.push({ 2: $scope.manual.dex });
                    abilityScore.push({ 3: $scope.manual.con });
                    abilityScore.push({ 4: $scope.manual.int });
                    abilityScore.push({ 5: $scope.manual.wis });
                    abilityScore.push({ 6: $scope.manual.cha });
                    break;
            }
            console.info(abilityScore);
            TempUser.set('abilityScore', abilityScore);
        };

    })

        .controller('ManualCtrl', function ($scope, Chats) {
            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //
            //$scope.$on('$ionicView.enter', function(e) {
            //});


        })
.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
