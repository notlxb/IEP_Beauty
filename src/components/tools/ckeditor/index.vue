<template>
  <div class="goods-editor">
    <!-- 工具栏容器 -->
    <div id="toolbar-container"></div>

    <!-- 编辑器容器 -->
    <div id="editor">
      <!-- <p>This is the initial editor content.</p> -->
    </div>
  </div>
</template>

<script>
  import CKEditor from '@ckeditor/ckeditor5-build-classic'
  import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn' //中文包
  export default {
    data() {
      return {
        editor: null, // 编辑器实例
      }
    },
    mounted() {
      this.initCKEditor()
    },
    methods: {
      initCKEditor() {
        class UploadAdapter {
          constructor(loader) {
            this.loader = loader
          }

          upload() {  //重置上传路径
            return new Promise((resolve, reject) => {
              var fileName = 'goods' + this.loader.file.lastModified
              client().put(fileName, this.loader.file).then(result => {
                resolve({
                  default: result.url
                })
              }).catch(err => {
                console.log(err)
              })
            })
          }

          abort() {
          }
        }

        //初始化编辑器
        CKEditor.create(document.querySelector('#editor'), {
          removePlugins: ['MediaEmbed'], //除去视频按钮
          language: 'zh-cn',  // 中文
          ckfinder: {
            'uploaded': 1, 'url': '/'
            // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
          }
        }).then(editor => {
          const toolbarContainer = document.querySelector('#toolbar-container')
          toolbarContainer.appendChild(editor.ui.view.toolbar.element)
          // 加载了适配器
          editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader)
          }
          this.editor = editor // 将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        }).catch(error => {
          console.error(error)
        })
      },
    }
  }
</script>

<style scoped>

</style>
