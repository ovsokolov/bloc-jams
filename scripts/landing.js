//var pointsArray = document.getElementsByClassName('point');

//var animatePoints = function (points){
var animatePoints = function (){
        //var revealPoint = function(n){ 
        //    points[n].style.opacity = 1;
        //    points[n].style.transform = "scaleX(1) translateY(0)";
        //    points[n].style.msTransform = "scaleX(1) translateY(0)";
        //    points[n].style.WebkitTransform = "scaleX(1) translateY(0)";
        var revealPoint = function() {
             $(this).css({
                 opacity: 1,
                 transform: 'scaleX(1) translateY(0)'
             });
        }

        //forEach(pointsArray,revealPoint);
        $.each($(".point"), revealPoint);

};

 $(window).load(function() {
 //window.onload = function() {
    //if (window.innerHeight > 950) {
    if($(window).height() > 950){
        animatePoints();
    }
    //var sellingPoints = document.getElementsByClassName('selling-points')[0];
    //var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    var scrollDistance = $(".selling-points").offset().top - $(window).height() + 200;
    //window.addEventListener('scroll', function(event) {
    $(window).scroll(function(event) {
        //if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
        if($(window).scrollTop() >= scrollDistance){
            animatePoints();   
        }
    });
 });
 
 
 
 


      