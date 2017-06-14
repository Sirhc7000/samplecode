function _openModal () {
                    var modalInstance = vm.$uibModal.open({
                        animation: true,
                        templateUrl: 'modalContent.html', // targets template
                        controller: 'modalController as mc', // controller for modal
                        size: 'sm',
                        resolve: {
                            project: function () {
                                return vm.item;
                            }
                        }
                    });

                    modalInstance.result.then(function (projectPerson) {
                        console.log(projectPerson);
                        if(projectPerson){
                            vm.projectsService.getById(vm.id, _getSuccessRefresh, _getErrorRefresh);

                            function _getSuccessRefresh(data) {
                                vm.$scope.$apply(function () {
                                    vm.item = data.item;
                                    for (var i = 0; i < vm.item.staff.length; i++) {
                                        vm.item.staff[i].personId = vm.item.staff[i].person.id;
                                        vm.item.staff[i].projectId = vm.item.id;

                                    }

                                });
                                vm.$alertService.success("Member Added.")
                            }

                            function _getErrorRefresh(jqXHR) {
                                console.log("Something happened.")
                                console.log(jqXHR);
                            }

                        }
                    }, function () {

                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };