$(document).ready(function () {
    $('#birthdate').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true
    });

    $("#phone").mask("(999) 999-9999");

    $('#userForm').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            surname: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
            },
            birthdate: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Name is required",
                minlength: "Name must be at least 2 characters"
            },
            surname: {
                required: "Surname is required",
                minlength: "Surname must be at least 2 characters"
            },
            email: {
                required: "Email is required",
                email: "Please enter a valid email address"
            },
            phone: {
                required: "Phone number is required"
            },
            birthdate: {
                required: "Birthdate is required"
            }
        },
        submitHandler: (form) => {
            successMessage();
            $('#userForm').fadeOut();
            form.reset();
        },
        errorClass: "error",
        validClass: "valid",
        errorPlacement: (error, element) => {
            error.insertAfter(element);
        }
    });

    $('#applyButton').on('click', () => {
        $('#userForm').fadeIn(1000).css('display', 'flex');
    });

    $('#cancelButton').on('click', () => {
        $('#userForm')[0].reset();
        $('#userForm').validate().resetForm();
        $('#birthdate').datepicker("hide");
        $('#userForm').fadeOut(1000);
    });

    const successMessage = () => {
        successHtml();
        successCss();
        $('.success-message').fadeIn(1000);
        setTimeout(() => {
            $('.success-message').fadeOut(1000, () => {
                $('.success-message').remove();
            });
        }, 3000);
    }

    const successHtml = () => {
        const message = `
            <div class="success-message">
                <h2>Success</h2>
                <p>Form submitted successfully.</p>
            </div>
        `;
        $('body').append(message);
    }

    const successCss = () => {
        $('.success-message').css({
            'position': 'fixed',
            'top': '5%',
            'left': '42%',
            'background-color': 'green',
            'color': 'white',
            'padding': '10px',
            'border-radius': '5px',
            'z-index': '9999',
            'text-align': 'center',
            'display': 'none'
        });
    }
});