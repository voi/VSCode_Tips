const vscode = require('vscode');

/**
 * Macro configuration settings
 * { [name: string]: {              ... Name of the macro
 *    no: number,                   ... Order of the macro
 *    func: ()=> string | undefined ... Name of the body of the macro function
 *  }
 * }
 */
module.exports.macroCommands = {
   MarkdownTodoToggle: {
      no: 1,
      func: MarkdownTodoToggle
   },
   MarkdownStrikeThrough: {
      no: 2,
      func: MarkdownStrikeThrough
   },
   MarkdownPasteWithBlockQuote: {
      no: 3,
      func: MarkdownPasteWithBlockQuote
   },
   AlignTexts: {
      no: 4,
      func: AlignTexts
   }
};

/***************************************************************************
 * MarkdownTodoToggle
 */
function MarkdownTodoToggle() {
   //
   const editor = vscode.window.activeTextEditor;

   if (!editor) {
      return "Editor is not opened.";
   }

   //
   const document = editor.document;
   const selection = editor.selection;

   var lines = [];

   for (var l = selection.start.line; l <= selection.end.line; l++) {
      lines.push(document.lineAt(l));
   }

   //
   const todo_pattern = /([-+*]\s)\[ \](\s+)(\S.*)/;
   const done_pattern = /([-+*]\s)\[[xX]\](\s+)(?:~~)?(\S.*)(?:~~)/;

   var newLines = lines.map((line) => {
      if (todo_pattern.test(line.text)) {
         return { range: line.range, text: line.text.replace(todo_pattern, '$1[x]$2~~$3~~') };
      } else if (done_pattern.test(line.text)) {
         return { range: line.range, text: line.text.replace(done_pattern, '$1[ ]$2$3') };
      } else {
         return null;
      }
   });

   editor.edit((editBuilder) => {
      newLines.forEach((line) => {
         if (line) {
            editBuilder.replace(line.range, line.text);
         }
      });
   });
}


/***************************************************************************
 * MarkdownStrikeThrough
 */
function MarkdownStrikeThrough() {
   //
   const editor = vscode.window.activeTextEditor;

   if (!editor) {
      return "Editor is not opened.";
   }

   //
   const selection = editor.selection;
   const text = editor.document.getText(selection);

   if (text.length > 0) {
      const newText = text.replace(/^|$/g, '~~');

      editor.edit((editBuilder) => {
         editBuilder.replace(selection, newText);
      });
   } else {
      return "Target text is not selected."
   }
}


/***************************************************************************
 * MarkdownPasteWithBlockQuote
 */
async function MarkdownPasteWithBlockQuote() {
   //
   const editor = vscode.window.activeTextEditor;

   if (!editor) {
      return "Editor is not opened.";
   }

   //
   const text = await vscode.env.clipboard.readText();

   if(text.length <= 0) {
      return;
   }

   //
   const selection = editor.selection;

   editor.edit((editBuilder) => {
      editBuilder.replace(selection, text
         .replace(/^/, '> ').replace(/\n/g, '$&> ').replace(/(?<=\n)> $/, ''));
   });
}


/***************************************************************************
 * AlignTexts
 */
