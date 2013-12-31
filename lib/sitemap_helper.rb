module GabeKossDotCom
  class SitemapHelper
    def self.sitemap_items(items)
      items.reject do |i|
        i[:is_hidden] ||
        i.binary? ||
        i.path == '/sitemap.xml' ||
        !( i.identifier.scan(/\.json/).empty? )
      end
    end
  end
end
