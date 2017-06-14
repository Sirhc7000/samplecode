chris.page.initializeValidation = function () {

            jQuery.validator.setDefaults({
                ignore: [],
                debug: true
            });

            $('#formData').validate({
                highlight: function(element) {
                    $(element).addClass("form-validate");
                },
                unhighlight: function(element) {
                    $(element).removeClass("form-validate");
                },
                errorPlacement: function(label, element){
                    element.parent().append(label);
                },
                errorClass: "error-msg",
                errorElement: "span",

                rules: {
                    "projectName": {
                        required: true
                        , maxlength: 50
                    },

                    "description": {
                        required: function()
                        {
                            CKEDITOR.instances.description.updateElement();
                        },
                        maxlength: 3000
                    },
                   
                },

                messages: {
                    "projectName": {
                        required: "Please enter a name for your project.",
                    },
                    "description": {
                        required: "Please enter a description for your project.",
                    },
                }


            });

        }

        chris.page.handlers.submitForm = function () {

            if ($("#formData").valid()) {
                //CKEDITOR.instances.description.updateElement();
                var data = $("#formData").serialize();

                if (id) {
                    var data = data + "&id=" + id;

                    chris.services.project.put(id, data, chris.page.handlers.putSuccess, chris.page.onError);


                } else {

                    chris.services.project.post(data, chris.page.handlers.postSuccess, chris.page.onError)
                }
            }

        }