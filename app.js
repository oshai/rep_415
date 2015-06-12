Userinfo = new Mongo.Collection("userinfo");

Userinfo.allow({
    insert: function (userId, party) {
        return true;
    },
    update: function (userId, party, fields, modifier) {
        return true;
    },
    remove: function (userId, party) {
        return true;
    }
});

if (Meteor.isClient) {

    angular.module('socially', ['angular-meteor']);

    angular.module("socially").controller("PartiesListCtrl", ['$scope', '$meteor', '$rootScope', '$log',
        function ($scope, $meteor, $rootScope, $log) {

            $scope.userinfo = $scope.$meteorCollection(Userinfo).subscribe('userinfo');
            $meteor.autorun($scope, function() {
                if (null !== $rootScope.currentUser && undefined !== $rootScope.currentUser) {
                    $log.debug('user - ' + $rootScope.currentUser);
                    $scope.userForScore = $scope.$meteorObject(Userinfo, {user_id: $scope.getReactively('currentUser')._id});//$rootScope.currentUser._id
                }
            });

            $scope.userScore = function(){
                if ($scope.userForScore === undefined || $scope.userForScore.score === undefined) {
                    return 0;
                }
                return $scope.userForScore.score;
            };
            $scope.updateScore = function(){
                var score = Math.floor((Math.random() * 100) + 1);
                $scope.userinfo.save({user_id: $rootScope.currentUser._id, score: score});
            };

        }]);
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Userinfo.find().count() === 0) {
            //var parties = [
            //    {
            //        'name': 'Dubstep-Free Zone',
            //        'description': 'Fast just got faster with Nexus S.'
            //    },
            //    {
            //        'name': 'All dubstep all the time',
            //        'description': 'Get it on!'
            //    },
            //    {
            //        'name': 'Savage lounging',
            //        'description': 'Leisure suit required. And only fiercest manners.'
            //    }
            //];
            //for (var i = 0; i < parties.length; i++)
            //    Userinfo.insert(parties[i]);
        }
    });
}
