<!-- 弹窗组件
调用方法：
1、引入 import
2、局部注册，写入 components
3、调用
<Modals title="用户信息" :show="isShow" :showOk="true" :small="true" :fade="true" @ok="HandleOk" @cancel="HandleClose" okText="确认" :middleNum="'180px auto'">
  <div class="modal-body">
      <table>
          <th>
              <td>自定义内容</td>
          </th>
      </table>
      <p></p>
  </div>
</Modals>
# title :  (string)
  > 必填 - 弹窗标题
# show  ： (Boolean)
  > 必填 - 控制弹窗显示隐藏
# showOk  ： (Boolean)
  > 必填 - 控制确定按钮的显示隐藏
# small : (Boolean)
  > 控制弹窗大小，显示小
# large : (Boolean)
  > 控制弹窗大小，显示大弹窗
# ok : (Function)
  > 必填 - 点击确定后的回调函数
# cancle : (Function)
  > 必填 - 点击关闭后的回调函数
# okText : (String)
  > 默认“保存”，在“确认”按钮上显示的文字
# cancelText : (String)
  > 默认“取消”，在“取消”按钮上显示的文字
# middleNum : (String)
  > 设置提示框的位置
-->
<template>
    <div v-show="show" :transition="transition">
        <div class="modal" :class="[show? modalshow: null]" @click.self="clickMask" id="main-modal">
            <div class="modal-dialog" :class="modalClass" :style="'margin:'+middleNum">
                <div class="modal-content">
                    <!--Header-->
                    <div class="modal-header">
                        <slot name="header">
                            <a class="close" @click="cancel">
                              <img src="../assets/images/close.png" height="11" width="12" alt="">
                            </a>
                            <h4 class="modal-title">
                                <slot name="title">
                                    {{title}}
                                </slot>
                            </h4>
                        </slot>
                    </div>
                    <!--Container-->
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <!--Footer-->
                    <div class="modal-footer">
                        <slot name="footer">
                            <slot name="selectNum"></slot>
                            <button type="button" class="modal-btns-reset nook" :class="cancelClass" @click="cancel">{{cancelText}}</button>
                            <button v-if="showOk" type="button" class="modal-btns-reset ok" :class="okClass?'okClass':''" @click="ok">{{okText}}</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop in" :class="[show? modalshow: null]"></div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            twoWay: true,
            default: false
        },
        title: {
            type: String,
            default: 'Modal'
        },
        small: {
            type: Boolean,
            default: false
        },
        large: {
            type: Boolean,
            default: false
        },
        middle:{
            type: Boolean,
            default: false
        },
        showOk:{
            type: Boolean,
            default: false
        },
        full: {
            type: Boolean,
            default: false
        },
        // 为true时无法通过点击遮罩层关闭modal
        force: {
            type: Boolean,
            default: false
        },
        // 自定义组件transition
        transition: {
            type: String,
            default: 'modal'
        },
        middleNum: {
            type: String,
            default: '80px auto'
        },
        // 确认按钮text
        okText: {
            type: String,
            default: '保存'
        },
        // 取消按钮text
        cancelText: {
            type: String,
            default: '取消'
        },
        // 确认按钮className
        okClass: {
            type: Boolean,
            default: false,
        },
        // 取消按钮className
        cancelClass: {
            type: String,
            default: 'btn red btn-outline'
        },
        // 点击确定时关闭Modal
        // 默认为false，由父组件控制prop.show来关闭
        closeWhenOK: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            duration: null,
            modalshow : 'modalshow'
        };
    },
    created () {
        if (this.show) {
            document.body.className += ' modal-open';
        }
    },
    beforeDestroy () {
        document.body.className = document.body.className.replace(/\s?modal-open/, '');
    },
    watch: {
        show (value) {
            // 在显示时去掉body滚动条，防止出现双滚动条
            if (value) {
                document.body.className += ' modal-open';
            }
            // 在modal动画结束后再加上body滚动条
            else {
                if (!this.duration) {
                    this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
                }

                window.setTimeout(() => {
                    document.body.className = document.body.className.replace(/\s?modal-open/, '');
                }, this.duration || 0);
            }
        }
    },
    computed: {
        modalClass () {
            return {
                'modal-lg': this.large,
                'modal-sm': this.small,
                'modal-full': this.full,
                'modal-md':this.middle,
            }
        }
    },
    methods: {
        ok () {
            this.$emit('ok');
            if (this.closeWhenOK) {
                this.show = false;
            }
        },
        cancel () {
            this.$emit('cancel');
            // this.show = false;
        },
        // 点击遮罩层
        clickMask () {
            if (!this.force) {
                // this.cancel();
            }
        }
    }
}
</script>

