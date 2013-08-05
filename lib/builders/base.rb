module GK
  module Builders
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
        @template_file       # => /path/to/file.txt.erb
        .split('/')[-1]    # => file.txt.erb
        .split('.')[0..-2] # => ["file","txt"]
        .join('.')         # => file.txt
      end

      def render
        # stub
        ""
      end
    end
  end
end
