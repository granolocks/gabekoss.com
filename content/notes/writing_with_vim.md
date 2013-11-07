---
title:
updated_at: 2013-11-07 6:59am
---

---
title: Writing with Vim
---

# Writing with Vim

## Customize Vim for Writing

```vim
set nonumber
set wrap linebreak nolist
imap <c-l> <Esc><c-l>
noremap <c-l> :nohl<cr>
noremap j gj 
noremap k gk
au BufRead *.md set ft= 
setlocal spell spelllang=en_us
```

## Rendering Markdown
## `gq` & `gqip`
## Vim spellcheck

* `]s`,`[s`
* `z=`
* `zg`
