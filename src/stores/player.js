import { defineStore } from 'pinia'
import { Howl } from 'howler'
import helper from '../includes/helper'

export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '00:00', //current position of the song is declared as seek in howler
    duration: '00:00',
    songProgress: '0%'
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) {
        /* removes the current playing song when 
        another song is being played. And removes the 
        instance of the song from memory  */
        this.sound.unload()
      }

      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress)
      })
    },
    async toggleAudio() {
      if (!this.sound.playing) {
        return
      }

      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek())
      this.duration = helper.formatTime(this.sound.duration())
      this.songProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`
      if (this.sound.playing()) {
        requestAnimationFrame(this.progress)
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        console.log('here')
        return
      }

      //this will return the dimension of the current element
      //x is the distance from left side of the screent to left side of the player timeline
      const { x, width } = event.currentTarget.getBoundingClientRect()
      //this will return the x coordinate of the click relative to the whole screen, no relative to the div element
      const clickX = event.clientX - x

      const percentage = clickX / width
      const seconds = this.sound.duration() * percentage
      this.sound.seek(seconds)
      this.sound.once('seek', this.progress)
    }
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }
      return false
    }
  }
})
