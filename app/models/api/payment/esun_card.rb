class Api::Payment::EsunCard
  include HTTParty
  # HEADERS = { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }
  HEADERS = { 'Content-Type' => 'application/x-www-form-urlencoded'}
  headers HEADERS

  def request path, params
    options = {
      body: params,
      verify: false,
    }
    response = HTTParty.post(path, options)
    response.parsed_response
  end

end
