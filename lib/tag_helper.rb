module GabeKossDotCom
  class TagHelper

    def self.sorted_tags(items)
      tags_hash(items).to_a.sort_by! {|i| i[-1].count }.reverse
    end

    def self.tagged_items_from(items)
      notes = items.reject {|i| i[:tags] == nil }
      notes.sort_by! {|i| i[:title] || 'z' }
      notes
    end

    def self.search_hash(items)
      items_info = []
      tags_summary = {}

      tags_hash(items).each do |tag, pages|
        pages.each do |p|
          x = {}
          x[:path]  = p.path
          x[:title] = p[:title]
          x[:tags]  = p[:tags]
          x[:kind]  = p[:kind]

          if items_info.index(x)
            index = items_info.index(x)
          else
            items_info << x
            index = items_info.index(x)
          end

          tags_summary[tag] = (tags_summary[tag]||[])<< index
        end
      end

      output = {}
      output[:info] = items_info
      output[:index] = tags_summary
      output
    end

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
  <% @item[:pages].each do |p| %>
    <p>
      <strong>
        <a href="<%= p.path %>">
          <%= p[:title] %>
        </a>
      </strong><br/>
      <span class="<%= p[:kind] %>"><em><%= p[:kind] == "note" ? "Note" : "Blog Post" %></em><span> &mdash;
      <% if p[:summary] %>
        <%= p[:summary] %>
      <% else %>
        Summary unavailable...
      <% end %>
    </p>
  <% end %>
ERB
    end

  end
end
