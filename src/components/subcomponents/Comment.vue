<template>
  <div class="comment">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（150字以内）" maxlength="150" v-model="newComment"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="comment-list">
      <div class="comment-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="comment-title">
          <span>&nbsp;第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}</span>
          <span>发表时间：{{ item.add_time | dateFormat }}&nbsp;</span>
        </div>
        <div class="comment-body">
          {{ item.content === 'undefined' ? '此用户什么都没有评论' : item.content }}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      pageIndex: 1,
      comments: [],
      newComment: ''
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    getComment() { // 获取评论数据
      this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
        if(result.body.status === 0) {
          // 获取新数据，并添加到原数据之后
          this.comments = this.comments.concat(result.body.message)
          // Toast('获取评论成功！')
        } else {
          Toast('获取评论失败！')
        }
      })
    },
    getMore() { // 加载更多
      this.pageIndex++;
      this.getComment()
    },
    postComment() {
      // 判断评论是否为空
      if(this.newComment.trim().length === 0) {
        return Toast("评论内容不能为空！")
      }
      this.$http.post('api/postcomment/' + this.id, { content: this.newComment.trim() })
      .then(function(result) {
        if(result.body.status === 0) {
          var newcmt = {
            user_name: "匿名用户",
            add_time: Date.now(),
            content: this.newComment.trim()
          }
          this.comments.unshift(newcmt)
          this.newComment = ''
        } else {
          Toast("评论发表失败！")
        }
      })
    }
  },
  props: ["id"]
}
</script>

<style lang="scss" scope>
.comment {
  h3 {
    font-size: 18px;
  }

  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .comment-list {
    margin: 5px 0;
    .comment-item {
      font-size: 13px;

      .comment-title {
          background-color: #ccc;
          line-height: 30px;
          display: flex;
          justify-content: space-between;
      }

      .comment-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>