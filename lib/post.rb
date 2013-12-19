module GabeKossDotCom
  class Post

    AJAX_SLICE_SIZE = 5

    def self.all_from(items)
      posts = items.reject {|i| !(i[:kind] == 'blog-post') }
      posts.sort_by! {|i| i[:created_at] }
      posts.reverse!
      posts
    end

    def self.previous_for(item,items)
      posts = all_from(items)
      index = posts.index(item) + 1

      # Skip redirect / link posts
      while posts[index] && posts[index][:redirect]
        index += 1
      end

      posts[index]
    end

    def self.next_for(item,items)
      posts = all_from(items)
      index = posts.index(item) - 1

      # Skip redirect / link posts
      while posts[index] && posts[index][:redirect]
        index -= 1
      end

      # if we have wrapped around the negative index ('early') posts do no need
      # to be handled included
      #
      index >= 0 ? posts[index] : nil
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
