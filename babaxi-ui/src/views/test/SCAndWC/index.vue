<template>
  <div class="moveImg">
    <img draggable="false" class="card" @mousedown="onmousedown" src="/img/黑桃Q.png"/>
  </div>
</template>

<script>
const channel = new BroadcastChannel('card');
export default {
  name: 'test1',
  data(){
    return{
      card: document.querySelector('.card'),
    }
  },
  mounted() {
    this.init();
    channel.onmessage = this.onmessage;
  },
  methods:{
    init(){
      this.card = document.querySelector('.card');
      const url = new URL(location.href);
      const type = url.searchParams.get('type') || '黑桃Q';
      this.card.src = `/img/${type}.png`;
    },
    onmousedown(e){
      let x = e.pageX - this.card.offsetLeft;
      let y = e.pageY - this.card.offsetTop;
      window.onmousemove = (e) => {
        const cx = e.pageX - x;
        const cy = e.pageY - y;
        this.card.style.left = cx + 'px';
        this.card.style.top = cy + 'px';
        const screenPoints = this.clientToScreen(cx, cy);
        channel.postMessage(screenPoints);
      };
      window.onmouseup = () => {
        window.onmousemove = null;
        window.onmouseup = null;
      };
    },
    onmessage(e) {
      const clientPoints = this.screenToClient(...e.data);
      this.card.style.left = clientPoints[0] + 'px';
      this.card.style.top = clientPoints[1] + 'px';
    },
    barHeight(){
      return window.outerHeight - window.innerHeight;
    },
    clientToScreen(x, y){
      const screenX = x + window.screenX;
      const screenY = y + window.screenY + this.barHeight();
      return [screenX, screenY];
    },
    screenToClient(x, y){
      const clientX = x - window.screenX;
      const clientY = y - window.screenY - this.barHeight();
      return [clientX, clientY];
    }
  }
}
</script>
<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
}
img{
  width: 200px;
  height: 400px;
  position: absolute;
  float: left;
}
</style>

