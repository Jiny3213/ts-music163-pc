<template>
  <div class="media-player-mask">
    <div class="media-player" :class="{lock: isLock}">
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
        <div class="btns">
          <a href class="prev">上一首</a>
          <a href class="run">播放/暂停</a>
          <a href class="next">下一首</a>
        </div>

        <!-- 歌曲封面 -->
        <div class="face">
          <a href>
            <img
              src="http://p2.music.126.net/UHE7y1ksIgpV4VbVL1jg7Q==/109951164475306512.jpg?param=34y34"
              alt
            />
          </a>
        </div>

        <!-- 进度条 -->
        <div class="play">
          <div class="info">
            <a href>歌曲名</a>
            <a href>歌手名</a>
            <a href title="来自歌单"></a>
          </div>

          <!-- 进度条 -->
          <div class="play-bar">
            <div class="bar">
              <div class="ready"></div>
              <div class="current">
                <span class="point"></span>
              </div>
            </div>

            <div class="time">
              <span>0:00</span>
              <span>/ 3:34</span>
            </div>
          </div>
        </div>

        <!-- 添加播放列表，分享 -->
        <div class="add-share-btns">
          <a href class="add" title="收藏">收藏</a>
          <a href class="share" title="分享">分享</a>
        </div>

        <!-- 右侧控件 -->
        <div class="ctrl">
          <a href class="volume"></a>
          <a href class="loop"></a>
          <a href class="song-list">59</a>
        </div>
      </div>
    </div>
    <!-- <button @click="play">播放</button>
    <button @click="pause">暂停</button>
    <button @click="progress">进度</button>
    <button @click="goto">跳转1分钟</button>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class MediaPlayer extends Vue {
  isLock: boolean = false;
  lock():void {
    this.isLock = !this.isLock
  }
  play(): void {
    // 解决ts不认识audio
    (this.$refs.audio as HTMLAudioElement).play();
  }
  pause(): void {
    (this.$refs.audio as HTMLAudioElement).pause();
  }
  progress(): void {
    console.log(
      (this.$refs.audio as HTMLAudioElement).currentTime /
        (this.$refs.audio as HTMLAudioElement).duration
    );
    console.log((this.$refs.audio as HTMLAudioElement).duration);
  }
  goto(): void {
    (this.$refs.audio as HTMLAudioElement).currentTime += 120;
  }
  created() {
    this.$axios
      .request({
        url: "/song/url",
        params: {
          id: 33894312,
          br: 320000
        }
      })
      .then(res => {
        console.log(res);
      });
  }
}
</script>

<style lang="scss" scoped>
.media-player-mask {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.media-player {
  width: 100%;
  height: 53px;
  position: absolute;
  top: -7px;
  transition: top 0.5s;
  &:hover {
    top: -53px;
  }
  audio {
    display: none;
  }
}

// 动态样式：播放器上锁
.lock {
  top: -53px;
  .lock-icon {
    background-position: -100px -380px!important;
  }
}

// 左边长条
.bg-left {
  margin-right: 67px;
  height: 100%;
  background: url("~@/assets/png/playbar.png") repeat-x;
}

// 右边锁-短条
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
      background: url("~@/assets/png/playbar.png") -80px -380px;
      // // 模拟点击改变锁的开合
      // &:hover {
      //   background-position: -100px -380px;
      // }
    }
  }
}

// 主要控件
.main {
  width: 980px;
  height: 47px;
  margin: -47px auto 0;

  // 左侧播放按钮
  .btns {
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

  // 歌曲信息、进度条
  .play {
    width: 608px;
    height: 37px;
    float: left;
    // 歌曲信息
    .info {
      width: 100%;
      height: 28px;
      a {
        // 公共样式
        float: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        line-height: 28px;
        text-shadow: 0 1px 0 #171717;
        &:hover {
          text-decoration: underline;
        }
        // 歌曲名
        &:nth-child(1) {
          width: 72px;
          height: 100%;
          color: #e8e8e8;
        }
        // 歌手名
        &:nth-child(2) {
          width: 36px;
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
        height: 100%;
        width: 100%;
        position: relative;
        // 背景条
        background: url("~@/assets/png/statbar.png") right 0;
        cursor: pointer;
        .ready {
          height: 100%;
          width: 50%;
          // 缓冲条
          background: url("~@/assets/png/statbar.png") right -30px;
        }
        .current {
          height: 100%;
          width: 25%;
          position: absolute;
          top: 0;
          // 进度条
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
  }

  // 收藏、分享
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
  .ctrl {
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
}
</style>