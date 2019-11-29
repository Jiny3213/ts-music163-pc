<template>
  <div class="media-player-mask">
    <div class="media-player" :class="{islock: isLock}">
      <!-- 隐藏的audio标签 -->
      <audio controls ref="audio">
        <source
          src="http://m7.music.126.net/20191116133535/7ee5ca0af900f7ada9ef6d0e90e75752/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
        />
      </audio>

      <!-- 右bar(锁) -->
      <div class="bg-right">
        <div class="bg-lock">
          <a href class="lock-icon" @click.prevent="lock"></a>
        </div>
      </div>

      <!-- 左bar -->
      <div class="bg-left"></div>

      <!-- 主要控件 -->
      <div class="main">
        <!-- 左侧播放按钮 -->
        <div class="play-btns">
          <a href class="prev">上一首</a>
          <a href class="run" @click.prevent="play" :class="{pause: isPlaying}">播放/暂停</a>
          <a href class="next">下一首</a>
        </div>

        <!-- 歌曲封面 -->
        <div class="face">
          <a href>
            <img :src="currentSongData.al.picUrl" alt />
          </a>
        </div>

        <!-- 进度条及相关信息 -->
        <div class="play-center">
          <!-- 歌曲信息 -->
          <div class="info">
            <a href :title="currentSongData.name">{{currentSongData.name}}</a>
            <a href :title="currentSongData.ar[0].name">{{currentSongData.ar[0].name}}</a>
            <a href title="来自歌单"></a>
          </div>

          <!-- 进度条 -->
          <div class="play-bar">
            <div class="bar">
              <div class="ready"></div>
              <div class="current" :style="{width: playerProgress}">
                <span class="point"></span>
              </div>
            </div>

            <div class="time">
              <span>{{currentTime}}</span>
              <span>/ {{totalTime}}</span>
            </div>
          </div>
        </div>

        <!-- 添加播放列表，分享 -->
        <div class="add-share-btns">
          <a href class="add" title="收藏">收藏</a>
          <a href class="share" title="分享">分享</a>
        </div>

        <!-- 右侧控件 -->
        <div class="play-btns-right">
          <a href class="volume"></a>
          <a href class="loop"></a>
          <a href class="song-list">59</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
// import { __param } from 'tslib';
import { State, Getter, Mutation } from "vuex-class";

@Component
export default class MediaPlayer extends Vue {
  // 获取vuex中的歌曲数据
  @Getter("getCurrentSong") currentSongData!: any;
  // 监听现在选择的音乐
  @Watch("currentSongData") onCurrentSongChange(): void {
    console.log("现在的歌曲改变了");
    console.log(`目前的音乐数据：`);
    console.log(this.currentSongData);
    // 加载音乐资源
    this.getSongUrl(this.currentSongData.id);
    localStorage.setItem(
      "currentSongData",
      JSON.stringify(this.currentSongData)
    );
  }

