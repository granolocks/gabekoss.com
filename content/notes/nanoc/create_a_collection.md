---
title: Nanoc Collections 
updated_at: 2013-12-07 00:35
created_at: 2013-12-07 00:35
---

These are notes about organizing a collection of some type of content (such as
a blog) in nanoc.  

_This is in no way complete or definitive. Just some of my own notes._

## Project: Image Loader

For the purpose of simplifying this example I'm going to create a simple image
blog. Each image in the collection will be a simple markdown file containing
only the following metadata:

```markdown
---
title: Doge Images
description: Wow. So doge. Very image.
source: http://gabekoss.com/images/doge/wow_so_image.jpg
---
```

This is effectively the 'model' I am using to store the images. This does not
take into account storing images on your site, 

## Set up your routes and items

I'm going to host this at
[http://gabekoss.com/doge_blog](http://gabekoss.com/doge_blog) so I create the
`contents/doge_blog` and make some markdown files in it containing this sort of
item meta data. 

## Collection page

