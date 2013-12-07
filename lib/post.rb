module GabeKossDotCom
  class Post

    AJAX_SLICE_SIZE = 5

    def self.all_from(items)
      posts = items.reject {|i| !(i[:kind] == 'blog-post') }
      posts.sort_by! {|i| i[:created_at] }
      posts.reverse!
      posts
    end

    def self.json_erb
      <<ERB
      <%=
      require 'json'
      posts = @item[:posts].dup
      posts.map! do |post|
        {
          path:          post.path,
          title:         post[:title],
          tags:          post[:tags],
          created_at:    post[:created_at],
          updated_at:    post[:updated_at],
          summary:       post[:summary],
          redirect:      post[:redirect],
          redirect_path: post[:redirect_path],
          author:        (post[:author] || 'Gabe Koss')
        }
      end
      JSON.generate(posts)
      %>
ERB
    end

  end
end