  // 在vuex中写入歌曲信息
  @Mutation("addSong") addSong!: any;
  // 组件创建时，获取localstorage中的数据
  created() {
    // 获取localStorage中的歌曲
    let data = localStorage.getItem("currentSongData") as string;
    this.addSong(JSON.parse(data));
    // 获取锁定状态
    let lock = localStorage.getItem("isLock") as string;
    this.isLock = JSON.parse(lock);
  }
  // 组件挂载时，获取播放器的dom对象
  mounted() {
    this.audio = this.$refs.audio as HTMLAudioElement;
    this.audio.onloadedmetadata = () => {
      let second: number = parseInt(this.audio.duration.toFixed(0));
      let minute: number = Math.floor(second / 60);
      second = second % 60;
      this.totalTime = `${minute}:${second < 10 ? "0" + second : second}`;
    };
  }
  audio!: HTMLAudioElement; // 播放器的dom对象
  interval: number = 0; // 保存循环器
  playerProgress: string = "0%"; // 播放进度
  currentSongUrlData: any = {}; // 正在播放音乐的url及其他数据
  isLock: boolean = false; // 是否被锁定
  isPlaying: boolean = false; // 是否正在播放
  currentTime: string = "0:00"; // 已经播放的时长
  totalTime: string = "0:00"; // 音乐的总时间
  // 锁定播放栏
  lock(): void {
    this.isLock = !this.isLock;
    localStorage.setItem("isLock", JSON.stringify(this.isLock));
  }
  // 播放暂停
  play(): void {
    // 解决ts不认识audio
    let audio = this.$refs.audio as HTMLAudioElement;
    if (this.isPlaying) {
      audio.pause();
      this.isPlaying = !this.isPlaying;
      clearInterval(this.interval);
    } else {
      audio.play();
      this.isPlaying = !this.isPlaying;
      let interval = setInterval(() => {
        this.playerProgress =
        // 改变进度条样式
          ((this.audio.currentTime / this.audio.duration) * 100).toFixed(2) +
          "%";
        // 更新播放时间
        let second: number = parseInt(this.audio.currentTime.toFixed(0));
        let minute: number = Math.floor(second / 60);
        second = second % 60;
        this.currentTime = `${minute}:${second < 10 ? "0" + second : second}`;
      }, 500);
    }
    console.log(this.audio.buffered.end(this.audio.buffered.length-1))
  }

  // 获取音乐url
  getSongUrl(id: number): void {
    this.$axios
      .request({
        url: "/song/url",
        params: {
          id: id,
          br: 3200000
        }
      })
      .then(res => {
        let data = res.data.data[0];
        if (data.br) {
          this.currentSongUrlData = data;
          this.audio.src = this.currentSongUrlData.url;
        } else {
          console.log("暂时无法播放此音乐");
        }
        console.log(`获取到的音乐url数据：`);
        console.log(this.currentSongUrlData);
      });
  }
}
</script>








<style lang="scss" scoped>
// 最外层
.media-player-mask {
  width: 100%;
  position: fixed;
  bottom: 0;
}

// 如果把下面的样式并入到上面，则top样式会被覆盖，因为下面的样式优先度更高：10+10
.media-player {
  width: 100%;
  height: 53px;
  position: absolute;
  // 优先度：10
  top: -7px;
  // top: -53px;
  transition: top 0.5s;
  &:hover {
    top: -53px;
  }
  audio {
    display: none;
  }
}

// 动态样式： 播放和暂停
.pause {
  background-position: 0 -165px !important;
  &:hover {
    background-position: -40px -165px !important;
  }
}

// 动态样式： 是否锁定播放器
.islock {
  // 优先度 10
  top: -53px;
  .lock-icon {
    // 优先度20
    background-position: -100px -380px !important;
  }
}

// 左边长条bg
.bg-left {
  margin-right: 67px;
  height: 100%;
  background: url("~@/assets/png/playbar.png") repeat-x;
}

// 右边锁-短条bg
// 高度为0，利用高度塌陷，将锁方块放在右边
.bg-right {
  position: relative;
  // 锁的背景
  .bg-lock {
    height: 67px;
    width: 67px;
    position: absolute;
    right: 0;
    top: -14px;
    background: url("~@/assets/png/playbar.png") 0 -380px;

    // a标签锁图标
    .lock-icon {
      display: block;
      height: 18px;
      width: 18px;
      margin: 6px 0 0 17px;
      // 优先度30！！！
      background: url("~@/assets/png/playbar.png") -80px -380px;
    }
  }
}

// 主体
.main {
  width: 980px;
  height: 47px;
  margin: -47px auto 0;
}

// 左侧播放按钮、前进、后退
.play-btns {
  width: 137px;
  height: 36px;
  padding: 6px 0 0 0;
  float: left;
  a {
    display: block;
    width: 28px;
    height: 28px;
    text-indent: -9999px;
    float: left;
  }
  .prev {
    margin: 5px 8px 0 0;
    background: url("~@/assets/png/playbar.png") 0 -130px;
    &:hover {
      background-position: -30px -130px;
    }
  }
  .run {
    width: 36px;
    height: 36px;
    margin-right: 8px;
    background: url("~@/assets/png/playbar.png") 0 -204px;
    &:hover {
      background-position: -40px -204px;
    }
  }
  .next {
    margin: 5px 8px 0 0;
    background: url("~@/assets/png/playbar.png") -80px -130px;
    &:hover {
      background-position: -110px -130px;
    }
  }
}

