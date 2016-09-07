var curentAlbum = -1;

var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 // Scorpins Album
 var albumScorpions = {
     title: 'Blackout',
     artist: 'Scorpions',
     label: 'Mercury ',
     year: '1982',
     albumArtUrl: 'assets/images/album_covers/22.png',
     songs: [
         { title: 'Blackout', duration: '3:49' },
         { title: "Can't Live Without You", duration: '3:47' },
         { title: 'No One Like You', duration: '3:57'},
         { title: 'You Give Me All I Need', duration: '3:39' },
         { title: 'Now!', duration: '2:35'}
     ]
 };


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
         //var songItem = getSongItem(targetElement);
         //alert(songItem.getAttribute('data-song-number'));
         //alert("here");
         //alert($(this).parentElement);
         
         // my solution
         if (currentlyPlayingSong === null) {
             //alert("1");
             $(this).html(pauseButtonTemplate);
             currentlyPlayingSong = $(this).attr('data-song-number');
         } else if (currentlyPlayingSong === $(this).attr('data-song-number')) {
             //alert("2");
             $(this).html(playButtonTemplate);
             currentlyPlayingSong = null;
         } else if (currentlyPlayingSong !== $(this).attr('data-song-number')) {
             var $currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSong + '"]');
             $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
             $(this).html(pauseButtonTemplate);
             currentlyPlayingSong = $(this).attr('data-song-number');
         }
        /*
         // bloc.io solution
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if (currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
        */
     };
     
    var onHover = function(event) {
         //alert("onHover");
         var songItemNumber = $(this).find('.song-item-number').attr('data-song-number');
         if (songItemNumber !== currentlyPlayingSong) {
             $(this).find('.song-item-number').html(playButtonTemplate);
         }
     };
     var offHover = function(event) {
         //alert("offHover");
         var songItemNumber = $(this).find('.song-item-number').attr('data-song-number');
         if (songItemNumber !== currentlyPlayingSong) {
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
         //albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>'; 
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;


$(document).ready(function(){
     setCurrentAlbum(albumPicasso);
     curentAlbum = 0;
 });

function changeAlbum(){
    curentAlbum++;
    curentAlbum = curentAlbum % albums.length;
    setCurrentAlbum(albums[curentAlbum], curentAlbum);
}