<style lang="scss">
$zindex-modal: 1050 !default;
@mixin translate($x, $y) {
  -webkit-transform: translate($x, $y);
      -ms-transform: translate($x, $y); // IE9 only
       -o-transform: translate($x, $y);
          transform: translate($x, $y);
}
@mixin transition-transform($transition...) {
  -webkit-transition: -webkit-transform $transition;
     -moz-transition: -moz-transform $transition;
       -o-transition: -o-transform $transition;
          transition: transform $transition;
}
$modal-content-bg: #fff !default;
$modal-content-fallback-border-color: #999 !default;
$modal-content-border-color: rgba(0,0,0,.2) !default;
$border-radius-large: 4px !default;
// @mixin box-shadow($shadow...) {
//   -webkit-box-shadow: $shadow; // iOS <4.3 & Android <4.1
//           box-shadow: $shadow;
// }
$zindex-modal-background:  1040 !default;
$modal-backdrop-bg:           #000 !default;
@mixin opacity($opacity) {
  opacity: $opacity;
  // IE8 filter
  $opacity-ie: ($opacity * 100);
  filter: alpha(opacity=$opacity-ie);
}
$modal-backdrop-opacity:      .5 !default;
$modal-title-padding:         9px !default;
@mixin clearfix() {
  &:before,
  &:after {
    content: " "; // 1
    display: table; // 2
  }
  &:after {
    clear: both;
  }
}
$modal-title-line-height:     1.428571429 !default;
$modal-inner-padding:         15px !default;
$modal-footer-border-color:   #e5e5e5 !default;
$screen-sm-min:768px;
$modal-md: 650px;
$modal-sm: 390px;
$screen-md-min:992px;
$modal-lg: 900px;
.modal-open {
  overflow: hidden;
}

// Container that the modal scrolls within
.modal {
  display: none;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $zindex-modal;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  // When fading in the modal, animate it to slide down
  &.fade .modal-dialog {
    @include translate(0, -25%);
    @include transition-transform(0.3s ease-out);
  }
  &.in .modal-dialog { @include translate(0, 0) }
}
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}
// Shell div to position the modal with bottom padding
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}

// Actual modal
.modal-content {
  position: relative;
  background-color: $modal-content-bg;
  border: 1px solid $modal-content-fallback-border-color; //old browsers fallback (ie8 etc)
  border: 1px solid $modal-content-border-color;
  border-radius: $border-radius-large;
  // @include box-shadow(0 3px 9px rgba(0,0,0,.5));
  background-clip: padding-box;
  // Remove focus outline from opened modal
  outline: 0;
}
// Modal background
.modal-backdrop {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $zindex-modal-background;
  background-color: $modal-backdrop-bg;
  // Fade for backdrop
  &.fade { @include opacity(0); }
  &.in { @include opacity($modal-backdrop-opacity); }
}

// Modal header
// Top section of the modal w/ title and dismiss
.modal-header {
    position: relative;;
  padding: $modal-title-padding;
  border-bottom: 1px solid #eee;
  @include clearfix;
}
// Close icon
.modal-header .close {
   float: right;
   font-size: 18px;
   font-weight: 400;
   line-height: 1;
   color: #666;
   cursor:pointer;
   border:none;
   background-color: #fff
}
// Title text within header
.modal-title {
  font-size: 14px;
  color:#666;
  margin: 0;
  text-align: left;
  // line-height: $modal-title-line-height;
}
// Modal body
// Where all modal content resides (sibling of .modal-header and .modal-footer)
.modal-body {
  position: relative;
  padding: $modal-inner-padding;
}
// Footer (for actions)
.modal-footer {
  padding: $modal-inner-padding;
  text-align: center; // right align buttons
  @include clearfix;
  // Properly space out buttons
  .btn + .btn {
    margin-left: 10px;
    margin-bottom: 0; // account for input[type="submit"] which gets the bottom margin like all other inputs
  }
  // but override that for button groups
  .btn-group .btn + .btn {
    margin-left: -1px;
  }
  // and override it for block buttons as well
  .btn-block + .btn-block {
    margin-left: 0;
  }
}
// Measure scrollbar width for padding body during modal show/hide
.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}
@media (min-width: $screen-sm-min) {
  // Automatically set modal's width for larger viewports
  .modal-dialog {
    width: $modal-md;
    margin: 80px auto;
  }
  .modal-content {
    // @include box-shadow(0 5px 15px rgba(0,0,0,.5));
  }
  // Modal sizes
  .modal-sm { width: $modal-sm; }
  .modal-md { width: $modal-md; }
}
@media (min-width: $screen-md-min) {
  .modal-lg { width: $modal-lg; }
}
.modalshow{display:block};
.modal-footer{
    .modal-btns-reset{
        font-size:0;
        width: 56px;
        height: 24px;
        font-size: 12px;
        background:#fff;
        color:#999;
        border-radius:2px;
        border:1px solid #ddd;
        outline: 0;
        cursor:pointer;
        margin:0 10px;
    }
    .ok{color:#fff;background:#00b3d5;border:1px solid #00b3d5;}
    .ok:hover{
      background-color: #34c5e0;
      border:1px solid #34c5e0;
    }
    .nook:hover{
      background:#f4f4f4;
    }
    .okClass{
      color:#fff;
      background:#de6d6d;
      border:1px solid #de6d6d;
      &:hover{
        background: #e38888;
        border:1px solid #e38888;
      }
    }
}
</style>
