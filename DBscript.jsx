$(document).ready(function () {
    var numOfPost=0;
    //function to display date and time and user in navbar
    (function MakeNavReady(){
        var d=new Date();
        $("#date").append(d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear());
        $("#time").append(d.getHours()+":"+d.getMinutes());
        $("#user").append(localStorage.getItem("user"))
     })();
     //function which make any requset with ajax (jquery)
    function createrequest(link, succ, method) {
        $.ajax({
            url: link,
            type: method,
            success: succ,
            error: function () {
                console.log("error");
            }
        });
    }
    createrequest("https://jsonplaceholder.typicode.com/posts", function (res) {
        res.map(function (elem) {
            numOfPost++;
            readyInfo(numOfPost);
            $(".table").append('<div class="row" id="item'+elem.id+'"><div class="card"><p>' + elem.title + '</p></div><div class="card"><p>' + elem.body + '</p></div><div class="card smallCell"><a class="edit" href="editPost.html" name=' + elem.id + ' title="edit"><i class="fas fa-edit"></i></a><a name=' + elem.id + ' class="del" title="delete"><i class="fas fa-trash"></i></a></div></div>');
        })
    }, "get");
    //function to display info 
   function readyInfo (num) {
            $("#numOfPosts").html(num);
        };
    //listeners on side menu view part and hide all
    $(".sideMenu>div").on("click",function(){
        var items=$(".sideMenu>div");
        console.log(items);
        items.map(function(index,elem){
            console.log(elem.id);
          $("."+elem.id).hide();
        })
        $("."+this.id).show();
    })
    //after ajaxstop make alistener on all edit links
    $(document).ajaxStop(function () {
        $('.edit').map(function (index, elem) {
            $(elem).on("click", function () {
                localStorage.setItem("storageId", elem.name);
            });
        });
    });
    //after ajaxstop make alistener on all delete links
    $(document).ajaxStop(function () {
        $('.del').map(function (index, elem) {
            $(elem).on("click", function () {
                $("#dialog").dialog();
                localStorage.setItem("deletedPost", elem.name);
            });
        });
    });
    //after ajaxstop make alistener on button ok 
    $(document).ajaxStop(function () {
        $("#dialog #delete").on("click", function () {
            $("#item"+localStorage.getItem("deletedPost")).slideUp();
            readyInfo(numOfPost);  
            $("#dialog").dialog("close");
            createrequest("https://jsonplaceholder.typicode.com/posts/" + localStorage.getItem("deletedPost"),
                function (res) {
                    console.log(res);
                }, "DELETE");
        })
        $("#cancel").on("click",function(){
            $("#dialog").dialog("close");
        })
    });

})