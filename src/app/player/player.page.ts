import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

  musica: any;
  activeSong: any;
  playOrPause: any;
  songTime: string;
  percentageOfSlider: number;
  link: String;

  constructor(
    private playerService: PlayerService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.playOrPause = "pause"
    this.songTime = "0:00 / 0:00"
    this.percentageOfSlider = 0
    this.activeSong = document.getElementById("song")
    this.link = "https://music-streaming-thing.herokuapp.com/stream/"

   /* if (this.playerService.qtdMusicas == -1) {
      this.navCtrl.navigateForward(['buscar'])
    }*/

    this.setSong()
  }

  setSong() {
    this.musica = this.playerService.musicas[this.playerService.posTocando][0]
    this.activeSong.src = `${this.link}${this.musica.data}`
  }

  play() {
    this.playOrPause = "pause"
    this.activeSong.play()
  }

  pause() {
    this.playOrPause = "play"
    this.activeSong.pause();
  }

  playPause() {
    if (this.activeSong.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  stopSong() {
    this.activeSong.currentTime = 0;
    this.activeSong.pause()
  }

  updateTime() {
    if (this.activeSong.currentTime == this.activeSong.duration) {
      this.stopSong()
      this.next()
      return
    }
    var currentSeconds = (Math.floor(this.activeSong.currentTime % 60) < 10 ? '0' : '') + Math.floor(this.activeSong.currentTime % 60)
    var currentMinutes = Math.floor(this.activeSong.currentTime / 60)
    this.songTime = currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(this.activeSong.duration / 60) + ":" + (Math.floor(this.activeSong.duration % 60) < 10 ? '0' : '') + Math.floor(this.activeSong.duration % 60);
  }

  next() {
    this.playerService.posTocando++
    this.setSong()
  }

  prev() {
    this.playerService.posTocando--
    this.setSong()
  }
}