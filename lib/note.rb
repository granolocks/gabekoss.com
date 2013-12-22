module GabeKossDotCom
  class Note
    def self.all_from(items)
      notes = items.reject {|i| !(i[:kind] == 'note') }
      notes.sort_by! {|i| i[:title] || 'z' }
      notes
    end
  end
end
