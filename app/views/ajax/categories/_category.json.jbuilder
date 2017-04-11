category_name = category['name'].gsub('/', '_');
json.id category['id']
json.text category['name']
json.link URI.decode(pages_path("i/#{category_name}-c.#{category['id']}"))
json.coverSrc category['img']
json.subcates category['children'] do |subcate|
  json.id subcate['id']
  json.text subcate['name']
  json.link URI.decode(pages_path("i/#{subcate['name']}-c.#{subcate['id']}"))
end
