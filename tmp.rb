def f(s,a=[])
    s.times{a<<(a.size>1?a[-2]+a[-1]:a.size)};a
end

print f(10)
#=> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
