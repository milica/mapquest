'use strict';

angular.module('mapQuestApp')
    .directive('modal', ['$compile', '$templateCache', '$document', function ($compile, $templateCache, $document) {
        return {
            scope: {
                handle: '&',
                handleOk: '&',
                modalShow: '=',
                message: '@',
                item: '=ngModel'
            },
            link: function (scope, element, attrs) {

                var modal;

                /**
                 * Dynamically append modal in the body tag with provided template
                 */
                var openModal = function () {

                    var template = $templateCache.get('views/partials/' + attrs.modal + '.html');

                    modal = $compile(template)(scope);
                    $document.find('body').append(modal);

                };

                /**
                 * Watch for the modal show trigger
                 */
                scope.$watch('modalShow', function(doShow) {
                    if (doShow) {
                        openModal();
                    }
                });

                /**
                 * Close modal (remove it from the DOM)
                 */
                scope.close = function () {
                    modal.remove();
                    scope.handle();
                };

                /**
                 * Close modal (remove it from the DOM)
                 */
                scope.ok = function () {
                    modal.remove();
                    scope.handleOk();
                };


            }
        };
    }]);