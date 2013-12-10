require 'benchmark'

#puts <<desc
#Read the String
#Ruby: File.read
#Unix: cat
#
#desc
#Benchmark.bm do |bmark|
#  bmark.report(:ruby) do
#    100.times do
#      result = File.read("/usr/share/dict/words")
#    end
#  end
#  bmark.report(:unix) do
#    100.times do
#      result = `cat "/usr/share/dict/words"`
#    end
#  end
#end
#
#puts <<desc
#First Element
#Ruby1: File.read().split()[0]
#Ruby2: File.read().scan(/\A^[a-zA-Z]*$/)[0]
#Ruby2: File.read().scan(/^[a-zA-Z]*$/)[0]
#Unix: sed 1q < /usr/share/dict/words
#
#desc
#Benchmark.bm do |bmark|
#  bmark.report(:ruby1) do
#    100.times do
#      result = File.read("/usr/share/dict/words").split("\n")[0]
#    end
#  end
#  bmark.report(:ruby2) do
#    100.times do
#      result = File.read("/usr/share/dict/words").scan(/\A^[a-zA-Z]*$/)[0]
#    end
#  end
#  bmark.report(:ruby3) do
#    100.times do
#      result = File.read("/usr/share/dict/words").scan(/^[a-zA-Z]*$/)[0]
#    end
#  end
#  bmark.report(:unix) do
#    100.times do
#      result = `sed 1q < /usr/share/dict/words`
#    end
#  end
#end

puts <<desc
First Element
Ruby1: File.read().split().select(){|i| i =~ /sass/}
Ruby2: File.read().scan(/sass/)
Unix1: grep sass /usr/share/dict/words
Unix2: grep sass /usr/share/dict/words + Ruby split()

desc
Benchmark.bm do |bmark|
  bmark.report(:ruby1) do
    100.times do
      result = File.read("/usr/share/dict/words").split("\n").select{|i| i =~ /sass/ }
    end
  end
  bmark.report(:ruby2) do
    100.times do
      result = File.read("/usr/share/dict/words").scan(/^[a-z]*sass[a-z]*$/i)
    end
  end
  bmark.report(:unix1) do
    100.times do
      result = `grep sass /usr/share/dict/words`
    end
  end
  bmark.report(:unix2) do
    100.times do
      result = `grep sass /usr/share/dict/words`.split("\n")
    end
  end
end
