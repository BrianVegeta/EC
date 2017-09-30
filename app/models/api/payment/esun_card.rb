class Api::Payment::EsunCard
  include HTTParty
  HEADERS = { 'Content-Type' => 'application/x-www-form-urlencoded'}
  headers HEADERS

  def request path, params
    options = {
      body: params,
      verify: false,
    }
    response = HTTParty.post('https://acqtest.esunbank.com.tw/ACQTrans/esuncard/txnf014m', options)
    response.parsed_response
  end
end
