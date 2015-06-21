Meteor.users.allow({
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

    angular.module("socially").controller("PartiesListCtrl", ['$scope',
        function ($scope) {

            $scope.userinfo = $scope.$meteorCollection(Meteor.users);

            $scope.$meteorAutorun(function(){
                if ($scope.getReactively('currentUser'))
                    $scope.userForScore = $scope.$meteorObject(Meteor.users, {_id: $scope.getReactively('currentUser')._id}, false);
            });

            $scope.updateScore = function(){
                var score = Math.floor((Math.random() * 100) + 1);
                if (!$scope.userForScore.profile)
                    $scope.userForScore.profile = {};

                $scope.userForScore.profile.score = score;
                $scope.userForScore.save();
            };

        }]);
}
