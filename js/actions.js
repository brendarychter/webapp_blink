$(document).ready(function(){

    /*=============================================
    =            Section LocalStorage block            =
    =============================================*/
    
    
    
    //query cada x segundos para las notificaciones
    if (localStorage.getItem("username") != undefined){
        $('.overlay').fadeIn(1000, function(){
            $('#page-2').fadeIn("slow");
            $('#username-show').text(localStorage.getItem("username"));
            $('.overlay').fadeOut("slow");
            getUserGroups();
        })
    }

    /*=====  End of LocalStorage block  ======*/

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
                                getUserGroups();
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
        //console.log(user);
        if(user.photo == ""){
            $('.img-user').css('background-image', 'url("img/resources/default_user.svg"');
        }else{
            $('.img-user').css('background-image', 'url(' + user.photo + ')');
        }
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
                                $('#page-1').fadeOut(200, function(){
                                    $('#page-2').fadeIn("slow");
                                    $('#username-show').text(localStorage.getItem("username"));
                                    $('.overlay').fadeOut("slow");
                                    localStorage.setItem("username", data.username);
                                    localStorage.setItem("password", data.password);
                                    getUserGroups();
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
            $('.img-user').css('background-image', 'url("../img/resources/default_user.svg"');

            localStorage.clear();
        })
    })

    /*=====  End of LOGIN block  ======*/



    /*=============================================
    =            APPLICATION            =
    =============================================*/
    

    
    function getGroupsSelectedUser(id, showNewGroupFromUser){
        params= {};
        params.id = id;
        $.ajax({
            //url: "http://www.blinkapp.com.ar/blink_webapp/admin/getGroupsCurrentUser.php",
            url: "admin/getGroupsCurrentUser.php",
            type: "POST",
            data: params,
            cache: false,
            dataType: "json"
        }).done(function( data ) {
            //if data.length == 0, show button de agregar grupo.
            console.log(data);
            $('.groups-user').empty();
            if (data.length == 0){
                console.log("todavia no hay grupos");
                $('.groups-user').hide();
                $('.new-user-section').show();
            }else {
                for (var i in data){
                    var group = data[i];
                    $('.groups-user').append("<li style='position: absolute' class='group-line' id='group-element-"+group.idGroup+"'><div class='logo-group'>"+group.groupName.charAt(0)+"</div><span>"+group.groupName+"</span><img src='img/resources/next.svg' /></li><div id='about-2' class='page' style='position: absolute'><p>Content for about 2</p>")
                }   
                //ocultar seccion de grupo nuevo
                //mostrar grupos
                if (showNewGroupFromUser){
                    $('.new-user-section').slideToggle('slow');
                    $('.groups-user').slideToggle('slow');
                }
            }
           
        }).error(function(error, textStatus){
            console.log(error);
            cleanInputs(textStatus);
        });
    }


    $('.group-line').click(transitionPage);
    function transitionPage() {
        // Hide to left / show from left
        $(".group-line").toggle("slide", {direction: "left"}, 500);

        $("#about-2").toggle("slide", {direction: "right"}, 500);
    }

    function getUserGroups() {
        var id = $(".active-section").attr("id");
        console.log(id)
        
        params= {};
        params.action = "getUser";
        params.username = localStorage.getItem("username");
        params.password = localStorage.getItem("password");

        $.ajax({
            //url: "http://www.blinkapp.com.ar/blink_webapp/admin/log_in.php",
            url: "admin/log_in.php",
            type: "POST",
            data: params,
            cache: false,
            dataType: "json"
        }).done(function( user ) {
            setCurrentUser(user);
            getGroupsSelectedUser(user.userID);
        }).error(function(error, textStatus){
            console.log(error);
            cleanInputs(textStatus);
        });
    }

    var usersList = [];
    // $('#create-group').on('click', function(){
    //     $('#form-create-group').slideToggle('slow');
        //get all users excepto yo
        getUsers();
        function getUsers(){
            $.ajax({
                //url: "http://www.blinkapp.com.ar/blink_webapp/admin/log_in.php",
                url: "admin/getAllUsers.php",
                type: "POST",
                cache: false,
                dataType: "json"
            }).done(function( data ) {
                var list = $('.users-to-add');
                var array = [];

                for (var a in data){
                    console.log(data[a].userID);
                    if (data[a].userID != localStorage.getItem("id")){
                        array.push(data[a]);
                    }
                }
                for (var i in array){
                    var user = array[i];
                    list.append('<li id="'+user.userID+'"><div class="img-user-group"></div><span>'+user.username+'</span><p>'+user.phoneNumber+'</p><input type="checkbox" class="input_class_checkbox"/></li>')
                    if (user.photo != ""){
                        $('.img-user-group').css('background-image', 'url(' + user.photo + ')');
                    }
                }

                $('.input_class_checkbox').each(function(){
                        $(this).hide().after('<div class="class_checkbox" />');
                    });
                $('.users-to-add li').on('click',function(){
                    console.log(this.id)
                    usersList.push(this.id);
                    $(this).toggleClass('checked').prev().prop('checked', $(this).is('.checked'));
                });
            }).error(function(error, textStatus){
                console.log(error);
            }); 
        }

    // })

    $('#submit-group').on('click', function(){
        var groupName = $('#group_name').val();
        params.groupName = groupName;
        params.id = localStorage.getItem("id");
        usersList.push(params.id);
        params.usersList = usersList;

        console.log(params);
        if (groupName != ""){
            $.ajax({
                //url: "http://www.blinkapp.com.ar/blink_webapp/admin/createGroup.php",
                url: "admin/createGroup.php",
                type: "POST",
                data: params,
                cache: false,
                dataType: "json"
            }).done(function( data ) {
                //mostrar los grupos del usuario
                console.log(data);
                //getUserGroups();
                getGroupsSelectedUser(params.id, true);
            }).error(function(error, textStatus){
                console.log(error);
            });
        }else{
            $('#group_name').css('border', '1px solid red');
        }
    })

    $('.button-action').on("click", function(){
        $('.button-action').removeClass("active");
        $(this).addClass("active");

        var id = $(".active-section").attr("id");
        $(".active-section").removeClass("active-section");
        
        var section = $(this).attr("action");
        $('#'+section).addClass("active-section")
        $("#"+id).fadeOut(200, function(){
            $('#'+section).fadeIn();
            if(section =="group-section"){
                $('#title-section').show();
                $('#title-section').text("Mis grupos");
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


    /*====================================
    =            Subir imagen            =
    ====================================*/
    

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    $('#subir-imagen').on("click", function(){
        $('#form-foto').slideToggle('slow');
    })
    
    $('#guardar-foto').on("click", function(){
        var form_data = new FormData();
        var id = localStorage.getItem("id");
        var file_data = $('#create-foto').prop('files')[0];

        form_data.append('imagen', file_data);
        form_data.append('userID', id);
        form_data.append('submit', 'submit');


        var params = {};
        params.id = id;
        $.ajax({
            //url: "http://www.blinkapp.com.ar/blink_webapp/admin/updateImages.php",
            url: "admin/updateImages.php",
            type: "POST",
            cache: false,
            processData: false,
            data: form_data,
            dataType: "text",
            contentType: false,
        }).done(function( data ) {
            console.log(data);
            $('.overlay').fadeIn("slow");

            $.ajax({
                //url: "http://www.blinkapp.com.ar/blink_webapp/admin/getPhoto.php",
                url: "admin/getPhoto.php",
                type: "POST",
                cache: false,
                data: params,
                dataType: "json"
            }).done(function( data ) {
                console.log(data);
                $('.img-user').css('background-image', 'url(' + data.photo + ')');
                $('#form-foto').slideToggle('slow');
                $('.overlay').fadeOut("slow");

            }).error(function(error, textStatus){
                console.log(error)
            });

        }).error(function(error, textStatus){
            console.log(error)
        });
    })
    /*=====  End of Subir imagen  ======*/
    
    
});