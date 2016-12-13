 set nocompatible              " be iMproved, required

" 开启文件类型侦测
 filetype on
 "修复insert模式下删除按钮失效的问题
 set backspace=indent,eol,start
 
 "自动缩进
 set autoindent
" 根据不同的文件类型加载不同的插件
 filetype plugin on                  " require

" 让配置立即生效
 autocmd BufWritePost $MYVIMRC source $MYVIMRC

" 开启行号
 set number

" 显示状态栏
 set laststatus=2

" 开启行号显示
 set ruler

" 高亮当前行
 set cursorline
" 高亮当前列
" set cursourcolumn

" 静止换行
 set nowrap
" 自适应不同语言的智能缩进
 filetype indent on
" " 将制表符扩展为空格
 set expandtab
" 设置编辑时制表符占用空格数
 set tabstop=4
" " 设置格式化时制表符占用空格数
 set shiftwidth=4
" " 让 vim 把连续数量的空格视为一个制表符
 set softtabstop=4

 " 基于缩进或语法进行代码折叠
 " "set foldmethod=indent
 set foldmethod=syntax
 " " 启动 vim 时关闭折叠代码
 set nofoldenable
 
" set the runtime path to include Vundle and initialize
 set rtp+=~/.vim/bundle/Vundle.vim

 call vundle#begin()

" let Vundle manage Vundle, required
 Plugin 'VundleVim/Vundle.vim'

" NERD_Tree config
 Plugin 'https://github.com/scrooloose/nerdtree.git'

"前端js 语法高亮
 Plugin 'pangloss/vim-javascript'
 let g:javascript_plugin_jsdoc = 1
"color theme
 Plugin 'morhetz/gruvbox'
 let g:gruvbox_contrast_dark = 'medium'
"let g:molokai_original = 1
"let g:rehash256 = 1
 
"快速切换文件
 Plugin 'ctrlpvim/ctrlp.vim'
 
 "emmet
 Plugin 'mattn/emmet-vim'
 let g:user_emmet_leader_key='<C-E>' 

 "自动补全
 Plugin 'Valloric/YouCompleteMe'
 "设置启动该插件的文件类型
 let g:ycm_filetype_whitelist = { 'js': 1 }
 
 "自动保存
 Plugin 'vim-auto-save'
" 启用该插件
 let g:auto_save = 1
 let g:auto_save_no_updatetime = 1  " do not change the 'updatetime' option

 call vundle#end()            

 "sublime multiple cursor
 Plugin 'terryma/vim-multiple-cursors'
 filetype plugin indent on    

"color theme configure
"开启语法高亮
 syntax enable
 syntax on
 set background=dark
 colorscheme gruvbox

 nmap <C-T> :NERDTreeToggle<CR>

" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
