class ItemsGoods < ApiBase
  CREATE_PATH = '/client/item/item/add';

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

  def set_covers(img1, img2, img3)
    @body.merge! { img1: img1, img2: img2, img3: img3 }
  end

  def set_about(pname, pdes, city, area, cat_id, unit, tag1, tag2, tag3)
    data = {
      pname: pname, pdes: pdes,
      city: city, area: area,
      tag1: tag1, tag2: tag2, tag3: tag3,
      cat_id: cat_id, unit: unit,
    }
    @body.merge! data
  end

  def set_delivery(send_option, return_option, return_address, ship_before_start_days, leasestart = nil, leaseend = nil)
    data = {
      send_option: send_option,
      return_option: return_option, return_address: return_address
      ship_before_start_days: ship_before_start_days,
      leasestart: leasestart, leaseend: leaseend,
    }
    @body.merge! data
  end

  def set_price(deposit, price, currency, min_lease_days)
    data = {
      deposit: deposit, price: price, currency: currency,
      send_option: send_option,
      return_option: return_option,
      return_address: return_address,
    }
  end

  def set_rules(rules)

  end

  def set_cancel_policys(advance_day, rate)

  end

  def create
    response = self.class.post(CREATE_PATH, headers: @headers, body: @body)
    case response.code
    when 200
      response['data']
    when 404
      raise 'NOT FOUND'
    else
      raise "ZOMG ERROR #{response.code}"
    end
  end
end
