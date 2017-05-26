class ItemsGoods < ApiBase
  CREATE_PATH = '/client/item/item/add';

  def self.test
    ig = self.new
    ig.set_header('NaDZVDOI63kWGVPmVM0G4229i9VqiDh6Zb89BIOwnfKkuA3FJVWd8Gqa_img3WFPqT9K-UboP1yl28CSVKRlYR0yQ2S1jQ4_l4JL_GE-jWQ-4S0Cp9soxKPKDTAvQ6oH0obRxgbBbZkdSTvqjzp7A3XXoIvBikMs4iMHS9wofJo=')
    ig.set_user('SACA10DL')
    ig.set_covers('https://s3-ap-northeast-1.amazonaws.com/shareapisd/SAG00079_1495786721095.jpg')
    ig.set_about('物品名稱', '物品介紹', '台北市', '中正區', '43', '5')
    ig.set_delivery('01', '0', 9)
    ig.set_price('1000', '500', 'NTD', '3')
    ig.create
  end

  def initialize()
    @headers = {}
    @body = {}
  end

  def set_header(apitoken)
    @headers = { apitoken: apitoken }
  end

  def set_user(uid)
    @body[:uid] = uid
  end

  def set_covers(img1, img2 = nil, img3 = nil)
    @body.merge!({ img1: img1, img2: img2, img3: img3 })
  end

  def set_about(pname, pdes, city, area, cat_id, unit, tag1 = nil, tag2 = nil, tag3 = nil)
    data = {
      pname: pname, pdes: pdes,
      city: city, area: area,
      tag1: tag1, tag2: tag2, tag3: tag3,
      cat_id: cat_id, unit: unit,
    }
    @body.merge! data
  end

  def set_delivery(send_option, return_option, ship_before_start_days, return_address = nil, leasestart = nil, leaseend = nil)
    data = {
      send_option: send_option,
      return_option: return_option, return_address: return_address,
      ship_before_start_days: ship_before_start_days,
      leasestart: leasestart, leaseend: leaseend,
    }
    @body.merge! data
  end

  def set_price(deposit, price, currency, min_lease_days)
    data = { deposit: deposit, price: price, currency: currency, min_lease_days: min_lease_days }
    @body.merge! data
  end

  def set_rules(rules)

  end

  def set_cancel_policys(advance_day, rate)

  end

  def create
    response = self.class.post(CREATE_PATH, headers: @headers, body: @body.to_json)
    case response.code
    when 200
      puts response.body
      puts 'success'
    when 404
      raise 'NOT FOUND'
    else
      raise "ZOMG ERROR #{response.code} #{response.body}"
    end
  end
end
