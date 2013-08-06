module GK
  module Generators
    class Page < Base
      private
      def directory_name
        File.join @source_directory, directory_title
      end
    end
  end
end
