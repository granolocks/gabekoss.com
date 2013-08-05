require 'erb'
require 'ostruct'

require_relative 'base'
require_relative 'page'
require_relative 'post'

module GK
  module Generators
    TEMPLATE_DIRECTORY = File.expand_path '../templates', __FILE__

    class ErbRenderer < OpenStruct
      def render_from_file(template_file)
        if File.exists? template_file
          template = File.read template_file
          ERB.new(template).result(binding)
        end
      end
    end

  end
end
