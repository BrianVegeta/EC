# Set the host name for URL creation
require 'hirb'
Hirb.enable


class CateHelper
  class << self
    def collect data
      categories = data.map do |v|
        v['children'].map do |mv|
          if mv['children']
            [ CateHelper.slice(mv), mv['children'].map{ |sv| CateHelper.slice sv } ]
          else
            CateHelper.slice mv
          end
        end
      end
      categories.flatten!
      categories.sort_by! { |v| v['id'] }
      categories
    end

    def slice category
      category.slice('id', 'name')
    end
  end
end

class ItemHelper
  class << self
    def slice item
      item.slice('pid', 'pname')
    end
  end
end

class PathHelper
  class << self
    def category_path name, cid, used = false
      "/p/i/#{used ? 'used' : 'lease'}/#{escape_alias(name)}-c.#{cid}"
    end

    def item pname, pid
      "/p/#{escape_alias(pname)}-i.#{pid}"
    end

    private
    def escape_alias text
      text = text.gsub(/[^\u4e00-\u9fa5a-zA-Z0-9\-_]/, '-')
      text.gsub(/((-))+/, '-')
    end
  end
end

SitemapGenerator::Sitemap.default_host = "https://web.shareapp.com.tw"
SitemapGenerator::Sitemap.create do

  # TABS PAGES
  add '/p/i/service', changefreq: 'daily', priority: 0.8
  add '/p/i/space', changefreq: 'daily', priority: 0.8
  add '/p/i/goods', changefreq: 'daily', priority: 0.8
  add '/p/i/used-goods', changefreq: 'daily', priority: 0.8
  add '/p/i/wishing-pond', changefreq: 'daily', priority: 0.8

  # ITEMS
  item_params = { index: 0, sort: { column: :time, type: :desc } }
  api = ::Api::Item::SearchItemList.new item_params.merge size: 2000
  if api.request
    api.response_data.each do |item|
      path = PathHelper.item item['pname'], item['pid']
      add URI::escape(path), changefreq: 'monthly', priority: 0.75, lastmod: Time.now
    end
  end

  # CATEGORIES
  api_category = ::Options::Categories.new
  if api_category.request
    categories = CateHelper.collect api_category.response_data
    categories.each do |category|
      lease_path = PathHelper.category_path category['name'], category['id']
      used_path = PathHelper.category_path category['name'], category['id']
      add URI::escape(lease_path), changefreq: 'daily'
      add URI::escape(used_path), changefreq: 'daily'
    end
  end

end
