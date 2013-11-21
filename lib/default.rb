# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.
#
#include Nanoc3::Helpers::Blogging
#include Nanoc3::Helpers::Tagging
#include Nanoc3::Helpers::Rendering
#include Nanoc3::Helpers::LinkTo
#include Nanoc3::Helpers::XMLSitemap

require 'pry'
require 'builder'

def xml_sitemap(params={})

  # Create builder
  buffer = ''
  xml = Builder::XmlMarkup.new(:target => buffer, :indent => 2)

  # Extract parameters
  items       = params.fetch(:items) { @items.reject { |i| i[:is_hidden] } }
  select_proc = params.fetch(:rep_select, nil)
  sorted_items = items.sort_by { |i| i.identifier }

  # Check for required attributes
  if @site.config[:base_url].nil?
    raise RuntimeError.new("The Nanoc::Helpers::XMLSitemap helper requires the site configuration to specify the base URL for the site.")
  end

  # Build sitemap
  xml.instruct!
  xml.urlset(:xmlns => 'http://www.sitemaps.org/schemas/sitemap/0.9') do
    sorted_items.each do |item|
      reps = item.reps.reject { |r| r.raw_path.nil? }
      reps.reject! { |r| !select_proc[r] } if select_proc
      reps.sort_by { |r| r.name.to_s }.each do |rep|
        xml.url do
          xml.loc         @site.config[:base_url] + rep.path
          xml.lastmod     item[:mtime].to_iso8601_date unless item[:mtime].nil?
          xml.changefreq  item[:changefreq] unless item[:changefreq].nil?
          xml.priority    item[:priority] unless item[:priority].nil?
        end
      end
    end
  end

  # Return sitemap
  buffer
end
