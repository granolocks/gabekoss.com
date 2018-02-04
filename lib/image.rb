module GabeKossDotCom
  class GalleryImage
    def self.collection_hash(items)
      image_array = items.select{|i| i.identifier =~ /images\/gallery/ && i.identifier !~ /thumbnail/ }
      image_array.each_with_object({}) do |image, hash|
        dir = image.identifier.scan(/\/images\/gallery\/([a-z]*)/).flatten.first
        hash[dir] ||= []
        hash[dir] << image
      end
    end
  end
end

