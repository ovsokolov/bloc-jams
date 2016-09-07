// Store state of playing songs
var currentlyPlayingSongNumber = null;
var curentAlbum = null;
var currentSongFromAlbum = null;

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>'; 
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
     
     var clickHandler = function() {
         
         // my solution
         if (currentlyPlayingSongNumber === null) {
             //alert("1");
             $(this).html(pauseButtonTemplate);
             setSong($(this).attr('data-song-number'));
             updatePlayerBarSong();
         } else if (currentlyPlayingSongNumber === $(this).attr('data-song-number')) {
             //alert("2");
             $(this).html(playButtonTemplate);
             currentlyPlayingSongNumber = null;
             currentSongFromAlbum = null;
             $('.main-controls .play-pause').html(playerBarPlayButton)
         } else if (currentlyPlayingSongNumber !== $(this).attr('data-song-number')) {
             var $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
             $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
             $(this).html(pauseButtonTemplate);
             setSong($(this).attr('data-song-number'));
             updatePlayerBarSong();
         }

     };
     
    var onHover = function(event) {
         //alert("onHover");
         var songItemNumber = $(this).find('.song-item-number').attr('data-song-number');
         if (parseInt(songItemNumber) !== parseInt(currentlyPlayingSongNumber)) {
             $(this).find('.song-item-number').html(playButtonTemplate);
         }
     };
     var offHover = function(event) {
         //alert("offHover");
         var songItemNumber =  $(this).find('.song-item-number').attr('data-song-number');
         if (parseInt(songItemNumber) !== parseInt(currentlyPlayingSongNumber)) {
             $(this).find('.song-item-number').html(songItemNumber);
         }
     };
     
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
 };

var albums = [albumPicasso, albumMarconi, albumScorpions];

 var setCurrentAlbum = function(album, cnt) {
     curentAlbum = cnt;
     // #1
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr("src", album.albumArtUrl);
     //albumImage.style.transition = "all 3s ease";
     //albumImage.style.transform = albumImage.style.transform == "scale(0.5)"?"scale(1.0)":"scale(0.5)";
     //albumImage.style.transform = "scale(1.0)";

 
     // #3
     //albumSongList.innerHTML = '';
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

 var previousSong = function() {
     //alert("previousSong");
     //set back currently playing  song 
      var tmpNumber = currentlyPlayingSongNumber;
     
     var $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
     $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
     
     //find previous song
     var songIndex = trackIndex(albums[curentAlbum],currentSongFromAlbum);
     currentlyPlayingSongNumber = (albums[curentAlbum].songs.length + songIndex) % albums[curentAlbum].songs.length;
     if(currentlyPlayingSongNumber == 0){
         currentlyPlayingSongNumber = albums[curentAlbum].songs.length;
     }
     //alert(currentlyPlayingSongNumber);
     
     //set curent song obj
     var currentAlbumObj = albums[curentAlbum];
     currentSongFromAlbum = currentAlbumObj.songs[currentlyPlayingSongNumber - 1];
     
     //set previos song icon
     $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
     $currentlyPlayingSongElement.html(pauseButtonTemplate);
     
     updatePlayerBarSong();
     
 };


var nextSong = function() {
      var tmpNumber = currentlyPlayingSongNumber;
     
     var $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
     $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
     
     //find previous song
     var songIndex = trackIndex(albums[curentAlbum],currentSongFromAlbum);
     currentlyPlayingSongNumber = ((albums[curentAlbum].songs.length + songIndex + 1) % albums[curentAlbum].songs.length) + 1;

     //alert(currentlyPlayingSongNumber);
     
     //set curent song obj
     var currentAlbumObj = albums[curentAlbum];
     currentSongFromAlbum = currentAlbumObj.songs[currentlyPlayingSongNumber - 1];
     
     //set previos song icon
     $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
     $currentlyPlayingSongElement.html(pauseButtonTemplate);
     
     updatePlayerBarSong();
 };

$(document).ready(function(){
     setCurrentAlbum(albumPicasso);
     curentAlbum = 0;

     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
 });



function changeAlbum(){
    curentAlbum++;
    curentAlbum = curentAlbum % albums.length;
    setCurrentAlbum(albums[curentAlbum], curentAlbum);
}

var updatePlayerBarSong = function(){
    var song = currentSongFromAlbum.title;
    var artist = albums[curentAlbum].artist;
    $(".song-name").text(song);
    $(".artist-song-mobile").text(song + " - " + artist);
    $(".artist-name").text(artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var setSong = function(songNumber){
    currentlyPlayingSongNumber = songNumber;
    var currentAlbumObj = albums[curentAlbum];
    currentSongFromAlbum = currentAlbumObj.songs[songNumber - 1];   
};

var getSongNumberCell = function(songNumber){
    var $currentlyPlayingSongElement = $('[data-song-number="' + songNumber + '"]');
    return $currentlyPlayingSongElement;
};