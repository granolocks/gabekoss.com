module GK
  class ErbRenderer < OpenStruct
    def render_from_file(template_file)
      if File.exists? template_file
        template = File.read template_file
        ERB.new(template).result(binding)
      end
    end
  end
end
