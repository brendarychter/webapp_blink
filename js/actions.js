$(document).ready(function(){
    /*=============================================
    =            LOGIN            =
    =============================================*/

    // if (localStorage.getItem("username") != undefined){
    //     $('.overlay').fadeIn(1000, function(){
    //         $('#page-2').fadeIn("slow");
    //         $('#username-show').text(localStorage.getItem("username"));
    //         $('.overlay').fadeOut("slow");
    //     })
    // }


    $("#submit_login").on("click", function(){
        $("#error-login").empty();
        if (!$("#user_name").val() || !$("#password").val()){
            cleanInputs("-Alguno de los campos se encuentra vacío-");
        }else{
            params= {};
            params.action = "getUser";
            params.username = $('#user_name').val();
            params.password = $('#password').val();
            $('.overlay').fadeIn("slow");
            $.ajax({
                //url: "http://www.blinkapp.com.ar/blink_webapp/admin/log_in.php",
                url: "admin/log_in.php",
                type: "POST",
                data: params,
                cache: false,
                dataType: "json"
            }).done(function( user ) {
                $('.overlay').fadeOut("slow", function(){
                    if (user.userID == 0){
                        cleanInputs("-Revise los datos ingresados-");
                    }else{
                        if (user.active == 0){
                            cleanInputs("-El usuario no se encuentra activo-");
                        }else{
                            setCurrentUser(user);
                            $('#page-1').fadeOut(200, function(){
                                $('#page-2').fadeIn("slow");
                                $('#username-show').text(localStorage.getItem("username"));
                                $('.overlay').fadeOut("slow");
                            });
                        }
                    }
                });
            }).error(function(error, textStatus){
                console.log(error);
                cleanInputs(textStatus);
            });
        }
    });
    
    function cleanInputs(text){
        $("#user_name").val("");
        $("#password").val("");
        $("#error-login").fadeIn("slow");
        $("#error-login").append(text);
        setTimeout(function(){
            $("#error-login").fadeOut("slow");
        }, 2500);
    }

    function setCurrentUser(user){
        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);
        localStorage.setItem("mail", user.mail);
        localStorage.setItem("id", user.userID);
        localStorage.setItem("phoneNumber", user.phoneNumber);
        localStorage.setItem("active", user.phoneNumber);
    }

    $("#submit_signin").on("click", function(){
        var params = {};
        params.mail = $("#mail_sign_in").val();
        params.tel = $("#tel_sign_in").val();
        params.pass = $("#password_sign_in").val();
        params.user = $("#usuario_sign_in").val();
        params.name = $("#name_sign_in").val();
        var today = new Date();
        params.datetime = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear() + '. ' + today.getHours() + ":" + today.getMinutes();
        
        $("#error-signin").empty();
        if (params.user == "" || params.pass == "" || params.tel == "" || params.mail == "" || params.name == ""){
            cleanSignIn("-Alguno de los campos se encuentra vacío-");
        }else{
            if(validateMail(params.mail)){
                $.ajax({
                //url: "http://www.blinkapp.com.ar/blink_webapp/admin/sign_in.php",
                    url: "admin/sign_in.php",
                    type: "POST",
                    data: params,
                    cache: false,
                    dataType: "json"
                }).done(function( data ) {
                    if (data.type == "success"){
                        cleanSignIn(data.message);
                        setTimeout(function(){
                            $('.overlay').fadeIn("slow", function(){
                                setCurrentUser(data);
                                $('#page-1').fadeOut(200, function(){
                                    $('#page-2').fadeIn("slow");
                                    $('#username-show').text(localStorage.getItem("username"));
                                    $('.overlay').fadeOut("slow");
                                });
                            });
                        }, 2000);
                    }else if (data.type == "errorName"){
                        cleanSignIn(data.message);
                    }else if (data.type == "errorMail"){
                        cleanSignIn(data.message);
                    }
                }).error(function(error, textStatus){
                    console.log(error);
                    cleanSignIn(textStatus);
                });
            }else{
                cleanSignIn("-Verifique su correo electrónico-");
            }
        }
    });

    function validateMail(mail) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(mail);
    }

    function cleanSignIn(text){
        $("#error-signin").fadeIn("slow");
        $("#error-signin").append(text);
        setTimeout(function(){
            $("#error-signin").fadeOut("slow");
        }, 2500);
    }

    $('#register-click').on("click", function(){
        $('#page-1').fadeOut(200, function(){
            $('#page-sign-in').fadeIn("slow");
        })
    });

    $("#volver").on("click", function(){
        $('#page-sign-in').fadeOut(200, function(){
            $('#page-1').fadeIn("slow");
        })
    });    
    
    $('#sign-out').on("click", function(){
        $('.overlay').fadeIn(1000, function(){
            $('#page-2').hide();
            $('.overlay').fadeOut("slow");
            $('#page-1').fadeIn("slow");
            localStorage.clear();
        })
    })

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