// 歌曲封面
.face {
  height: 34px;
  width: 34px;
  margin: 6px 15px 0 0;
  float: left;
  img {
    height: 34px;
    width: 34px;
  }
}

// 中间组件：歌曲信息、进度条、播放时间
.play-center {
  width: 608px;
  height: 37px;
  float: left;
}

// 歌曲信息
.info {
  width: 100%;
  height: 28px;
  a {
    // 公共样式
    float: left;
    font-size: 12px;
    line-height: 28px;
    text-shadow: 0 1px 0 #171717;
    &:hover {
      text-decoration: underline;
    }
    // 歌曲名
    &:nth-child(1) {
      height: 100%;
      color: #e8e8e8;
    }
    // 歌手名
    &:nth-child(2) {
      margin-left: 10px;
      height: 100%;
      color: #9b9b9b;
    }
    // 来自歌单
    &:nth-child(3) {
      display: block;
      width: 14px;
      height: 15px;
      margin: 7px 0 0 13px;
      background: url("~@/assets/png/playbar.png") -110px -103px;
    }
  }
}

// 进度条
.play-bar {
  width: 493px;
  height: 9px;
  position: relative;
  .bar {
    // 背景条: 透明色
    height: 100%;
    width: 100%;
    position: relative;
    background: url("~@/assets/png/statbar.png") right 0;
    cursor: pointer;
    // 缓冲条：白色
    .ready {
      height: 100%;
      width: 50%;
      background: url("~@/assets/png/statbar.png") right -30px;
    }
    // 播放条：红色
    .current {
      height: 100%;
      // 控制播放条进度
      width: 0%;
      position: absolute;
      top: 0;
      background: url("~@/assets/png/statbar.png") left -66px;
      .point {
        display: block;
        width: 22px;
        height: 24px;
        margin-left: -13px;
        top: -7px;
        right: -13px;
        position: absolute;
        background: url("~@/assets/png/iconall.png") 0 -250px;
      }
    }
  }

  // 时间
  .time {
    position: absolute;
    top: -3px;
    right: -84px;
    color: #797979;
    text-shadow: 0 1px 0 #121212;
    font-size: 12px;
    span:first-child {
      color: #a1a1a1;
    }
  }
}

// 收藏、分享按钮
.add-share-btns {
  width: 60px;
  height: 36px;
  float: left;
  a {
    display: block;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    float: left;
    font-size: 12px;
    color: #333;
    text-indent: -9999px;
  }
  .add {
    background: url("~@/assets/png/playbar.png") -88px -163px;
    &:hover {
      background-position: -88px -189px;
    }
  }
  .share {
    background: url("~@/assets/png/playbar.png") -114px -163px;
    &:hover {
      background-position: -114px -189px;
    }
  }
}

// 右侧控件
.play-btns-right {
  width: 113px;
  height: 36px;
  padding-left: 13px;
  float: left;
  background: url("~@/assets/png/playbar.png") -147px -238px no-repeat;
  a {
    display: block;
    width: 25px;
    height: 25px;
    float: left;
    margin: 11px 2px 0 0;
  }
  .volume {
    background: url("~@/assets/png/playbar.png") -2px -248px;
    &:hover {
      background-position: -31px -248px;
    }
  }
  .loop {
    background: url("~@/assets/png/playbar.png") -3px -344px;
    &:hover {
      background-position: -33px -344px;
    }
  }
  .song-list {
    width: 38px;
    padding-left: 21px;
    margin-right: 0;
    background: url("~@/assets/png/playbar.png") -42px -68px;
    &:hover {
      background-position: -42px -98px;
    }
    font-size: 12px;
    line-height: 27px;
    text-align: center;
    color: #666;
    text-shadow: 0 1px 0 #080707;
  }
}
</style>