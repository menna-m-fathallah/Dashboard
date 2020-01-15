$(document).ready(function () {
    if(localStorage.getItem("usersData")===null)
    {
        localStorage.setItem("usersData", '[]');
    }
    putSavedPassword();
    //listener on submit button
    $("form").submit(function (evt) {
        evt.preventDefault();
        var data = {};
        data.email = $("#email").val();
        data.password = $("#password").val();
        if (checkemail(data.email) && checkpassword(data.password)) {
            $.post("https://jsonplaceholder.typicode.com/posts", data, function (res) {
                console.log(res);
            });
            if (localStorage.getItem("flagRemeber") == "true") {
                remeberMe(data.email, data.password);
            }
            localStorage.setItem("user",data.email);
            window.location.href = "dashborad.html";
        }
        else  {
            console.log(data)
            $("#error").show();
            $("#error").html('<i class="fas fa-exclamation-circle"></i><span>Password or Email not valid</span>');
        }

    })
    //listener on email input 
    $('input[type="email"]').on('keyup', function () {
        console.log("fire")
        if (this.value.length > 1) {
            console.log("ok")
            putSavedPassword();
        }
    });
    //listener on checkbox button
    $("input[type='checkbox']").change(function () {
        if ($("input[type='checkbox']").prop('checked') == true) {
            console.log("save password");
            localStorage.setItem("flagRemeber", "true");
        }
        else {
            console.log("don't save password");
            localStorage.setItem("flagRemeber", "false");
        }
    })
    //listener on icon show click
    $("#show").click(function () {
        var classes=$(this).attr('class').split(' ');
        console.log(classes[1])

        if(classes[1]=="fa-eye"){
            console.log("showwww")
            $(this).removeClass( "fa-eye" ).addClass( "fa-eye-slash" );
            $("input[type='password']")[0].type="text";
        }
        else{
            $(this).removeClass( "fa-eye-slash" ).addClass( "fa-eye" );
            $("input[type='text']")[0].type="password";
        }
    })
    //function check if email valid
    function checkemail(data) {
        var regEmail = /^[A-Za-z]+[\w\.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(\.[A-Za-z]{2,4})?$/;
        if (regEmail.test(data)) {
            console.log("email vaild")
            return 1;
        }
        else {
            console.log("not vaild email ")
            return 0;
        }
    }
    //function check if password valid
    function checkpassword(data) {
        var regpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&]{6,12}$/;
        if (regpassword.test(data)) {
            console.log("password vaild")
            return 1;
        }
        else {
            console.log("not vaild password ")
            return 1;
        }
    }
    //function save data 
    function remeberMe(email, pass) {
        console.log("hello from remeber me")
        var users = JSON.parse(localStorage.getItem("usersData"));
        var user = {};
        user.email = email;
        user.password = pass;
        if (!checkIsSaveBefore(users, email, pass)) {
            console.log("i will push this email")
            users.push(user);
        }
        localStorage.setItem("usersData", JSON.stringify(users));
        console.log(users, typeof (users));
    }
    //function check if data save before
    function checkIsSaveBefore(users, email, pass) {
        var f = false;
        users.map(function (elem) {
            console.log(elem);
            if (elem.email === email) {
                elem.password = pass;
                f = true;
            }
        })
        return f;
    }
    //function putSavedPassword
    function putSavedPassword() {
        console.log("hello putsavedpassword")
        var users = JSON.parse(localStorage.getItem("usersData"));
        console.log(users);
        users.map(function (elem) {
            if (elem.email === $('input[type="email"]').val()) {
                console.log(elem);
                $("input[type='password']").val(elem.password);
            }
        })
    }
})
