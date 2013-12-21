module GabeKossDotCom
  class SitemapHelper
    def self.sitemap_items(items)
      items.reject do |i|
        i[:is_hidden] ||
        i.binary? ||
        i.path == '/sitemap.xml' ||
        !( i.identifier.scan(/doge_blog\/\d{3}_doge/).empty? ) ||
        !( i.path.scan(/api\/v1\/blog/).empty? )
        !( i.path.scan(/\/json/).empty? )
      end
    end
  end
end
