$(document).ready(function () {
    var newdata={};
    console.log(localStorage.getItem("storageId"));
    var id=localStorage.getItem("storageId");
    function createrequest(link,succ,method,newdata) {
        $.ajax({
            url:link,
            data:newdata,
            type: method,
            success: succ,
            error: function () {
                console.log("error");
            }
        });
    }
    createrequest("https://jsonplaceholder.typicode.com/posts/"+id,function(res) {
        console.log(res);
        $("#name").append(res.title);
        $("#body").append(res.body);
},"get");
$("#save").on( "click", function() {
    createrequest("https://jsonplaceholder.typicode.com/posts/"+id,function(res) {
        console.log($("#name").val());
         newdata={id:1,
        title:$("#name").val()};
        console.log(res);
        window.location.href = "dashborad.html";
},"put",newdata);
});
})