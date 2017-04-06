json.array! @categories do |category|
  json.text category['name']
  json.link URI.decode(pages_path("items/#{category['name']}-c.#{category['id']}"))
  json.subcates category['children'] do |subcate|
    json.text subcate['name']
    json.link URI.decode(pages_path("items/#{subcate['name']}-c.#{subcate['id']}"))
  end
end
