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
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

var albums = [albumPicasso, albumMarconi, albumScorpions];

 var setCurrentAlbum = function(album, cnt) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     //albumImage.style.transform = "scale(0.2)";
     albumImage.setAttribute('src', album.albumArtUrl);
     //albumImage.style.transform = albumImage.style.transform == "scale(0.5)"?"scale(1.0)":"scale(0.5)";
     //albumImage.style.transform = "scale(1.0)";

 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };
 
 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     curentAlbum = 0;
 };

function changeAlbum(){
    curentAlbum++;
    curentAlbum = curentAlbum % albums.length;
    setCurrentAlbum(albums[curentAlbum], curentAlbum);
}