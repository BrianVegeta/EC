module Iot
  class Errors
    CLIENT_404 = 'CLIENT_404' #client not exist or invalid
    CLIENT_APP_404 = 'CLIENT_APP_404' #client_app not exist or invalid
    CLIENT_SERVER_404 = 'CLIENT_SERVER_404' #client_server not exist
    CLIENT_APP_LOGIN_403 = 'CLIENT_APP_LOGIN_403' #verify certification fail
    CLIENT_APP_SESSION_404 = 'CLIENT_APP_SESSION_404' #client_app session not exist
    CLIENT_APP_SESSION_498 = 'CLIENT_APP_SESSION_498' #client_app session token expired
    CLIENT_USER_404 = 'CLIENT_USER_404' #client user not exist or invalid
    RESOURCE_404 = 'RESOURCE_404' #resource not exist or invalid
    RESOURCE_APP_400 = 'RESOURCE_APP_400' #resource_app not support this function
    RESOURCE_APP_404 = 'RESOURCE_APP_404' #resource_app not exist or invalid
    IOT_ACCOUNT_404 = 'IOT_ACCOUNT_404' #iot account not exist
    IOT_ACCOUNT_409 = 'IOT_ACCOUNT_409' #iot account already exist
    IOT_ACCOUNT_498 = 'IOT_ACCOUNT_498' #iot account invalid
    IOT_ACCOUNT_SESSION_404 = 'IOT_ACCOUNT_SESSION_404' #iot account session not exist
    IOT_ACCOUNT_SESSION_498 = 'IOT_ACCOUNT_SESSION_498' #iot account session expired or otherwise invalid
    IOT_ACCOUNT_LOGIN_403 = 'IOT_ACCOUNT_LOGIN_403' #iot account login forbidden
    IOT_ACCOUNT_BIND_409 = 'IOT_ACCOUNT_BIND_409' #iot account already bind with resource_app
    IOT_PAYMENT_ORDER_404 = 'IOT_PAYMENT_ORDER_404' #iot payment order not exist
    IOT_PAYMENT_ORDER_UPDATE_403 = 'IOT_PAYMENT_ORDER_UPDATE_403' #iot payment order update forbidden
    PAYMENT_ORDER_CHECK_BY_RESOURCE_APP_404 = 'PAYMENT_ORDER_CHECK_BY_RESOURCE_APP_404' #check payment order with resource_app fail because not found
    CONTRACT_404 = 'CONTRACT_404' #contract not exist
    CONTRACT_UPDATE_403 = 'CONTRACT_UPDATE_403' #update contract forbidden
    CHECK_DATA_406 = 'CHECK_DATA_406' #check data invalid format
    SUCCESS_200 = 'SUCCESS_200' #ok
    BAD_REQUEST_400 = 'BAD_REQUEST_400' #bad request
    INTERNAL_EXCEPTION_500 = 'INTERNAL_EXCEPTION_500' #IoT server internal exception
  end
end
