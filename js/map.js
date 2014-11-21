
var selectIndex;
$("#index-radio").click(function(){
        var preIndex = $(this).find(".btn-info");
        preIndex.removeClass("btn-info");
        preIndex.addClass("btn-default");
        var curIndex = $('input:radio[name=index]:checked').parent();
        curIndex.removeClass("btn-default");
        curIndex.addClass("btn-info");
        //change the index value
        selectIndex = $('input:radio[name=index]:checked').val();
        changeIndex(selectIndex);
        console.log("selectIndex: "+selectIndex);
});

function changeIndex(i){
	$("#frame").attr("src",i+".html");
}
