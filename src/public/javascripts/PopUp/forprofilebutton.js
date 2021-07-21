$(document).ready(function () {

    // ANIMATEDLY DISPLAY THE NOTIFICATION COUNTER.

    $('#noti_Button_2').click(function () {

        // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
        $('#notifications2').fadeToggle('fast', 'linear', function () {
            if ($('#notifications2').is(':hidden')) {
                $('#noti_Button_2').css('background-color', '');
            }
            // CHANGE BACKGROUND COLOR OF THE BUTTON.
            else $('#noti_Button');
        });

        $('#noti_Counter').fadeOut('fast');// HIDE THE COUNTER.

        return false;
    });

    // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
    $(document).click(function () {
        $('#notifications2').hide();

        // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
        if ($('#noti_Counter').is(':hidden')) {
            // CHANGE BACKGROUND COLOR OF THE BUTTON.
            $('#noti_Button_2').css('background-color', '#2E467C');
        }
    });

});