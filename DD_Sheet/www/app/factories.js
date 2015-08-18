var dndapp = angular.module('dndFactories', ['ionic', 'ngStorage']);

dndapp.factory('DetailService', function ($filter, $rootScope) {
    // quick way to return all details of a chosen race
    return {
        isUndefinedOrNull: function(obj, alt) {
            if (!angular.isDefined(obj) || obj === null) {
                // empty
                return alt;
            } else {
                return obj;
            }
        },
        roll: function (min, max, count) {
            if (!count) {
                count = 1;
            }
            var r = [];
            for (var i = 0; i < count; i++) {
                r.push(Math.floor(Math.random() * (max - min + 1) + min));
            }
            return r;
        },
        getRacialStatBonuses: function (raceID, subRaceID) {
            var Abilities = [];
            for (var i = 0; i < $rootScope.baseData.abilities.data.length; i++) {
                // get default abilities
                var currentAbility = $rootScope.baseData.abilities.data[i];
                Abilities.push({ "id": currentAbility.id, "name": currentAbility.name, "bonus": 0 });
            }
            // get the race bonuses
            var race = this.getRace(raceID);
            for (var r = 0; r < race.ASI.length; r++) {
                var raceAbility = race.ASI[r];
                for (var a = 0; a < Abilities.length; a++) {
                    if (raceAbility.id == Abilities[a].id) {
                        Abilities[a].bonus += raceAbility.bonus;
                    }
                }
            }
            // get the subrace bonuses
            var subrace = this.getSubRace(raceID, subRaceID);
            for (var r = 0; r < subrace.ASI.length; r++) {
                var raceAbility = subrace.ASI[r];
                for (var a = 0; a < Abilities.length; a++) {
                    if (raceAbility.id == Abilities[a].id) {
                        Abilities[a].bonus += raceAbility.bonus;
                    }
                }
            }

            return Abilities;
        },
        getStatBonus: function (abilityID, raceID, subRaceID) {
            var Abilities = this.getRacialStatBonuses(raceID, subRaceID);
            return ($filter('filter')(Abilities, { id: Number(abilityID) }, true))[0];
        },
        getLanguage: function (languageID) {
            return ($filter('filter')($rootScope.baseData.languages.data, { id: Number(languageID) }, true))[0];
        },
        getRace: function (raceID) {
            return ($filter('filter')($rootScope.baseData.races.data, { id: Number(raceID) }, true))[0];
        },
        getAlignment: function (alignmentID) {
            return ($filter('filter')($rootScope.baseData.alignments.data, { id: Number(alignmentID) }, true))[0];
        },
        getSubRace: function (raceID, subRaceID) {
            var race = this.getRace(raceID);
            return ($filter('filter')(race.subrace, { id: Number(subRaceID) }, true))[0];
        },
        getAbility: function (abilityID) {
            return ($filter('filter')($rootScope.baseData.abilities.data, { id: Number(abilityID) }, true))[0];
        },
        getSkill: function (skillID) {
            return ($filter('filter')($rootScope.baseData.skills.data, { id: Number(skillID) }, true))[0];
        },
        getClass: function (classID) {
            return ($filter('filter')($rootScope.baseData.classes.data, { id: Number(classID) }, true))[0];
        },
        getEquipmentType: function (typeID) {
            return ($filter('filter')($rootScope.baseData.equipmentType.data, { id: Number(typeID) }, true))[0];
        },
        getArmor: function (armorID) {
            return ($filter('filter')($rootScope.baseData.armor.data, { id: Number(armorID) }, true))[0];
        },
        getWeapon: function (weaponID) {
            return ($filter('filter')($rootScope.baseData.weapons.data, { id: Number(weaponID) }, true))[0];
        },
        getWeaponProperty: function (propertyID) {
            return ($filter('filter')($rootScope.baseData.weaponProperties.data, { id: Number(propertyID) }, true))[0];
        },
        getTool: function (toolID) {
            return ($filter('filter')($rootScope.baseData.tools.data, { id: Number(toolID) }, true))[0];
        },
        getGear: function (gearID) {
            return ($filter('filter')($rootScope.baseData.adventuringGear.data, { id: Number(gearID) }, true))[0];
        },
        getPack: function (packID) {
            return ($filter('filter')($rootScope.baseData.equipmentPacks.data, { id: Number(packID) }, true))[0];
        },
        getCategory: function (categoryID) {
            return ($filter('filter')($rootScope.baseData.itemCategory.data, { id: Number(categoryID) }, true))[0];
        },
        formatMoney: function (copperAmount) {
            /*
            Coin            cp      sp      ep      gp      pp
            Copper (cp)     1       1/10    1/50    1/100   1/1,000
            Silver (sp)     10      1       1/5     1/10    1/100
            Electrum (ep)   50      5       1       1/2     1/20
            Gold (gp)       100     10      2       1       1/10
            Platinum (pp)   1,000   100     20      10      1
            */

            // excluding uncommon/unusual coin (pp and ep)
            if (!isNaN(parseFloat(copperAmount))) {
                // determine the Gold amount
                equ = copperAmount / 100;
                var gp = Math.floor(equ);
                remainder = Math.round((equ % 1) * 100);

                //console.log("equ=" + equ);
                //console.log("current remainder : " + remainder);

                // determine the Silver & Copper amount
                equ = remainder / 10;
                var sp = Math.floor(equ);
                var cp = Math.round((equ % 1) * 10);

                return (gp > 0 ? $filter('number')(gp) + " gp " : "") + (sp > 0 ? $filter('number')(sp) + " sp " : "") + (cp > 0 ? $filter('number')(cp) + " cp " : "").trim();
            }
        },
        convertHeight: function (inches) {
            var feet = Math.floor(inches / 12);
            inches %= 12;
            return feet + "'" + inches + '"';
        },
        generateName: function (raceID, sex) {
            var nameData = this.getRace(raceID).names;
            var firstName, lastName = nameData.last[this.roll(1, nameData.last.length, 1) - 1];

            switch (sex) {
                case 'Male':
                    firstName = nameData.male[this.roll(1, nameData.male.length, 1) - 1];
                    break;
                case 'Female':
                    firstName = nameData.female[this.roll(1, nameData.female.length, 1) - 1];
                    break;
            }

            return firstName + ' ' + lastName;
        },
    }
});
dndapp.factory('DataService', function ($http, $q, $log) {
    return {
        Languages: function () {
            return $http.get('/data/languages.json')
            .then(
              function (response) {
                  return {
                      languages: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        Races: function () {
            return $http.get('/data/races.json').then(
              function (response) {
                  return {
                      races: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        Abilities: function () {
            // formerly AbilityScores
            return $http.get('/data/abilities.json').then(
              function (response) {
                  return {
                      abilities: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        Alignments: function () {
            return $http.get('/data/alignments.json').then(
              function (response) {
                  return {
                      alignments: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        Skills: function () {
            return $http.get('/data/skills.json').then(
              function (response) {
                  return {
                      skills: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        Classes: function () {
            return $http.get('/data/classes.json').then(
              function (response) {
                  return {
                      classes: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        EquipmentType: function () {
            return $http.get('/data/equipmentType.json').then(
              function (response) {
                  return {
                      equipmentType: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        Armor: function () {
            return $http.get('/data/armor.json').then(
              function (response) {
                  return {
                      armor: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        Weapons: function () {
            return $http.get('/data/weapons.json').then(
              function (response) {
                  return {
                      weapons: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        }, WeaponProperties: function () {
            return $http.get('/data/weaponProperties.json').then(
              function (response) {
                  return {
                      weaponProperties: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        ItemCategory: function () {
            return $http.get('/data/itemCategory.json').then(
              function (response) {
                  return {
                      itemCategory: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        Tools: function () {
            return $http.get('/data/tools.json').then(
              function (response) {
                  return {
                      tools: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        AdventuringGear: function () {
            return $http.get('/data/adventuringGear.json').then(
              function (response) {
                  return {
                      adventuringGear: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        EquipmentPacks: function () {
            return $http.get('/data/equipmentPacks.json').then(
              function (response) {
                  return {
                      equipmentPacks: response.data
                  };
              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + " : " +
                        httpError.data;
              });
        },
        DivineDomains: function () {
            return [
                {
                    "id": 1,
                    "name": "Knowledge",
                    "desc": "The gods of knowledge—including Oghma, Boccob, Gilean, Aureon, and Thoth—value learning and understanding above all. Some teach that knowledge is to be gathered and shared in libraries and universities, or promote the practical knowledge of craft and invention. Some deities hoard knowledge and keep its secrets to themselves. And some promise their followers that they will gain tremendous power if they unlock the secrets of the multiverse. Followers of these gods study esoteric lore, collect old tomes, delve into the secret places of the earth, and learn all they can. Some gods of knowledge promote the practical knowledge of craft and invention, including smith deities like Gond, Reorx, Onatar, Moradin, Hephaestus, and Goibhniu.",
                    "spells": [
                        { "level": 1, "spells": ["command", "identify"] },
                        { "level": 3, "spells": ["augury", "suggestion"] },
                        { "level": 5, "spells": ["nondetection", "speak with dead"] },
                        { "level": 7, "spells": ["arcane eye", "confusion"] },
                        { "level": 9, "spells": ["legend lore", "scrying"] },
                    ],
                    "traits": [
                        { "level": 1, "name": "Blessings of Knowledge", "desc": "At 1st level, you learn two languages of your choice. You also become proficient in your choice of two of the following skills: Arcana, History, Nature, or Religion. Your proficiency bonus is doubled for any ability check you make that uses either of those skills." },
                    ],
                },
                { "id": 2, "name": "Life" },
                { "id": 3, "name": "Light" },
                { "id": 4, "name": "Nature" },
                { "id": 5, "name": "Tempest" },
                { "id": 6, "name": "Trickery" },
                { "id": 7, "name": "War" },
            ];
        },
        Dieties: function () {
            return [
                {
                    "id": 1,
                    "pantheon": "The Forgotten Realms",
                    "name": "",
                    "Alignment": "",
                    "SuggestedDomains": [],
                    "Symbol": "",
                },
            ];
        },
    }
});
dndapp.factory('TempUser', function ($localStorage) {

    var char = {};

    return {
        data: function () {
            return char;
        },
        reset: function () {
            char = {};
        },
        get: function (key) {
            return char[key];
        },
        remove: function (key) {
            delete char[key];
        },
        set: function (key, value) {
            char[key] = value;
        },
        store: function () {
            $localStorage.userCharacters.push.apply($localStorage.characters, char);
        }
    };
});