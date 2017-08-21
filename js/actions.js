$(document).ready(function(){
    /*=============================================
    =            LOGIN            =
    =============================================*/
    $("#submit_login").on("click", function(){
        $("#error-login").empty();
        if (!$("#user_name").val() || !$("#password").val()){
            cleanInputs("-Alguno de los campos se encuentra vacío-");
        }else{
            params= {};
            params.action = "getUser";
            params.username = $('#user_name').val();
            params.password = $('#password').val();

            $.ajax({
                url: "http://www.blinkapp.com.ar/blink_webapp/admin/log_in.php",
                //url: "admin/log_in.php",
                type: "POST",
                data: params,
                cache: false,
                dataType: "json"
            }).done(function( user ) {
                console.log(user)
                // console.log(user);
                // if (user.userID == 0){
                //     cleanInputs("-Revise los datos ingresados-");
                // }else{
                // }
                cleanInputs(user.username);

                // localStorage.setItem("username", data.username);
                // localStorage.setItem("password", data.password);
                // localStorage.setItem("mail", data.mail);
                // localStorage.setItem("id", data.userID);
                // localStorage.setItem("phoneNumber", data.phoneNumber);
                //window.location.href = 'http://www.google.com';
                // $('#page-1').fadeOut(200, function(){
                //     $('#page-2').fadeIn("slow");
                //     $('#username-show').text(localStorage.getItem("username"));
                // });
            }).error(function(error, textStatus){
                console.log(error);
            });
        }
    });
    
    function cleanInputs(text){
        $("#user_name").focus();
        $("#user_name").val("");
        $("#password").val("");
        $("#error-login").fadeIn("slow");
        $("#error-login").append(text);
        setTimeout(function(){
            $("#error-login").fadeOut("slow");
        }, 2500);
    }

    $("#submit_signin").on("click", function(){
        $('#page-1').fadeOut(200, function(){
            $('#page-2').fadeIn("slow");
        })
    });

    $('#register-click').on("click", function(){
        console.log("hola")
        $('#page-1').fadeOut(200, function(){
            $('#page-sign-in').fadeIn("slow");
        })
    });

    $("#volver").on("click", function(){
        $('#page-sign-in').fadeOut(200, function(){
            $('#page-1').fadeIn("slow");
        })
    });    
    
    
    /*=====  End of LOGIN block  ======*/



    /*=============================================
    =            APPLICATION            =
    =============================================*/
    
    $('.button-action').on("click", function(){
        $('.button-action').removeClass("active");
        $(this).addClass("active");
        var id = $(".active-section").attr("id");
        $(".active-section").removeClass("active-section");
        var section = $(this).attr("action");
        $('#'+section).addClass("active-section")
         $("#"+id).fadeOut(200, function(){
             $('#'+section).fadeIn()
             console.log(id)
             if(section =="events-section"){
                $('#title-section').show();
                $('#title-section').text("Proximos eventos");
             }else if (section == "notifications-section"){
                $('#title-section').show();
                $('#title-section').text("Notificaciones");
             }else{
                $('#title-section').hide();
             }
        });
    })

    $('#nefetz-group').on("click", function(){
        
        if($('#nefetz-group-actions').hasClass("active")){
            $('#nefetz-group-actions').fadeOut("slow");
            $('#nefetz-group-actions').removeClass("active");
        }else{
            $('#nefetz-group-actions').fadeIn("slow");
            $('#nefetz-group-actions').addClass("active");
        }
    })
    $('#p13n-group').on("click", function(){
        if($('#p13n-group-actions').hasClass("active")){
            $('#p13n-group-actions').fadeOut("slow");
            $('#p13n-group-actions').removeClass("active");
        }else{
            $('#p13n-group-actions').fadeIn("slow");
            $('#p13n-group-actions').addClass("active");
        }
    })
    $('#facu-group').on("click", function(){
        if($('#facu-group-actions').hasClass("active")){
            $('#facu-group-actions').fadeOut("slow");
            $('#facu-group-actions').removeClass("active");
        }else{
            $('#facu-group-actions').fadeIn("slow");
            $('#facu-group-actions').addClass("active");
        }
    })
    /*=====  End of Section comment block  ======*/
    
});