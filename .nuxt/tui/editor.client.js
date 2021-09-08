import Vue from 'vue'
import { Editor, Viewer } from '@toast-ui/vue-editor'

Vue.component(Editor.name, {
  extends: Editor,
  computed: {
    editorOptions: function () {
      const options = Object.assign({}, JSON.parse('{"stylesheet":{"editor":"tui-editor/dist/tui-editor.min.css","contents":"tui-editor/dist/tui-editor-contents.min.css","codemirror":"codemirror/lib/codemirror.css","highlightJs":"highlight.js/styles/github.css","tuiColorPicker":"tui-color-picker/dist/tui-color-picker.min.css"},"minHeight":"200px","useCommandShortcut":true,"useDefaultHTMLSanitizer":true,"hideModeSwitch":false,"toolbarItems":["heading","bold","italic","strike","divider","hr","quote","divider","ul","ol","task","indent","outdent","divider","table","image","link","divider","code","codeblock"],"exts":[]}'), this.options)
      options.initialValue = this.value
      options.initialEditType = this.mode
      options.height = this.height
      options.previewStyle = this.previewStyle

      return options
    }
  }
})

Vue.component(Viewer.name, Viewer)
