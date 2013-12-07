module GabeKossDotCom
  class TagHelper
    def self.tags_hash(items)
      items.inject({}) do |hash,item|
        tags =* item[:tags]

        tags.each do |t|
          cur =* hash[t]
          hash[t] = cur << item
        end

        hash
      end
    end

    def self.erb_template
      <<ERB
  <% @item[:posts].each do |p| %>
    <p>
      <strong>
        <a href="<%= p.path %>">
          <%= p[:title] %>
        </a>
      </strong><br/>
      <%= p[:summary] %>
    </p>
  <% end %>
ERB
    end

  end
end
