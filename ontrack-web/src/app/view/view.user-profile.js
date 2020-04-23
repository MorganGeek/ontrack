angular.module('ot.view.user-profile', [
    'ui.router',
    'ot.service.core',
    'ot.service.form',
    'ot.service.user'
])
    .config(function ($stateProvider) {
        $stateProvider.state('user-profile', {
            url: '/user-profile',
            templateUrl: 'app/view/view.user-profile.tpl.html',
            controller: 'UserProfileCtrl'
        });
    })
    .controller('UserProfileCtrl', function ($scope, $http, ot, otFormService, otAlertService, otUserService) {
        const view = ot.view();
        view.title = "User profile";
        view.description = "Management of your profile";
        view.breadcrumbs = ot.homeBreadcrumbs();

        // Password change form
        let passwordForm = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        };

        // Loading of the user profile
        function loadUser() {
            otUserService.getUser().then(function (userResource) {
                $scope.localUser = userResource;
                if ($scope.localUser._token) {
                    ot.call($http.get($scope.localUser._token)).then(function (token) {
                        $scope.token = token;
                    });
                }
            });
        }

        loadUser();

        // Changing the token
        $scope.changeToken = () => {
            ot.pageCall($http.post($scope.localUser._changeToken)).then((tokenResponse) => {
                $scope.token = tokenResponse;
            });
        };
    })
;