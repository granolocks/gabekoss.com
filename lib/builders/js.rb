require 'coffee-script'
module GK
  module Builders
    module Assets
      class JS < Base
        private
        def render
          template = File.read(@template_file)
          CoffeeScript.compile(template)
        end
      end
    end
  end
end