async function AlignTexts() {
   //
   const editor = vscode.window.activeTextEditor;

   if (!editor) {
      return "Editor is not opened.";
   }

   /////////////////////////////////////////////////////////////////////////
   const ja_katakana_2 = /ｳﾞ|ｶﾞ|ｷﾞ|ｸﾞ|ｹﾞ|ｺﾞ|ｻﾞ|ｼﾞ|ｽﾞ|ｾﾞ|ｿﾞ|ﾀﾞ|ﾁﾞ|ﾂﾞ|ﾃﾞ|ﾄﾞ|ﾊﾞ|ﾋﾞ|ﾌﾞ|ﾍﾞ|ﾎﾞ|ﾊﾟ|ﾋﾟ|ﾌﾟ|ﾍﾟ|ﾎﾟ/g;
   const ja_katakana_1 = /ｦ|ｧ|ｨ|ｩ|ｪ|ｫ|ｬ|ｭ|ｮ|ｯ|ｰ|ｱ|ｲ|ｳ|ｴ|ｵ|ｶ|ｷ|ｸ|ｹ|ｺ|ｻ|ｼ|ｽ|ｾ|ｿ|ﾀ|ﾁ|ﾂ|ﾃ|ﾄ|ﾅ|ﾆ|ﾇ|ﾈ|ﾉ|ﾊ|ﾋ|ﾌ|ﾍ|ﾎ|ﾏ|ﾐ|ﾑ|ﾒ|ﾓ|ﾔ|ﾕ|ﾖ|ﾗ|ﾘ|ﾙ|ﾚ|ﾛ|ﾜ|ﾝ/g;

   var get_str_width = function (str) {
      return str.replace(ja_katakana_2, '  ')
         .replace(ja_katakana_1, ' ')
         .replace(/./g, (ch) => {
            return ((ch.charCodeAt(0) <= 0x7F) ? ' ' : '  ');
         }).length;
   };

   var get_alignment_width = function (tokens_list) {
      var width = -1;

      tokens_list.forEach((item) => {
         if (item.tokens.length > 1) {
            width = Math.max(width, get_str_width(item.tokens[0]));
         }
      });

      return width;
   };

   var padding_ = function (context, str) {
      var base_str = str.replace(/\s+$/, '');
      var base_width = get_str_width(base_str);

      return base_str + context.padding(base_width);
   };

   var align_lines = function (context, tokens_list) {
      if (context.with_space) {
         context.width += context.tabstop;
      }

      tokens_list.forEach((item) => {
         if (item.tokens.length > 1) {
            var token = item.tokens.shift();
            item.tokens[0] = padding_(context, token) + item.tokens[0];
            item.text = item.tokens[0];
         }
      });
   };

   var parse_args = function (cmdline, tab_size) {
      // <http://www.m-bsys.com/code/javascript-repeatstring>
      var padding_space = function (base_width) {
         return Array(Math.max(this.width - base_width, 0)).join(' ');
      };

      var padding_tab = function (base_width) {
         var margin = Math.max(this.width - base_width, 0);

         return Array(parseInt(margin / this.tabstop) + ((margin % this.tabstop > 0) ? 2 : 1)).join('\t');
      };

      // ----------------
      // -g   global:        align all tokens
      // -1   1st:           align first token (default)
      // ----
      // -t   tab:           use tab ('\t')
      // -w   use_tab:       use space (' ') (default)
      // ----
      // -a   after:         align at after specified pattern
      // -h   just here:     align at specified pattern (default)
      // ----
      // -r   regexp:        pattern as regexp
      // -e   text:          pattern as text (default)
      // ----
      // -n   without space: not separete pattern
      // -s   with space:    separete pattern (default)
      // ----------------
      var context = {
         'pattern': '',
         'sub': '\f$&',
         'tabstop': 1,
         'padding': padding_space,
         'width': 0,
         'with_space': true
      };
      var opt_global = '';
      var use_regexp = false;

      var opt_pat = cmdline.replace(/^\s*((?:-[g1twahersn]\s+)*)/, '$1\f').split(/\f/);

      for (var opt in opt_pat[0].split(/\s+/)) {
         if (opt === '-g') { opt_global = 'g'; }
         else if (opt === '-1') { opt_global = ''; }
         else if (opt === '-t') { context.tabstop = tab_size; context.padding = padding_tab; }
         else if (opt === '-w') { context.tabstop = 1; context.padding = padding_space; }
         else if (opt === '-a') { context.sub = '$&\f'; }
         else if (opt === '-h') { context.sub = '\f$&'; }
         else if (opt === '-r') { use_regexp = true; }
         else if (opt === '-e') { use_regexp = false; }
         else if (opt === '-s') { context.with_space = true; }
         else if (opt === '-n') { context.with_space = false; }
      }

      if (use_regexp) {
         context.pattern = new RegExp(opt_pat[1].replace(/^\s*|\s*$/g, ''), opt_global);
      }
      else {
         context.pattern = new RegExp(opt_pat[1]
            .replace(/[\\\/\[\]\(\)\{\}\?\+\*\|\.\^\$]/g, '\\$&')
            .replace(/^\s*|\s*$/g, ''), opt_global);
      }

      return context;
   };

   /////////////////////////////////////////////////////////////////////////
   const cmdline = await vscode.window.showInputBox({ prompt: 'Align: [-g -1 -t -w -a -h -e -r] [token]' });

   if (!cmdline) {
      return "align command is not inputed.";
   }

   //
   var context = parse_args(cmdline, editor.options.tabSize);

   if (context.pattern === '') {
      return "alignment text is not inputed.";
   }

   //
   const document = editor.document;
   const selection = editor.selection;

   if(selection.isSingleLine) {
      return;
   }

   //
   var lines = [];

   for (var l = selection.start.line; l <= selection.end.line; l++) {
      lines.push(document.lineAt(l));
   }

   //
   var tokens_list = lines.map((line) => {
      return {
         range: line.range,
         text: line.text,
         tokens: line.text.replace(context.pattern, context.sub).split('\f')
      };
   });

   context.width = get_alignment_width(tokens_list);

   while (context.width >= 0) {
      align_lines(context, tokens_list);

      context.width = get_alignment_width(tokens_list);
   }

   //
   editor.edit((editBuilder) => {
      tokens_list.forEach((item) => {
         editBuilder.replace(item.range, item.text);
      });
   });
}
