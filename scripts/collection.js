//var collectionItemTemplate = 
var buildCollectionItemTemplate = function() {
    var template = 
     '<div class="collection-album-container column fourth">'
    +'    <img src="assets/images/album_covers/01.png"/>'
    +'    <div class="collection-album-info caption">'
    +'        <p>'
    +'            <a class="album-name" href="album.html">The Colors</a>'
    +'            <br/>'
    +'            <a href="album.html">Pablo Picasso</a>'
    +'            <br/>'
    +'            X songs'
    +'            <br/>'
    +'        </p>'
    +'    </div>'
    +'</div>'
    ;
    
    return $(template);
};

//window.onload = function(){
$(window).load(function() {
    // #1
    //var collectionContainer = document.getElementsByClassName('album-covers')[0];
    var $collectionContainer = $(".album-covers");
    // #2
    //collectionContainer.innerHTML = '';
    $collectionContainer.empty();

    // #3
    for (var i = 0; i < 12; i++) {
        //collectionContainer.innerHTML += collectionItemTemplate;
        var $newThumbnail = buildCollectionItemTemplate();
        $collectionContainer.append($newThumbnail);
    }
});