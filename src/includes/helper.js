export default {
  formatTime(time) {
    const minutes = Math.floor(time / 60) || 0
    const seconds = Math.round(time - minutes * 60 || 0)

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}` //${seconds < 10 ? '0' : ''} for displaying a 0 infront if second is less than 10
  }
}
