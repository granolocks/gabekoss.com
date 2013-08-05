module GK
  module Generators
    class Base
      def initialize(source_directory, title)
        @source_directory = source_directory
        @title = title
        @erb = ErbRenderer.new(erb_options)
      end

      def generate!
        create_directory
        create_meta_file
        create_content_file
      end

      private

      def create_directory
        unless Dir.exists? directory_name
          Dir.mkdir(directory_name)
        end
      end

      def create_meta_file
        create_file_from_template(meta_data_file, meta_data_template)
      end

      def create_content_file
        create_file_from_template(content_file, content_template)
      end

      def create_file_from_template(file, template)
        unless File.exists? file
          File.write(file, @erb.render_from_file(template))
        end
      end

      def erb_options
        {
          title: @title,
          author: "Gabe Koss",
          date: date_string
        }
      end

      def content_template
        "#{TEMPLATE_DIRECTORY}/content.md.erb"
      end

      def meta_data_template
        "#{TEMPLATE_DIRECTORY}/meta.yml.erb"
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
        @title.downcase.split(' ').join('_').gsub(/[^a-z0-9_\-]/,'')[0..63]
      end
    end
  end
end
