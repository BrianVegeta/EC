json.goods @goods_categories do |category|
  json.id category['id']
  json.text category['name']
  json.link URI.decode(pages_path("i/goods/#{category['name']}-c.#{category['id']}"))
  json.subcates category['children'] do |subcate|
    json.id subcate['id']
    json.text subcate['name']
    json.link URI.decode(pages_path("i/goods/#{subcate['name']}-c.#{subcate['id']}"))
  end
end
json.service @service_categories do |category|
  json.id category['id']
  json.text category['name']
  json.link URI.decode(pages_path("i/service/#{category['name']}-c.#{category['id']}"))
  json.subcates category['children'] do |subcate|
    json.id subcate['id']
    json.text subcate['name']
    json.link URI.decode(pages_path("i/service/#{subcate['name']}-c.#{subcate['id']}"))
  end
end
json.space @space_categories do |category|
  json.id category['id']
  json.text category['name']
  json.link URI.decode(pages_path("i/space/#{category['name']}-c.#{category['id']}"))
  json.subcates category['children'] do |subcate|
    json.id subcate['id']
    json.text subcate['name']
    json.link URI.decode(pages_path("i/space/#{subcate['name']}-c.#{subcate['id']}"))
  end
end
