require 'sass'

module GK
  module Builders
    module Assets
      class Base
        def initialize(template_file, target_directory)
          @template_file = template_file
          @target_directory = target_directory
        end

        def build!
          File.write(output_file, render)
        end

        def output_file
          "#{@target_directory}/#{output_file_name}"
        end

        private

        def output_file_name
          @template_file       # => /path/to/arbitrary/file/name.with.extra.extension.txt.erb
          .split('/')[-1]    # => name.with.extra.extension.txt.erb
          .split('.')[0..-2] # => [ "name","with","extra","extension","txt"]
          .join('.')         # => name.with.extra.extension.txt
        end

        def render
          # stub
          ""
        end
      end

      class Stylesheet < Base
        private
        def render
          @sass = Sass::Engine.for_file(@template_file,{})
          return @sass.render
        end
      end
    end
  end
end
