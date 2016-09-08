// Store state of playing songs
var currentlyPlayingSongNumber = null;
var curentAlbum = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>'; 
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause');

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
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
             currentSoundFile.play();
             updateSeekBarWhileSongPlays();
             updateVolumePercentage(currentSoundFile.getVolume());
         } else if ( parseInt(currentlyPlayingSongNumber) === parseInt($(this).attr('data-song-number')) ) {
             //alert("2");
             //alert(currentSoundFile.getTime());
             if(currentSoundFile.isPaused()){
                currentSoundFile.play();
                updateSeekBarWhileSongPlays();
                $(this).html(pauseButtonTemplate);
                $playPauseButton.html(playerBarPauseButton);                
             }else{
                currentSoundFile.pause();
                $(this).html(playButtonTemplate);
                $playPauseButton.html(playerBarPlayButton);
             }
         } else if ( parseInt(currentlyPlayingSongNumber) !== parseInt($(this).attr('data-song-number')) ) {
             //alert("3");
             var $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
             $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
             $(this).html(pauseButtonTemplate);
             setSong($(this).attr('data-song-number'));
             updatePlayerBarSong();
             currentSoundFile.play();
             updateSeekBarWhileSongPlays();
             updateVolumePercentage(currentSoundFile.getVolume());
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
     
     //set curent song obj
     setSong(currentlyPlayingSongNumber);
     
     //set song icon
     $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
     $currentlyPlayingSongElement.html(pauseButtonTemplate);
     
     updatePlayerBarSong();
     currentSoundFile.play();
     updateSeekBarWhileSongPlays();
     
 };


var nextSong = function() {
      var tmpNumber = currentlyPlayingSongNumber;
     
     var $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
     $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
     
     //find previous song
     var songIndex = trackIndex(albums[curentAlbum],currentSongFromAlbum);
     currentlyPlayingSongNumber = ((albums[curentAlbum].songs.length + songIndex + 1) % albums[curentAlbum].songs.length) + 1;
     
     //set curent song obj
     setSong(currentlyPlayingSongNumber);
     
     //set previos song icon
     $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
     $currentlyPlayingSongElement.html(pauseButtonTemplate);
     
     updatePlayerBarSong();
     currentSoundFile.play();
     updateSeekBarWhileSongPlays();
 };

$(document).ready(function(){
     setCurrentAlbum(albumPicasso);
     setupSeekBars();
     curentAlbum = 0;

     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     $playPauseButton.click(togglePlayFromPlayerBar);
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
    $playPauseButton.html(playerBarPauseButton);
    setTotalTimeInPlayerBar(currentSongFromAlbum.duration);
};

var setSong = function(songNumber){
    currentlyPlayingSongNumber = songNumber;
    var currentAlbumObj = albums[curentAlbum];
    currentSongFromAlbum = currentAlbumObj.songs[songNumber - 1];   
    
     if (currentSoundFile) {
         currentSoundFile.stop();
     }
    
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         // #2
         formats: [ 'mp3' ],
         preload: true
     });
    
    setVolume(currentVolume);
};

var getSongNumberCell = function(songNumber){
    var $currentlyPlayingSongElement = $('[data-song-number="' + songNumber + '"]');
    return $currentlyPlayingSongElement;
};

var seek = function(time) {
     //alert("in seek");
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 };

 var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var togglePlayFromPlayerBar = function() {
     if (currentSoundFile == null){
         return;
     }
     if(currentSoundFile.isPaused()){
        currentSoundFile.play();
        //updateSeekBarWhileSongPlays();
        getSongNumberCell(currentlyPlayingSongNumber).html(pauseButtonTemplate);
        $playPauseButton.html(playerBarPauseButton)                
     }else{
        currentSoundFile.pause();
        getSongNumberCell(currentlyPlayingSongNumber).html(playButtonTemplate);
        $playPauseButton.html(playerBarPlayButton)
     }   
};

 var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');
     
     $seekBars.click(function(event) {
         // #3
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         // #4
         var seekBarFillRatio = offsetX / barWidth;
 
         // #5
         updateSeekPercentage($(this), seekBarFillRatio);
         if($(this).parent().hasClass("volume")){
             //alert("volume: " +seekBarFillRatio);
             setVolume(seekBarFillRatio * 100);
         }else{
             //alert("seek: " +seekBarFillRatio);
             seek(seekBarFillRatio * currentSoundFile.getDuration());
         }
     });
     
    $seekBars.find('.thumb').mousedown(function(event) {
         // #8
         var $seekBar = $(this).parent();
 
         // #9
         $(document).bind('mousemove.thumb', function(event){
             var offsetX = event.pageX - $seekBar.offset().left;
             var barWidth = $seekBar.width();
             var seekBarFillRatio = offsetX / barWidth;
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
             if( $seekBar.parent().hasClass("volume") ){
                  //alert("volume: " +seekBarFillRatio)
                  setVolume(seekBarFillRatio * 100);
             }else{
                  //alert("seek: " +seekBarFillRatio);
                  seek(seekBarFillRatio * currentSoundFile.getDuration());
             }
         });
 
         // #10
         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });
 };


 var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         // #10
         currentSoundFile.bind('timeupdate', function(event) {
             // #11
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
             setCurrentTimeInPlayerBar(this.getTime());
         });
         
         currentSoundFile.bind('ended', function(event) {
             // #11
             var $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
             $currentlyPlayingSongElement.html(playButtonTemplate);
             $playPauseButton.html(playerBarPlayButton);
         });
     }
 };


 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // #1
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

 var updateVolumePercentage = function(valumeBarPercentage) {
    $seekBar = $("div.control-group.volume").find(".seek-bar");
    var percentageString = valumeBarPercentage + '%';
    //alert("in set volume");
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

var setCurrentTimeInPlayerBar = function(currentTime){
    var $time = $('.current-time');
    $time.text(filterTimeCode(currentTime));
};

var setTotalTimeInPlayerBar = function(totalTime){
    var $time = $('.total-time');
    $time.text(filterTimeCode(totalTime));
};

var filterTimeCode = function(timeInSeconds){
    var totalSeconds = parseFloat(timeInSeconds);
    var seconds = "0" + Math.floor(totalSeconds % 60);
    return Math.floor(totalSeconds / 60) + ":" + seconds.substr(seconds.length - 2);
};


