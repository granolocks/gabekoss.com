require 'rdoc'
module GK
  class MdToHtml
    def initialize(md_file)
      @text = File.read md_file
      @options = RDoc::Options.new
      @parser = RDoc::Markdown.new
    end

    def to_html
      @formatter = RDoc::Markup::ToHtml.new(@options, nil)
      @parser.parse(@text).accept(@formatter)
    end
  end
end
