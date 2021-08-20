(function ($) {
    "use strict";
    /*==================================================================
    [ Focus input ]
Trae un listado de elementos con la clase especificada y a cada uno le aplica una revisión de los valores para que no estén vacíos
        de estarlo le agrega la clase necesaria para mostrar los letreros de falta dato */
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100'); //Lista de elementos que tienen las clases seleccionadas.
    $('.validate-form').on('submit', function () {
        // Chequea que al hacer submit al form cumpla con no estar vacío, recorriendo la lista de elementos donde se ingresan los datos
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        return check;
    });

    $('.validate-form .input100').each(function () {
        // Cuando se está en los elementos se oculta la validación, de haber aplicado antes.
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    // validación que el campo no esté vacío siendo del tipo no email
    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    /* =======================================================
    Agregando los carteles de validación a los input */
    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);