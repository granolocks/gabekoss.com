require 'sass'
module GK
  module Builders
    module Assets
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
