export default {
  saveUserName (ctx, username) {
    ctx.commit('saveUserName', username)
  },
  saveCartCount (ctx, count) {
    ctx.commit('saveCartCount', count)
  }
}