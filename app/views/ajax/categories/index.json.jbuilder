json.goods @goods_categories do |category|
  json.id category['id']
  json.text category['name']
  json.link URI.decode(pages_path("i/#{category['name']}-c.#{category['id']}"))
  json.subcates category['children'] do |subcate|
    json.id subcate['id']
    json.text subcate['name']
    json.link URI.decode(pages_path("i/#{subcate['name']}-c.#{subcate['id']}"))
  end
end
json.service @service_categories do |category|
  json.id category['id']
  json.text category['name']
  json.link URI.decode(pages_path("i/#{category['name']}-c.#{category['id']}"))
  json.subcates category['children'] do |subcate|
    json.id subcate['id']
    json.text subcate['name']
    json.link URI.decode(pages_path("i/#{subcate['name']}-c.#{subcate['id']}"))
  end
end
json.space @space_categories do |category|
  json.id category['id']
  json.text category['name']
  json.link URI.decode(pages_path("i/#{category['name']}-c.#{category['id']}"))
  json.subcates category['children'] do |subcate|
    json.id subcate['id']
    json.text subcate['name']
    json.link URI.decode(pages_path("i/#{subcate['name']}-c.#{subcate['id']}"))
  end
end
