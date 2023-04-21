<template>
  <section class="container mx-auto mt-6">
    <div
      class="bg-gray-800 w-fit rounded-lg border border-gray-200 relative flex flex-col mx-auto p-10 hover:border-red cursor-pointer"
      @click.prevent="getSongLyrics(songName, artistName)"
    >
      <div class="text-green-500 font-black mb-10">Lyrics</div>
      <div class="whitespace-pre-wrap font-extrabold text-lg text-center text-white">
        {{ lyrics }}
      </div>
    </div>
  </section>
</template>

<script>
import { getLyrics, getSong } from 'genius-lyrics-api'

export default {
  name: 'SongLyrics',
  props: ['songName', 'artistName'],
  data() {
    return {
      lyrics: ''
    }
  },
  methods: {
    async getSongLyrics(title, artist) {
      console.log(artist, title)
      const options = {
        apiKey: 'IPNFFgB-p9r2ivVpHG1AeIu-ngg3R4HIygfnlyEp9e8euX_VcvZrGs5-4Y2DnTbQ',
        title: title,
        artist: artist,
        optimizeQuery: true
      }
      console.log(await getSong(options))
      await getLyrics(options).then((lyrics) => {
        this.lyrics = lyrics
        console.log(lyrics)
      })
    }
  },
  watch: {
    title() {}
  }
}
</script>
