$(document).ready(function(){
    /*=============================================
    =            LOGIN            =
    =============================================*/
    $("#submit_login").on("click", function(){
        params= {};
        params.action = "getUser";
        params.username = $('#user_name').val();
        params.password = $('#password').val();

        $.ajax({
            //url: "http://blinkapp.com.ar/web_app/admin/log_in.php",
            url: "admin/log_in.php",
            type: "POST",
            data: params,
            cache: false,
            dataType: "json"
        }).done(function( data ) {
            console.log(data);
            localStorage.setItem("username", data.username);
            localStorage.setItem("password", data.password);
            localStorage.setItem("mail", data.mail);
            localStorage.setItem("id", data.userID);
            localStorage.setItem("phoneNumber", data.phoneNumber);
            $('#page-1').fadeOut(200, function(){
                $('#page-2').fadeIn("slow");
                $('#username-show').text(localStorage.getItem("username"));
            });
        }).error(function(error, textStatus){
            console.log(error);
        });
    });

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

    
    /*=====  End of Section comment block  ======*/
    
});