json.goods @goods_categories do |category|
  json.partial! 'category', category: category
end
json.service @service_categories do |category|
  json.partial! 'category', category: category
end
json.space @space_categories do |category|
  json.partial! 'category', category: category
end
