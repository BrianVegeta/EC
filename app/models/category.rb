class Category
  include HTTParty
  base_uri 'http://220.135.3.115:18080'
  HEADERS = { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }
  headers HEADERS

  def initialize(service, page)
    @options = { query: { site: service, page: page } }
  end

  def questions
    self.class.get("/2.2/questions", @options)
  end

  def users
    self.class.get("/2.2/users", @options)
  end

  def list
    response = self.class.post('/ShareAPI-1.2.2/client/item/category/list')
    case response.code
    when 200
      response
    when 404
      raise 'NOT FOUND'
    else
      raise "ZOMG ERROR #{response.code}"
    end
  end
end
