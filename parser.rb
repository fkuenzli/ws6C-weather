File.open('weather-conditions2.csv').each_with_index do |line,i|
    if i%2 == 0 
    puts ";"
    end
    puts line

  end