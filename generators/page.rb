module GK
  module Generators
    class Base
      def initialize(source_directory, title)
        @source_directory = source_directory
        @title = title
      end

      def create_directory
        unless Dir.exists? directory_name
          Dir.mkdir(directory_name)

          unless File.exists? content_file
            File.write(content_file, '')
          end

          unless File.exists? meta_data_file
            File.write(meta_data_file, '')
          end
        end
      end

      def content_file
        "#{directory_name}/content.md"
      end

      def meta_data_file
        "#{directory_name}/meta.yml"
      end

      def directory_name
       "#{@source_directory}/#{date_string}_#{directory_title}"
      end

      def date_string
        date = Time.now.to_s.split(' ')[0]
      end

      def directory_title
        @title.downcase.split(' ').join('_')
      end
    end

    class Page < Base
    end

    class Post < Base
    end
  end
end
