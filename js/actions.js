$(document).ready(function(){
    $("body").height($(window).height());
    $('#agregar-grupo').hide();

    /*=============================================
    =            Section LocalStorage block            =
    =============================================*/
    
    //query cada x segundos para las notificaciones
    if (localStorage.getItem("username") != undefined){
            $('#page-2').fadeIn("slow");
            $('#username-show').text(localStorage.getItem("username"));
            $('.overlay').fadeOut("slow");
            $('.button-action').removeClass("active");
            $("#home-click").addClass("active");
            $("#page-2").show();

            getUserGroups();
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
                url: "http://www.blinkapp.com.ar/blinkwebapp/admin/log_in.php",
                //url: "admin/log_in.php",
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
                                $("#group-section").show();
                                $("#title-section").show();
                                $('#page-2').fadeIn("slow");
                                $('#username-show').text(localStorage.getItem("username"));
                                $('.overlay').fadeOut("slow");
                                $('.button-action').removeClass("active");
                                $("#home-click").addClass("active");
                                $(".section").removeClass("active-section");
                                $("#group-section").addClass("active-section");
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
        console.log(user);
        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);
        localStorage.setItem("mail", user.mail);
        localStorage.setItem("id", user.userID);
        localStorage.setItem("phoneNumber", user.phoneNumber);
        localStorage.setItem("active", user.phoneNumber);
        $('#username-show').text(localStorage.getItem("username"));
        if(user.photo == ""){
            $('.img-user').css('background-image', 'url("img/resources/default_user.svg"');
        }else{
            $('.img-user').css('background-image', 'url(' + user.photo + ')');
        }

        actualizarDatos(user);
    }

    function actualizarDatos(user){
        $('#username_update').val(user.username);
        $('#password_update').val(user.password);
        $('#mail_update').val(user.mail);
        $('#phone_update').val(user.phoneNumber);
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
                    url: "http://www.blinkapp.com.ar/blinkwebapp/admin/sign_in.php",
                    //url: "admin/sign_in.php",
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
                                    $('.overlay').fadeOut("slow");
                                    localStorage.setItem("username", data.username);
                                    localStorage.setItem("password", data.password);
                                    $('#username-show').text(localStorage.getItem("username"));
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
            $('.input-app').val("")
            localStorage.clear();
        })
    })

    /*=====  End of LOGIN block  ======*/



    /*=============================================
    =            APPLICATION            =
    =============================================*/
    
    $('#home-click').on("click", function(){
        $('.section-group-selected').hide();
    });

    $('#settings-click').on("click", function(){
        $('.section-group-selected').hide();
    });

    var activeGroup;
    function getGroupsSelectedUser(id, showNewGroupFromUser){
        params= {};
        params.id = id;
        $('.overlay').fadeIn("slow");

        $.ajax({
            url: "http://www.blinkapp.com.ar/blinkwebapp/admin/getGroupsCurrentUser.php",
            //url: "admin/getGroupsCurrentUser.php",
            type: "POST",
            data: params,
            cache: false,
            dataType: "json"
        }).done(function( data ) {
            $('.groups-user').empty();
            if (data.length == 0){
                console.log("todavia no hay grupos");
            }else {
                for (var i in data){
                    var group = data[i];
                    $('.groups-user').append("<li class='group-line' group-name='"+group.groupName+"' group-id='"+group.idGroup+"'><div class='logo-group'>"+group.groupName.charAt(0).toUpperCase()+"</div><span>"+group.groupName+"</span><img src='img/resources/next.svg' /></li>")
                }   
                //ocultar seccion de grupo nuevo
                //mostrar grupos
                if (showNewGroupFromUser){
                    $('.new-user-section').slideToggle('slow', function(){
                        $('.groups-user').slideToggle('slow');
                    });
                }
            }
            $('.group-line').on("click", function(){
                var id = $(this).attr("group-id");
                var name = $(this).attr("group-name");
                localStorage.setItem("group", id);
                activeGroup = true;
                loadSelectedGroup();
                $('#group-section').toggle("slide", {direction: "left"}, 100);
                $('#title-section').text("  " + name);
                $('#title-section').prepend("<img src='img/resources/prev.svg' id='back-to-menu'/>");
                $('#title-section').addClass("backToMenu");
                $('#top-bar').css("cursor", "pointer");
                populateMessages(id);
                getAllUsersCurrentGroup();
                $('#contactos-grupo').hide();
            });
            $('.overlay').fadeOut("slow");

           
        }).error(function(error, textStatus){
            console.log(error);
            cleanInputs(textStatus);
        });
    }

    $('#top-bar').on("click", function(){
        if(activeGroup){
            $(this).css("cursor", "default");
            $('#title-section').text("Mis grupos");
            $('#group-section').toggle("slide", {direction: "right"}, 100);
            activeGroup = false; 
            $('.section-group-selected').toggle();
        }
    });

    $('#send-message').on("click", function(){
        
        params= {};
        params.idGroup = localStorage.getItem("group");
        params.userID = localStorage.getItem("id");
        params.text = escape($('#message-to-send').val());
        params.dateTime = new Date();
        console.log(params);

        if (params.text != ""){
            $.ajax({
                url: "http://www.blinkapp.com.ar/blinkwebapp/admin/sendMessage.php",
                //url: "admin/sendMessage.php",
                type: "POST",
                data: params,
                cache: false,
                dataType: "json"
            }).done(function( data ) {
                if (data.type == "success"){
                    $('#message-to-send').val("");
                    populateMessages(params.idGroup);
                }
            }).error(function(error, textStatus){
                console.log(error);
            });
        }else{
            $('#message-to-send').css('border', '1px solid red');
        }
    });
    
    var list = $('.messages-list');

    function populateMessages(idGroup){
        params= {};
        params.idGroup = localStorage.getItem("group");
        $('.overlay').fadeIn("slow");
        $('.messages-list').empty();
        if (params.text != ""){
            $.ajax({
                url: "http://www.blinkapp.com.ar/blinkwebapp/admin/getAllMessages.php",
                //url: "admin/getAllMessages.php",
                type: "POST",
                data: params,
                cache: false,
                dataType: "json"
            }).done(function( data ) {
                if (data.length == 0){
                    console.log("no hay mensajes");
                    $('.messages-list').append("<li style='height: 30px;'>Todavía no hay mensajes</li>")
                }else{
                    for (var i in data){
                       // $('.messages-list').empty();
                        var message = data[i];
                        if(message.idUser == localStorage.getItem("id")){
                            message.username = "Yo";
                        }
                        var time = new Date(message.datetimeText);
                        console.log(time.getDate());
                        time = time.getDate() + "/" + (time.getMonth() + 1) + " - " + ((time.getHours()<10?'0':'') + time.getHours() ) + ":" + ((time.getMinutes()<10?'0':'') + time.getMinutes() ) + ":" + ((time.getSeconds()<10?'0':'') + time.getSeconds() );
                        list.append('<li><span class="user-message">'+message.username+'</span><div class="img-user-message img-user-message-'+message.idUser+'"></div><span class="time-message">'+time+'</span></br><p class="text-message">'+unescape(message.texto)+'</p></li>')
                        console.log(message.photo)
                        if (message.photo != ""){
                            $('.img-user-message-'+message.idUser).css('background-image', 'url(' + message.photo + ')');
                        }
                    }
                    $('.messages-list').scrollTop($('.messages-list')[0].scrollHeight);
                }
            }).error(function(error, textStatus){
                console.log(error);
            });
        }else{
            $('#message-to-send').css('border', '1px solid red');
        }
        $('.overlay').fadeOut("slow");

    }

    function loadSelectedGroup(){
        $('.section-group-selected').toggle();
    }

    $('.title-grupos').on("click", function(){
        $('.title-grupos').removeClass("active-group");
        $(this).addClass("active-group");

    })

    $('.contactos-title').on("click", function(){
        $('#contactos-grupo').show();
        $('#muro-grupo').hide();
        $('#agregar-grupo').hide();

        getAllUsersCurrentGroup(localStorage.getItem("group"));
    })
    $('.muro-title').on("click", function(){
        $('#agregar-grupo').hide();
        $('#contactos-grupo').hide();
        $('#muro-grupo').show();
    })

    var currentGroupUsers = [];
    function getAllUsersCurrentGroup(){
        params = {};
        params.idGroup = localStorage.getItem("group");

        $.ajax({
            url: "http://www.blinkapp.com.ar/blinkwebapp/admin/getAllUsersCurrentGroup.php",
            //url: "admin/getAllUsersCurrentGroup.php",
            type: "POST",
            data: params,
            cache: false,
            dataType: "json"
        }).done(function( data ) {
            var list = $('.current-group-users');
            list.empty();
            currentGroupUsers = data;
            for (var i in data){
                var user = data[i];
                list.append('<li><div class="img-user-group-2" id="img-user-group-2-'+user.userID+'"></div><span class="username-to-add">'+user.username+'</span></br><span class="phonenumber-to-add">'+user.phoneNumber+'</span></li>')
                if (user.photo != ""){
                    $('#img-user-group-2-'+user.userID).css('background-image', 'url(' + user.photo + ')');
                }
            }
            $('.overlay').fadeOut("slow");

        }).error(function(error, textStatus){
            console.log(error);
        }); 
    }

    function transitionPage() {
        // Hide to left / show from left
        $(".group-line").toggle("slide", {direction: "left"}, 500);

        $("#about-2").toggle("slide", {direction: "right"}, 500);
    }

    function getUserGroups() {
        var id = $(".active-section").attr("id");
        
        params= {};
        params.action = "getUser";
        params.username = localStorage.getItem("username");
        params.password = localStorage.getItem("password");
        $('.overlay').fadeIn("slow");

        $.ajax({
            url: "http://www.blinkapp.com.ar/blinkwebapp/admin/log_in.php",
            //url: "admin/log_in.php",
            type: "POST",
            data: params,
            cache: false,
            dataType: "json"
        }).done(function( user ) {
            setCurrentUser(user);

            getGroupsSelectedUser(user.userID);
            $('.overlay').fadeOut("slow");
        }).error(function(error, textStatus){
            console.log(error);
            cleanInputs(textStatus);
        });
    }

    var usersList = [];
    $('.block-new-group').on('click', function(){
        console.log("entro")
        $(this).children('.alert-no-groups').text(function(i, text){
            return text === "Crear nuevo grupo" ? "  " : "Crear nuevo grupo";
        })
        $(this).children(".new-group").text(function(i, text){
            return text === "+" ? "×" : "+";
        })
        
        $('.new-user-section').slideToggle("slow");
        $('.groups-user').slideToggle("slow");
        $('.overlay').fadeIn("slow");

        $.ajax({
            url: "http://www.blinkapp.com.ar/blinkwebapp/admin/getAllUsers.php",
            //url: "admin/getAllUsers.php",
            type: "POST",
            cache: false,
            dataType: "json"
        }).done(function( data ) {
            $('.users-to-add').empty();
            var list = $('.users-to-add');
            var array = [];

            for (var a in data){
                if (data[a].userID != localStorage.getItem("id")){
                    array.push(data[a]);
                }
            }
            for (var i in array){
                var user = array[i];
                list.append('<li id="'+user.userID+'"><div class="img-user-group" id="img-user-group-'+user.userID+'"></div><span class="username-to-add">'+user.username+'</span></br><span class="phonenumber-to-add">'+user.phoneNumber+'</span><input type="checkbox" class="input_class_checkbox"/></li>')
                if (user.photo != ""){
                    $('#img-user-group-'+user.userID).css('background-image', 'url(' + user.photo + ')');
                }
            }

            $('.input_class_checkbox').each(function(){
                    $(this).hide().after('<div class="class_checkbox" />');
                });
            $('.users-to-add li').on('click',function(){
                // usersList.push(this.id);
                $(this).toggleClass('checked').prev().prop('checked', $(this).is('.checked'));
                if ($(this).is('.checked')){
                    usersList.push(this.id);
                }else{
                    var index = usersList.indexOf(this.id);
                    if (index > -1) {
                        usersList.splice(index, 1);
                    }
                }
            });
            $('.overlay').fadeOut("slow");
            $('.active-group').show();
        }).error(function(error, textStatus){
            console.log(error);
        }); 
    });

    $('#submit-group').on('click', function(){
        var groupName = $('#group_name').val();
        params.groupName = groupName;
        params.id = localStorage.getItem("id");
        usersList.push(params.id);
        params.usersList = usersList;
        params.date = new Date();
        $('.overlay').fadeIn("slow");
        if (groupName != ""){
            $.ajax({
                url: "http://www.blinkapp.com.ar/blinkwebapp/admin/createGroup.php",
                //url: "admin/createGroup.php",
                type: "POST",
                data: params,
                cache: false,
                dataType: "json"
            }).done(function( data ) {
                //getUserGroups();
                getGroupsSelectedUser(params.id, true);
                $('.block-new-group').children('.alert-no-groups').text("Crear nuevo grupo");
                $('.block-new-group').children(".new-group").text("+");
                $('.input-name-group').val("");
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
            url: "http://www.blinkapp.com.ar/blinkwebapp/admin/updateImages.php",
            //url: "admin/updateImages.php",
            type: "POST",
            cache: false,
            processData: false,
            data: form_data,
            dataType: "text",
            contentType: false,
        }).done(function( data ) {
            $('.overlay').fadeIn("slow");

            $.ajax({
                url: "http://www.blinkapp.com.ar/blinkwebapp/admin/getPhoto.php",
                //url: "admin/getPhoto.php",
                type: "POST",
                cache: false,
                data: params,
                dataType: "json"
            }).done(function( data ) {
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
    

    /*=====================================
    =            Datos usuario            =
    =====================================*/
    
    $('#cambiar-datos').on("click", function(){
        $('#form-datos').slideToggle('slow');
    })
    
    $('#guardar-datos').on("click", function(){
        var params = {};
        params.mail = $("#mail_update").val();
        params.id = localStorage.getItem("id");
        params.tel = $("#phone_update").val();
        params.pass = $("#password_update").val();
        params.user = $("#username_update").val();
        $('.overlay').fadeIn("slow");
        
        if (params.user == "" || params.pass == "" || params.tel == "" || params.mail == ""){
            $('.overlay').fadeOut("slow");
            cleanUpdate("-Revise los campos-");
        }else{    
            if(validateMail(params.mail)){
                $.ajax({
                    url: "http://www.blinkapp.com.ar/blinkwebapp/admin/update_data.php",
                    //url: "admin/update_data.php",
                    type: "POST",
                    data: params,
                    cache: false,
                    dataType: "json"
                }).done(function( data ) {
                        console.log(data);
                    if (data.type == "success"){
                        console.log(data);
                        actualizarDatos2(data);
                        $('#form-datos').slideToggle('slow');
                        // cleanSignIn(data.message);
                        // setTimeout(function(){
                        //     $('.overlay').fadeIn("slow", function(){
                        //         $('#page-1').fadeOut(200, function(){
                        //             $('#page-2').fadeIn("slow");
                        //             $('.overlay').fadeOut("slow");
                        //             localStorage.setItem("username", data.username);
                        //             localStorage.setItem("password", data.password);
                        //             $('#username-show').text(localStorage.getItem("username"));
                        //             getUserGroups();
                        //         });
                        //     });
                        // }, 2000);
                    } else if (data.type == "errorName"){
                        cleanUpdate(data.message);
                    }else if (data.type == "errorMail"){
                        cleanUpdate(data.message);
                    }
                    $('.overlay').fadeOut("slow");
                }).error(function(error, textStatus){
                    console.log(error);
                    cleanUpdate(textStatus);
                });
            }else{
                $('.overlay').fadeOut("slow");
                cleanUpdate("-Verifique su correo electrónico-");
            }
        }

    })

    function actualizarDatos2(user){
        console.log(user);
        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);
        localStorage.setItem("mail", user.mail);
        localStorage.setItem("id", user.userID);
        localStorage.setItem("phoneNumber", user.phoneNumber);
        localStorage.setItem("active", user.phoneNumber);
        $('#username-show').text(localStorage.getItem("username"));
        $('#username_update').val(user.username);
        $('#password_update').val(user.password);
        $('#mail_update').val(user.mail);
        $('#phone_update').val(user.phoneNumber);
    }

    function cleanUpdate(text){
        $("#error-update").text("");
        $("#error-update").fadeIn("slow");
        $("#error-update").append(text);
        setTimeout(function(){
            $("#error-update").fadeOut("slow");
        }, 2500);
    }
    /*=====  End of Datos usuario  ======*/
    
    /*========================================================
    =            Agregar nuevos usuarios al grupo            =
    ========================================================*/
    
    $('.add-title').on("click", function(){
        $('#muro-grupo').hide();
        $('#agregar-grupo').show();
        $('#contactos-grupo').hide();
        getAllUsersOutCurrentGroup();
    })
    
    /*=====  End of Agregar nuevos usuarios al grupo  ======*/


    usersListAdd = [];
    idsAdd = [];
    function getAllUsersOutCurrentGroup(){
        var list = $('.usuarios-para-agregar');

        params = {};
        params.idGroup = localStorage.getItem("group");
        console.log(currentGroupUsers)
        idsAdd = [];
        for (var h in currentGroupUsers){
            idsAdd.push(currentGroupUsers[h].userID)
        }
        params.idList = idsAdd;
        $.ajax({
            url: "http://www.blinkapp.com.ar/blinkwebapp/admin/getAllUsersOutCurrentGroup.php",
            //url: "admin/getAllUsersOutCurrentGroup.php",
            type: "POST",
            data: params,
            cache: false,
            dataType: "json"
        }).done(function( user ) {
            $('.usuarios-para-agregar').empty();
            for (var j in user){
                list.append('<li data-id="'+user[j].userID+'"><div class="img-user-group-2" id="img-user-group-3-'+user[j].userID+'"></div><span class="username-to-add">'+user[j].username+'</span></br><span class="phonenumber-to-add">'+user[j].phoneNumber+'</span><input type="checkbox" class="input_class_checkbox"/></li>')
                if (user[j].photo != ""){
                    $('#img-user-group-3-'+user[j].userID).css('background-image', 'url(' + user[j].photo + ')');
                }
            }

            $('.input_class_checkbox').each(function(){
                $(this).hide().after('<div class="class_checkbox" />');
            });
            $('.usuarios-para-agregar li').on('click',function(){
                // usersList.push(this.id);
                $(this).toggleClass('checked').prev().prop('checked', $(this).is('.checked'));
                var id = $(this).attr("data-id");
                console.log(id)
                if ($(this).is('.checked')){
                    usersListAdd.push(id);
                }else{
                    var index = usersListAdd.indexOf(id);
                    if (index > -1) {
                        usersListAdd.splice(index, 1);
                    }
                }
            });
        }).error(function(error, textStatus){
            console.log(error);
        }); 
    }

    $('#add-new-contacts').on('click', function(){
        var groupName = $('#group_name').val();
        params.groupID = localStorage.getItem("idGroup");
        params.usersList = usersListAdd;
        
        $('.overlay').fadeIn("slow");
            //chequear que la lista esté completa
        if(params.usersList.length > 0){
            $.ajax({
                url: "http://www.blinkapp.com.ar/blinkwebapp/admin/addUserToGroup.php",
                //url: "admin/addUserToGroup.php",
                type: "POST",
                data: params,
                cache: false,
                dataType: "json"
            }).done(function( data ) {
                console.log(data);
                if(data.type=="success"){
                    getAllUsersCurrentGroup();
                    $('#usuarios-para-agregar').slideToggle("slow", function(){
                        $('#usuarios-para-agregar').empty();
                        $('#usuarios-para-agregar').slideToggle();
                        $('.overlay').fadeOut("slow");
                        getAllUsersOutCurrentGroup()
                    });
                }
            }).error(function(error, textStatus){
                console.log(error);
            });
        }else{
            $('.overlay').fadeOut("slow");

            $("#error-add-contacts").fadeIn("slow");
            $("#error-add-contacts").append("-Seleccione los contactos a agregar-");
            setTimeout(function(){
                $("#error-add-contacts").fadeOut("slow");
            }, 2500);
        }
    })
    
});